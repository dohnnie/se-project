import { Box, Typography } from '@mui/material';

const ClientMessage = () => {
    return (
        <Box sx={{
            fontSize: '13px',
        }}>
            <Typography component='p'
                sx={{
                    textAlign: 'right'
                }}>You</Typography>
            <Box sx={{
                bgcolor: '#c2f3c2',
                maxWidth: '300px',
                p: '10px',
                borderRadius: '10px',
                marginLeft: 'auto',
                fontSize: '15px',
            }}>
                <Typography component='p'>Hello</Typography>
            </Box>
        </Box>
    );
};

export default ClientMessage;
