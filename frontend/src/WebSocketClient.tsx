import React, { useState, useEffect } from 'react';

// Define the types for WebSocket state and messages
interface WebSocketClientProps { }

const WebSocketClient: React.FC<WebSocketClientProps> = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket type for the socket state
  const [message, setMessage] = useState<string>(''); // Type for the message input
  const [messages, setMessages] = useState<string[]>([]); // Type for the received messages (array of strings)

  useEffect(() => {
    // Create WebSoekct connection
    const ws = new WebSocket('ws://localhost:4001');

    // Event handlers for WebSocket
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event: MessageEvent) => {
      //Handle incoming messages
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (error: Event) => {
      console.error('Websocket Error: ', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Set the WebSocket instance to state
    setSocket(ws);

    // Cleanup WebSocket connection when the component is unmounted
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); // Empty dependency array to run once on compoennt mount

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message); // Send message to the WebSocket server
      setMessage(''); // Clear input field
    } else {
      console.error('Websocket connection is not open');
    }
  };

  return (
    <div>
      <h1>Websocket Client</h1>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send Message </button>
      </div>

      <div>
        <h2>Received Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketClient;
