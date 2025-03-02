#/usr/bin/env python

import asyncio
import websockets
import json
from websockets.legacy.protocol import broadcast
from websockets.server import WebSocketServerProtocol, serve


# This will hold active connections
active_lobbies = {}
connected_clients = set() # Track all connected clients

async def handle_client(websocket: WebSocketServerProtocol, path: str):
    connected_clients.add(websocket)

    try:
        async for message in websocket:
            data = json.loads(message)
            action = data.get("action")

            if action == "create":
                # Create a new lobby
                lobby_id = str(len(active_lobbies) + 1)
                active_lobbies[lobby_id] = {"host": websocket, "players": [websocket]}

                # Send confirmation
                await websocket.send(json.dumps({"status": "created", "lobby_id": lobby_id}))
                await broadcast_lobby_list()

            elif action == "join":
                # Join an existing lobby
                lobby_id = data.get("lobby_id")
                if lobby_id in active_lobbies:
                    active_lobbies[lobby_id]["players"].append(websocket)
                    await websocket.send(json.dumps({"status": "joined", "lobby_id":lobby_id}))

                    host = active_lobbies[lobby_id]["host"]
                    await host.send(json.dumps({"status": "player_joined", "lobby_id": lobby_id}))

                    await broadcast_lobby_list()
                else:
                    await websocket.send(json.dumps({"status":"error", "message": "Lobby not found"}))
            elif action == "list":
                await websocket.send(json.dumps({"status": "lobby_list", "lobbies":list(active_lobbies.keys())}))
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Cleanup when connection closes
        connected_clients.discard(websocket)
        for lobby_id, lobby in active_lobbies.items():
            if websocket in lobby["players"]:
                lobby["players"].remove(websocket)

                if len(lobby["players"]) == 0:
                    # Delete from database if no players remain
                    del active_lobbies[lobby_id]
                    await broadcast_lobby_list()


async def broadcast_lobby_list():
    """ Send the updated list of active lobbies to all connected clients."""
    if connected_clients:
        message = json.dumps({"status": "lobby_list", "lobbies":list(active_lobbies.keys())})
        websockets_to_remove = []
        for ws in connected_clients:
            try:
                await ws.send(message)
            except:
                websockets_to_remove.append(ws)

        # Remove disconnected clients
        for ws in websockets_to_remove:
            connected_clients.discard(ws)

async def main():
    PORT = 4001
    print(f"Opening connection on port: {PORT}")
    async with serve(handle_client, "0.0.0.0", PORT):
        await asyncio.Future()
    #server = await serve(handle_client, "0.0.0.0", PORT)
    #await server.wait_closed()

if __name__ == "__main__":
        asyncio.run(main())
