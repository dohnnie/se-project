import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import GamePage from './components/GamePage';
import LobbyPage from './components/LobbyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [activePlayers, setActivePlayers] = useState(() => []);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    }
    const onDisconnect = () => {
      setIsConnected(false);
    }

    const updateList = (newList) => {
      setActivePlayers(() => newList);
    }

    socket.on('connected', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('updateList', updateList);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <Box sx={{
      m: '0'
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LobbyPage isConnected={isConnected} socket={socket} />} />
          <Route path="/game" element={<GamePage socket={socket} playerList={activePlayers} />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
