import { Box } from '@mui/material';
import Message from './Message';

type Message = {
  text: string,
  name: string,
  id: string,
  socketID: string,
}

const ChatBody = ({ messages }) => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
      maxwidth: '20vw',
      height: '80vh',
      bgcolor: '#fff',
      overflowY: 'scroll',
      mb: '10px',
      px: '20px',
    }}>
      {
        messages.map((message: Message) =>
          <Message key={message.id} name={message.name} message={message.text} />
        )
      }
    </Box >
  );
};

export default ChatBody;
