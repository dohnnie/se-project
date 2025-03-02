import React from 'react';
import WebSocketClient from './WebSocketClient';
import LobbyInit from './LobbyInit';
import LobbyManager from './LobbyManager';

const App: React.FC = () => {
  return (
    <div>
      <LobbyManager />
    </div>
  );
}

export default App;
