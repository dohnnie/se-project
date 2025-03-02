import React, { useState, useEffect } from 'react';

interface Lobby {
  name: string;
  id: string;
}

const LobbyInit: React.FC = () => {
  const [lobbyId, setLobbyId] = useState<string>('');
  const [newLobbyId, setNewLobbyId] = useState<string>('');
  const [lobbies, setLobbies] = useState<Lobby[]>([]);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4001');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event: MessageEvent) => {
      //Handle incoming messages
    }

    ws.onerror = (error: Event) => {
      console.error(`WebSocket Error: ${error}`);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage('');
    } else {
      console.error('Websocket connection is not open');
    }
  };

  // Handle create lobby
  const handleCreateLobby = () => {
    const newLobby = {
      name: `Lobby-${Math.floor(Math.random() * 1000)}`,
      id: `id-${Math.floor(Math.random() * 10000)}`,
    };
    setLobbies([...lobbies, newLobby]);
    setNewLobbyId(newLobby.id);
    alert(`New Lobby Created! Lobby ID: ${newLobby.id}`);
  };

  // Handle join lobby
  const handleJoinLobby = (id: string) => {
    const lobby = lobbies.find((lobby) => lobby.id === id);
    if (lobby) {
      alert(`Joining Lobby: ${lobby.name}`);
    } else {
      alert(`Lobby not found`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lobby System </h1>
      <div>
        <h2>Create a Lobby</h2>
        <button onClick={handleCreateLobby}>Create New Lobby</button>
        {newLobbyId && <p>New Lobby ID: {newLobbyId}</p>}
      </div>

      <div>
        <h2>Join an Existing Lobby</h2>
        <input
          type="text"
          value={lobbyId}
          onChange={(e) => setLobbyId(e.target.value)}
          placeholder="Enter Lobby ID"
        />
        <button onClick={() => handleJoinLobby(lobbyId)}>Join Lobby</button>
      </div>

      <div>
        <h2>Available Lobbies</h2>
        {lobbies.length === 0 ? (
          <p>No lobbies available.</p>
        ) : (
          <ul>
            {lobbies.map((lobby) => (
              <li key={lobby.id}>
                <span>{lobby.name} - ID: {lobby.id}</span>
                <button onClick={() => handleJoinLobby(lobby.id)}>Join</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LobbyInit;
