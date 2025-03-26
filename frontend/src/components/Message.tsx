import { Box, Typography, Divider } from '@mui/material';

const Message = () => {
    return (
        <>
            <Box sx={{
<<<<<<< HEAD
                bgcolor: '#f5ccc2',
                width: '80%',
                p: '10px',
                borderRadius: '10px',
=======
                display: 'flex',
                flexDirection: 'row',
>>>>>>> e609475 (Added icons to player list)
                fontSize: '15px',
                mt: '5px',
                minHeight: '3vh'
            }}>
                <Typography component='p'>Other: </Typography>
                <Box sx={{
                    fontSize: '15px',
                }}>
                    <Typography component='p'>Hi</Typography>
                </Box>
            </Box>
            <Divider />
        </>
    );
};

export default Message;
