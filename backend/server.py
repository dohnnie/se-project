#!/usr/bin/env python

import asyncio

from websockets.asyncio.server import serve

async def hello(websocket):
    name = await websocket.recv()
    print(f"<<< {name}!")

    greeting = f"Hello {name}!"

    await websocket.send(greeting)
    print(f">>> {greeting}")

async def main():
    PORT = 8765
    status = None;
    while(status != 'q'):
        status = input("Ready! Press s to start server and q to quit! ")
        if(status == 's'):
            print(f"Opening connection on port: {PORT}")
            async with serve(hello, "localhost", PORT):
                await asyncio.get_running_loop().create_future() # runs forever
        else:
            print(f"{status} is not a supported command.")

if __name__ == "__main__":
        asyncio.run(main())
