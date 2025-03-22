import { Box } from '@mui/material';
import ClientMessage from './ClientMessage';
import Message from './Message';

const ChatBody = () => {

    return (
        <Box sx={{
            mb: '10px',
            width: '100%',
            height: '80vh',
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
