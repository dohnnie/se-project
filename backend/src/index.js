// backend/src/index.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 
const Replicate = require('replicate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for Express endpoints
app.use(cors());
app.use(express.json());

// Create an HTTP server to wrap the Express app
const server = http.createServer(app);

// Initialize socket.io with proper CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your Vite frontend
    methods: ["GET", "POST"]
  }
});

// Socket.io event handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Your API endpoints remain the same:
app.post('/api/generate-image', async (req, res) => {
  try {
    const {
      prompt,
      aspect_ratio = "1:1",
      negative_prompt = "",
      safety_filter_level = "block_medium_and_above"
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    console.log('Generating image with prompt:', prompt);
    const prediction = await replicate.predictions.create({
      model: "google/imagen-3",
      input: {
        prompt,
        aspect_ratio,
        negative_prompt,
        safety_filter_level,
      },
    });
    console.log('Prediction created:', prediction);
    if (prediction.status === 'starting' || prediction.status === 'processing') {
      return res.status(202).json({
        success: false,
        error: 'Image still processing',
        predictionId: prediction.id
      });
    } else if (prediction.status === 'succeeded') {
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      return res.json({ success: true, imageUrl, predictionId: prediction.id });
    } else {
      console.error('Prediction failed:', prediction);
      return res.status(500).json({
        error: 'Prediction failed',
        details: prediction.error,
        predictionId: prediction.id
      });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
});

app.get('/api/prediction/:id', async (req, res) => {
  try {
    const predictionId = req.params.id;
    const prediction = await replicate.predictions.get(predictionId);
    console.log('Polling prediction:', prediction);
    if (prediction.status === 'succeeded') {
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      return res.json({ predictionId, status: prediction.status, output: imageUrl });
    } else if (prediction.status === 'failed') {
      return res.json({ predictionId, status: prediction.status, error: prediction.error });
    } else {
      return res.json({ predictionId, status: prediction.status });
    }
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({ error: 'Failed to fetch prediction', details: error.message });
  }
});

// Start the HTTP server (with socket.io)
server.listen(PORT, () => {
  console.log(`Backend server with socket.io running on port ${PORT}`);
});
