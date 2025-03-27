import { Box } from '@mui/material';
import Message from './Message';

const ChatBody = () => {

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
            <Message />
            <Message />
        </Box >
    );
};

export default ChatBody;
