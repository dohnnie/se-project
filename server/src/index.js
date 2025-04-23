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

/*
 * Events for the server to check and fire 
 * startGame: This event creates initial values the server needs in order to start the game
 * Prompt: Handles submissios by players, and does different things depending on whether the prompter or guess submitted a prompt
 * Votes: Handles calculating the amount of votes a prompt receives and which prompt recieved the most votes
 * Turns: When each round starts, sets values back to initial round values
 */

const game = require('./game.js');
const { gAttr } = require('./game.js');

let phaseInterval = null;

const startTimer = () => {

  if (phaseInterval) {
    console.log("Timer has already started");
    return;
  }

  phaseInterval = setInterval(() => {
    gAttr.status = game.changePhases(gAttr.status);
    io.emit('phaseEnd',
      {
        message: "Begin!",
        statusCode: gAttr.status,
      });
    console.log("5 seconds have passed")
    console.log("Moving to stage: ", gAttr.status);

    if (gAttr.status === 5) {
      stopPhaseTimer();
    }
  }, 5000);
  console.log("Timer Started");
}

const stopPhaseTimer = () => {
  if (phaseInterval) {
    clearInterval(phaseInterval);
    phaseInterval = null;
    console.log("Stopping timer");
  }
}

io.on('connection', socket => {
  console.log(`${socket.id} has joined the server!`);

  // For reconnection implementation
  if (socket.recovered) {
    console.log(`${socket.id} has rejoined`);
  } else {

    // For the phases of a round, when a phase starts e.g. prompting starts, or guessing starts, or voting starts
    // a timer will start for 40 seconds and when time is up send an end phase event to move on to the next phase
    socket.on("nextPhase", (phaseData) => {
      stopPhaseTimer();
      console.log("Starting next phase!");
      console.log(phaseData.message);
      startTimer();
    });

    socket.on('stopTimer', () => {
      console.log("Stopping phase timer");
      stopPhaseTimer();
    });

    // When a client clicks the create button on the lobby page, this event fires adding a player to a list of active players
    // and sending that list to every connected client
    socket.on('create', (player) => {
      console.log(`${player.name} has joined a lobby`);
      gAttr.players.push(player);
      io.emit('updateList', [...gAttr.players]);
      // This fires twice to make sure that the client is receiving the updated list
      socket.on('requestList', () => io.emit([...gAttr.players]));
    });


    // Handles the chat functionality for players, sends the message to every conencted client
    socket.on('message', (data) => {
      console.log(data);
      io.emit('newMessage', data);
    })

    // When players first join a game they will see a waiting page, where they can wait for other players to join them,
    // when players are ready they will click a butotn that fires this event, and initializes data for the start of the game
    socket.on('start', (message) => {
      console.log(message);
      const initData = game.initGame(gAttr.players, 40);
      io.emit('gameStart', initData);
      // Starts the timer
      startTimer();
    });

    // When playes submit a prompt it will save the prompt to a list of prompts to be used to display for the voting screen
    // attributes associated with the prompt are needed to calculate point distribution.
    socket.on('submitPrompt', (promptData) => {
      console.log(promptData);
      // Save prompt text to list for display later
      gAttr.prompts.push({ prompt: promptData.prompt, userId: promptData.playerId });
      console.log("Prompt List: ", gAttr.prompts);
      io.emit("promptReceived", gAttr.prompts);
    });

    // When players click on a prompt to vote it will get the amount of votes for the current prompt, and increments it by one
    socket.on('voteSubmitted', (voteData) => {
      const prompt = voteData.prompt
      console.log(gAttr.prompts[prompt][votes]);
      if (gAttr.prompts[prompt].votes > 1) {
        let voteCount = game.prompts[prompt];
        voteCount++;
        gAttr.prompts[prompt] = voteCount;
      } else {
      }
      gAttr.prompts[prompt] = 1;
    });

    // Disconnecting
    socket.on('disconnect', () => {
      console.log(`A ${socket.id} has disconnected`);
      gAttr.players = gAttr.players.filter(player => player.id !== socket.id);
      io.emit('updateList', gAttr.players);
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
