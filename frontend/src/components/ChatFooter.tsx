import { useState } from 'react';
import { Box, Input, Button, Divider } from '@mui/material';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState(() => '');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
    if (message.trim() && sessionStorage.getItem('name')) {
      socket.emit('message', {
        text: message,
        name: sessionStorage.getItem('name'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <Box
      sx={{
        p: '10px',
        bgcolor: 'white',
        height: '10vh',
        maxWidth: "20vw",
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '10px',
      }}>
      <Divider />
      <Box
        sx={{
          maxWidth: '100%',
        }}
      >
        <Input
          placeholder='Write message '
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            minWidth: '60%',
            maxWidth: '60%',
            mr: '8px',
          }}
        >
        </Input>
        <Button
          onClick={handleSendMessage}
          variant='contained'
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatFooter;
