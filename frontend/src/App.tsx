import React from 'react';
import { io } from 'socket.io-client';
import GamePage from './components/GamePage';
import LobbyPage from './components/LobbyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const socket = io('http://localhost:3000');

const App: React.FC = () => {
  return (
    <>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LobbyPage socket={socket} />} />
            <Route path="/game" element={<GamePage socket={socket} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
