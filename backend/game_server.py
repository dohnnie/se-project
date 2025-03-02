#/usr/bin/env python

import asyncio
import json
from websockets.asyncio.server import serve, broadcast

# Hold a list of all active lobbies
active_lobbies = {}
num_of_clients = 0
connected = []

async def handle_client(websocket):
    global num_of_clients
    connected.append(websocket)
    
    broadcast(connected, json.dumps({"number": num_of_clients}))

    async for message in websocket:
        client_data = json.loads(message)
        status = client_data.get("status")
        if status == "create":
            num_of_clients += 1

        print(f"Number of clients connected: {num_of_clients}")
        server_message = json.dumps({"number": num_of_clients})
        await websocket.send(server_message)

async def main():
    PORT = 4001
    print(f"Opening game_server.py connection on port: {PORT}")
    async with serve(handle_client, "", PORT) as server:
        await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
