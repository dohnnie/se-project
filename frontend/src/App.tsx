import React from 'react';
import { io } from 'socket.io-client';
import GamePage from './components/GamePage';
import LobbyPage from './components/LobbyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

const socket = io('http://localhost:3000');

const App: React.FC = () => {
  return (
    <Box sx={{
      m: '0'
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LobbyPage socket={socket} />} />
          <Route path="/game" element={<GamePage socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
