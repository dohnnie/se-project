
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
const io = new Server(expressServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST"],
  }
});

let players = [];
let prompts = {};
let prevTime = null;
let start = false;

const initGame = (playerList, time) => {
  if (playerList.length > 0 && playerList !== null) {
    const prompter = playerList[0];
    return ({
      prompter: prompter.id,
      listIndex: 0,
      startTime: time,
      round: 1,
      cycle: 1,
      status: 2,
    });
  } else {
    return ({
      error: "Error not enough players in the lobby",
    });
  }
}

/*
 * Events for the server to check and fire 
 * startGame: This event creates initial values the server needs in order to start the game
 * Prompt: Handles submissios by players, and does different things depending on whether the prompter or guess submitted a prompt
 * Votes: Handles calculating the amount of votes a prompt receives and which prompt recieved the most votes
 * Turns: When each round ends, sets values back to initial round values
 */

io.on('connection', socket => {
  console.log(`${socket.id} has joined the server!`);

  if (socket.recovered) {
    console.log(`${socket.id} has rejoined`);
  } else {

    if (start) {
      setInterval(() => {
        console.log("40 seconds have passed");
      }, 40000);

    }
    socket.on('create', (player) => {
      console.log(`${player.name} has joined a lobby`);
      players.push(player);
      io.emit('updateList', [...players]);
      socket.on('requestList', () => io.emit([...players]));
    });


    socket.on('message', (data) => {
      console.log(data);
      io.emit('newMessage', data);
    })

    socket.on('start', (message) => {
      console.log(message);
      const initData = initGame(players, 40);
      io.emit('gameStart', initData);
      prevTime = Date.now();
      start = true;
    });

    socket.on('submitPrompt', (promptData) => {
      console.log(promptData);
      const prompt = promptData.prompt;
      prompts[prompt] = {
        votes: 0,
        player: promptData.player,
        promptId: promptData.promptId,
        playerId: promptData.id
      };
      io.emit("promptReceived", prompts);
    });

    socket.on('voteSubmitted', (voteData) => {
      const prompt = voteData.prompt
      console.log(prompts[prompt][votes]);
      if (prompts[prompt].votes > 1) {
        let voteCount = prompts[prompt];
        voteCount++;
        prompts[prompt] = voteCount;
      } else {
        prompts[prompt] = 1;
      }
    });


    socket.on('disconnect', () => {
      console.log(`A ${socket.id} has disconnected`);
      players = players.filter(player => player.id !== socket.id);
      io.emit('updateList', players);
      socket.disconnect();
    });
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
    const prediction = await replicate.predictions.create({
      model: "google/imagen-3",
      input: {
        prompt,
        aspect_ratio,
        negative_prompt,
        safety_filter_level,
      },
    });
    console.log("Prediction created:", prediction);
    if (prediction.status === "starting" || prediction.status === "preocessing") {
      return res.status(202).json({
        success: false,
        error: "Image still processing",
        predictionId: prediction.id
      })
    } else if (prediction.status === "succeeded") {
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      return res.json({
        success: true,
        imageUrl,
        predictionId: prediction.id
      });
    } else {
      console.error("Prediction failed: ", prediction);
      return res.status(500).json({
        error: "Prediction failed",
        details: prediction.error,
        predictionId: prediction.id,
      });
    }
  } catch (error) {
    console.error('🚨 Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
});

app.get('/api/prediction/:id', async (req, res) => {
  try {
    const predictionId = req.params.id;
    const prediction = await replicate.predictions.get(predictionId);
    console.log("Polling prediction:", prediction);
    if (prediction.status === "succeeded") {
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
      return res.json({
        predictionId,
        status: prediction.status,
        error: imageUrl,
      });
    } else if (prediction.staatus === "failed") {
      return res.json({
        predictionId,
        status: prediction.status,
        error: prediction.error,
      });
    } else {
      return res.json({
        predictionId,
        status: prediction.status,
        error: prediction.error,
      });
    }
  } catch (error) {
    console.erro("Error fetching prediction: ", error);
    res.status(500).json({
      error: "failed to fetch prediction",
      details: error.message
    });
  }
})
