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
  const prompter = useRef('');
  const [status, setStatus] = useState(() => 0);
  const [time, setTime] = useState(null);
  const messagesRef = useRef(messages);
  const [prompts, setPrompts] = useState(() => []);

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

    const handleInitGame = (initData) => {
      setStatus(prevStatus => prevStatus = initData.status);
      prompter.current = initData.prompter;
      setTime(initData.startTime);
    }

    const receiveNewPrompts = (promptData) => {
      setPrompts(() => promptData);
    }

    const handleEndPhase = (roundData) => {
      console.log("Round over! nextStatus: ", roundData.statusCode);
      setStatus(roundData.statusCode);
      if (roundData.statusCode === 5) {
        socket.emit('stopTimer');
      } else {
        socket.emit("nextPhase", { message: "Start next Round" });
      }
    }

    socket.on('connected', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('updateList', updateList);
    socket.on('newMessage', newMessage);
    socket.on('gameStart', handleInitGame);
    socket.on('phaseEnd', handleEndPhase);
    socket.on('promptReceived', receiveNewPrompts);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('updateList', updateList);
      socket.off('newMessage', newMessage);
      socket.off('gameStart', handleInitGame);
      socket.off('phaseEnd', handleEndPhase);
    };
  }, []);

  return (
    <Box sx={{
      m: '0'
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LobbyPage isConnected={isConnected} socket={socket} />} />
          <Route path="/game" element={<GamePage socket={socket} status={status} playerList={activePlayers} messages={messages} prompts={prompts} />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
