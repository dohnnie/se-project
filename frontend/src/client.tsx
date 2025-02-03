import WebSocket from 'ws';

const ws = new WebSocket('ws://loclahost:8765');


//Defining event listeners
ws.on('open', () => {
  console.log('WebSocket connection opened');

  //Send a message after the connection is open
  ws.send('Hello Server!');
});

ws.on('message', (data: WebSocket.Data) => {
  console.log('Received message from server: ${data}');
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});

ws.on('error', (error: Error) => {
  console.error('WebSocket error: ', error);
});

//Close the connection after 5 seconds (for example)
setTimeout( () => {
  ws.close();
}, 5000);
