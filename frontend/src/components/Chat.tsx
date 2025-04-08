import { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState(() => []);

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      console.log(data);
      setMessages([...messages, data])
      console.log(messages);
    });
  }, [socket, messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        minWidth: '15%',
        bgcolor: 'white',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '50px',
          }}
        >
          Chat
        </Typography>
      </Box>
      <Divider />
      <ChatBody messages={messages} />
      <ChatFooter socket={socket} />
    </Box>
  );
};

export default Chat;
