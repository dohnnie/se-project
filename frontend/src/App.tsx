import React from 'react';
import Lobby from './Lobby';
import socketIO from 'socket.io-client';
import GamePage from './GamePage';

const socket = socketIO.connect('http://localhost:4001');

const App: React.FC = () => {
  return (
    <>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <div>
        <GamePage />
      </div>
    </>
  );
}

export default App;
