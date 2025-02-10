#/usr/bin/env python

import asyncio

from websockets.asyncio.server import serve

async def handler(websocket):
    async for message in websocket:
        print(message)

async def main():
    PORT = 4001
    status = None;
    print(f"Opening connection on port: {PORT}")
    async with serve(handler, "localhost", PORT):
        await asyncio.get_running_loop().create_future() # runs forever

if __name__ == "__main__":
        asyncio.run(main())
