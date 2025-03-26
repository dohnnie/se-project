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
            px: '20px',
            overflowY: 'scroll',
||||||| 88ea5d5
            mb: '10px',
            width: '100%',
            height: '80vh',
            bgcolor: '#fff',
            px: '20px',
            overflowY: 'scroll',
=======
>>>>>>> mergeFix
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
