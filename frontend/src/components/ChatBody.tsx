import { Box } from '@mui/material';
import ClientMessage from './ClientMessage';
import Message from './Message';

const ChatBody = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            maxwidth: '20vw',
            height: '80vh',
            mb: '10px',
            bgcolor: '#fff',
            padding: '20px',
            overflowY: 'scroll',
        }}>
            <ClientMessage />
            <Message />
        </Box >
    );
};

export default ChatBody;
