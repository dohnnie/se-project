import React, { useState, useEffect } from "react";

// Define Typescript types
type WebSocketMessage = {
  action: string;
  lobby_id?: string;
};

type LobbyResponse = {
  status: string;
  lobby_id?: string;
  lobbies?: string[];
  message?: string;
};

const LobbyComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [lobbies, setLobbies] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4001");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(ws);
      // Request the list of active lobbies on connect
      ws.send(JSON.stringify({ action: "list" }));
    }

    ws.onmessage = (event) => {
      const message: LobbyResponse = JSON.parse(event.data);

      if (message.status === "created") {
        setLobbyId(message.lobby_id || "");
        setStatus("Lobby Created");
      } else if (message.status === "joined") {
        setLobbyId(message.lobby_id || "");
        setStatus("Joined the lobby!");
      } else if (message.status === "player_joined") {
        setStatus("A new player joined your lobby!");
      } else if (message.status === "error") {
        setStatus(message.message || "Error");
      } else if (message.status === "lobby_list" && message.lobbies) {
        setLobbies(message.lobbies)
      }

    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("WebSocket connection error.");
    };

    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: "list" }));
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, []);

  const handleCreateLobby = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: "create" }));
    }
  };

  const handleJoinLobby = (id: string) => {
    if (socket) {
      socket.send(JSON.stringify({ action: "join", lobby_id: id }));
    }
  };

  const renderLobbiesList = () => {
    return Object.keys(lobbies).map((id) => (
      <button key={id} onClick={() => handleJoinLobby(id)}>
        Join Lobby {id}
      </button>
    ));
  };

  return (
    <div>
      <h1>Lobby Management</h1>
      <p>Status: {status}</p>
      {!lobbyId && (
        <>
          <button onClick={handleCreateLobby}>Create Lobby</button>
          <div>
            <h2>Available Lobbies</h2>
            {lobbies.length > 0 ? (lobbies.map((id) => (
              <button key={id} onClick={() => handleJoinLobby(id)}>
                Join Lobby {id}
              </button>
            ))
            ) : (
              <p>No active lobbies. </p>
            )}
          </div>
        </>
      )}
      {lobbyId && <p>You are in Lobby {lobbyId}</p>}
    </div>
  );
};

export default LobbyComponent;
