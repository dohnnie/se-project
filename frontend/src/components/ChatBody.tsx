import { Box } from '@mui/material';
import Message from './Message';

const ChatBody = () => {

    return (
        <Box sx={{
            mb: '10px',
            width: '100%',
            height: '80vh',
            bgcolor: '#fff',
            px: '20px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse'
        }}>
            <Message />
            <Message />
        </Box >
    );
};

export default ChatBody;
