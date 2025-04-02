import { Box, Typography, Divider } from '@mui/material';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const Chat = () => {
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
            <ChatBody />
            <ChatFooter />
        </Box>
    );
};

export default Chat;
