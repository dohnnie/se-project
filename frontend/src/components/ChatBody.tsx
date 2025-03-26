import { Box } from '@mui/material';
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
            px: '20px',
            overflowY: 'scroll',
        }}>
            <Message />
            <Message />
        </Box >
    );
};

export default ChatBody;
