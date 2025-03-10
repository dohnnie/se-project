import React, { useState, useEffect } from "react";


const Lobby = ({ websocket }) => {
  const [lobbyId, setLobbyId] = useState<number | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4001");

    websocket.onopen = () => {
      console.log("Connected to WebSocker server");
    }

    websocket.onmessage = (event) => {
      const num = JSON.parse(event.data);
      console.log(num.number);
    };

    websocket.onerror = (error) => {
    };

    websocket.onclose = () => {
      console.log("Connection Closed");
      ws.send(JSON.stringify({ status: "close", message: "Connection close" }));
    };

  },);

  const handleCreateLobby = () => {
    if (websocket) {
      //setPlayerList(
      setPlayerId(1);
      websocket.send(JSON.stringify({ player: "player 1", status: "create", player_id: playerId }));
    }
  };

  const handleJoinLobby = (lobby_id: number) => {
    if (websocket) {
      setLobbyId(lobby_id);
      setPlayerId(2);
      websocket.send(JSON.stringify({ player: "player 2", status: "join", player_id: playerId, lobby_id: lobbyId }));
    }
  };

  return (
    <div>
      <h1> Lobby </h1>
      <button onClick={handleCreateLobby}> Create Lobby</button>
    </div>
  );
};

export default Lobby;
