#/usr/bin/env python

"""
For testing purposes, all players in the game need to be on the same network.
Need to grab the IP address of the host server, and set all player's IP to the host server?
"""
import asyncio
import json
import uuid
from websockets.asyncio.server import serve, broadcast
from websockets.exceptions import ConnectionClosed

# Hold a list of all active lobbies
active_lobbies = {}
connected = {}


async def handle_client(websocket):
    userId = str(uuid.uuid4())

    try:
        connected[userId] = websocket
        websocket.send(json.dumps({"header": "init", "userId": userId}))
        print(f"User {userId} connected!")
        print(f"Size of connect clients: {len(connected)}")


        async for message in websocket:
            client_data = json.loads(message)
            status = client_data.get("status")
            client_message = client_data.get("message")


    except ConnectionClosed:
        del connected[userId]
        print(f"User {userId} disconnected")


async def main():
    PORT = 4001
    print(f"Opening game_server.py connection on port: {PORT}")
    async with serve(handle_client, "", PORT) as server:
        await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
