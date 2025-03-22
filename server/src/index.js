const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const { Server } = require('socket.io');
const io = new Server(expressServer, () => {
  cors: [
    `http://localhost:${PORT}`,
  ]
});
io.on('connection', socket => {
  console.log(socket.handshake);
  console.log(`${socket.id} has joined the server!`);
  socket.on('create', (player) => {
    console.log(`${player.name} has joined a lobby`);
  });
  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

// Proxy usage
app.get('/api/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Image URL required');

  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    res.set('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Failed to load image');
  }
});


// Image generation route
app.post('/api/generate-image', async (req, res) => {
  try {
    const {
      prompt,
      aspect_ratio = "1:1",
      negative_prompt = "",
      safety_filter_level = "block_medium_and_above"
    } = req.body;

    if (!prompt) {
      console.error("❌ Error: No prompt received!");
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('🖼️ Generating image with prompt:', prompt);

    const output = await replicate.run("google/imagen-3", {
      input: {
        prompt,
        aspect_ratio,
        negative_prompt,
        safety_filter_level
      }
    });

    console.log('✅ API Response:', output);

    const imageUrl = Array.isArray(output) && output.length > 0 ? output[0] : null;

    // Getting an error here
    if (!imageUrl) {
      console.error("❌ No image URL returned from API");
      return res.status(500).json({ error: 'No image URL returned from API' });
    }

    return res.json({ success: true, imageUrl });

  } catch (error) {
    console.error('🚨 Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
});
