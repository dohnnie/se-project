///SERVER INDEX JS

const express = require('express');
const cors = require('cors');
const http = require('http');
const Replicate = require('replicate');
const path = require('path');
require('dotenv').config();

// At the top of your server index.js, after your require statements:
let lobbies = {}; // e.g., { "1234": { players: [playerObj, ...], status: 1 } }

const app = express();
const PORT = process.env.PORT || 3000;
// const expressServer = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });    Griffin delettion


// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// Create an HTTP server to wrap the Express app
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


let players = [];
let prompts = {};

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


    /////// LObby Creation 
  // Event: Create a lobby
  // Event: Create a lobby
socket.on('createLobby', (playerData) => {
  const { name, lobbyPin } = playerData;
  
  // Create the lobby if it doesn't exist.
  if (!lobbies[lobbyPin]) {
    lobbies[lobbyPin] = { players: [], status: 1 }; // 1 means waiting/loading
  }
  
  const player = { id: socket.id, name };
  lobbies[lobbyPin].players.push(player);
  socket.join(lobbyPin);
  // Save lobby on socket for reference:
  socket.lobby = lobbyPin;
  
  // Emit updated list to everyone in this lobby.
  io.to(lobbyPin).emit('updateList', lobbies[lobbyPin].players);
  console.log(`${name} created and joined lobby ${lobbyPin}`);
  
  // If at least 3 players, start the game.
  if (lobbies[lobbyPin].players.length >= 3 && lobbies[lobbyPin].status === 1) {
    lobbies[lobbyPin].status = 2; // Change status to "prompting"
    const randomIndex = Math.floor(Math.random() * lobbies[lobbyPin].players.length);
    const chosenPrompter = lobbies[lobbyPin].players[randomIndex];
    io.to(lobbyPin).emit('gameStart', {
      status: 2,
      prompter: chosenPrompter.name, // send the chosen player's name
      startTime: 30,
    });
  }
});
  
  // Event: Join a lobby
socket.on('joinLobby', (playerData) => {
  const { name, lobbyPin } = playerData;
  
  // If lobby doesn't exist, send back an error.
  if (!lobbies[lobbyPin]) {
    socket.emit('errorMessage', { message: 'Lobby does not exist' });
    return;
  }
  
  const player = { id: socket.id, name };
  lobbies[lobbyPin].players.push(player);
  socket.join(lobbyPin);
  socket.lobby = lobbyPin;
  
  // Emit updated list to everyone in this lobby.
  io.to(lobbyPin).emit('updateList', lobbies[lobbyPin].players);
  console.log(`${name} joined lobby ${lobbyPin}`);
  
  // If the lobby just reached 3 players and is still waiting:
  if (lobbies[lobbyPin].players.length >= 3 && lobbies[lobbyPin].status === 1) {
    lobbies[lobbyPin].status = 2;
    const randomIndex = Math.floor(Math.random() * lobbies[lobbyPin].players.length);
    const chosenPrompter = lobbies[lobbyPin].players[randomIndex];
    io.to(lobbyPin).emit('gameStart', {
      status: 2,
      prompter: chosenPrompter.name,
      startTime: 30,
    });
  }
});
  }

  
  

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
