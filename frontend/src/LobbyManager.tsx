import React, { useState, useEffect } from "react";

type LobbyResponse = {
  status: string;
  player_id: number;
  lobby: number;
};

const LobbyManager: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lobbyId, setLobbyId] = useState<number | null>(null);
  const [lobby_status, setLobbyStatus] = useState<string>("Close");
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [playerList, setPlayerList] = useState<number[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4001");

    ws.onopen = () => {
      console.log("Connected to WebSocker server");
      setSocket(ws);
    }

    ws.onmessage = (event) => {
      const num = JSON.parse(event.data);
      console.log(num.number);
    };

    ws.onerror = (error) => {
    };

  }, []);

  const handleCreateLobby = () => {
    if (socket) {
      setLobbyStatus("Open")
      //setPlayerList(
      setPlayerId(1);
      socket.send(JSON.stringify({ player: "player 1", status: "create", player_id: playerId }));
    }
  };

  const handleJoinLobby = (lobby_id: number) => {
    if (socket) {
      setLobbyId(lobby_id);
      setPlayerId(2);
      socket.send(JSON.stringify({ player: "player 2", status: "join", player_id: playerId, lobby_id: lobbyId }));
    }
  };

  return (
    <div>
      <h1> Lobby </h1>
      <button onClick={handleCreateLobby}> Create Lobby</button>
    </div>
  );
};

export default LobbyManager;
