"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var ws = new ws_1.default('ws://loclahost:8765');
//Defining event listeners
ws.on('open', function () {
    console.log('WebSocket connection opened');
    //Send a message after the connection is open
    ws.send('Hello Server!');
});
ws.on('message', function (data) {
    console.log('Received message from server: ${data}');
});
ws.on('close', function () {
    console.log('WebSocket connection closed');
});
ws.on('error', function (error) {
    console.error('WebSocket error: ', error);
});
//Close the connection after 5 seconds (for example)
setTimeout(function () {
    ws.close();
}, 5000);
