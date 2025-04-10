import React, { useState, useEffect, useRef } from 'react';
import { socket } from './socket';
import GamePage from './components/GamePage';
import LobbyPage from './components/LobbyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [activePlayers, setActivePlayers] = useState(() => []);
  const [messages, setMessages] = useState(() => []);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    }
    const onDisconnect = () => {
      setIsConnected(false);
    }

    const updateList = (newList) => {
      console.log('List updated');
      setActivePlayers(() => newList);
    }

    const newMessage = (messageData) => {
      setMessages(prevMessages => [...prevMessages, messageData]);
    }


    socket.on('connected', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('updateList', updateList);
    socket.on('newMessage', newMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('updateList', updateList);
      socket.off('newMessage', newMessage);
    };
  }, []);

  return (
    <Box sx={{
      m: '0'
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LobbyPage isConnected={isConnected} socket={socket} />} />
          <Route path="/game" element={<GamePage socket={socket} playerList={activePlayers} messages={messages} />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
