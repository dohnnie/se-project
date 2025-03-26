import { Box, Typography, Divider } from '@mui/material';

const Message = () => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
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
