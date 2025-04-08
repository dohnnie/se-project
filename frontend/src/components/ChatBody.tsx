import { Box } from '@mui/material';
import Message from './Message';

const ChatBody = ({ messages }) => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column-reverse',
      maxwidth: '20vw',
      height: '80vh',
      bgcolor: '#fff',
      overflowY: 'scroll',
      mb: '10px',
      px: '20px',
    }}>
      {
        messages.map((message) => {
          <Message key={message.id} name={message.name} message={message.text} />
        })
      }
    </Box >
  );
};

export default ChatBody;
