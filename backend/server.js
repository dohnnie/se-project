const express = require('express');
const app = express();
const PORT = 4001;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4000"
  }
});

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/api', (req, res) => {
  res.send("Hello, World!");
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
