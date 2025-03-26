import { Box, Typography } from '@mui/material';

const Message = () => {
    return (
        <Box sx={{ fontSize: '13px' }}>
            <Typography component='p'>Other</Typography>
            <Box sx={{
                bgcolor: '#f5ccc2',
                width: '80%',
                p: '10px',
                borderRadius: '10px',
                fontSize: '15px',
            }}>
                <Typography component='p'>Hi</Typography>
            </Box>
        </Box>
    );
};

export default Message;
