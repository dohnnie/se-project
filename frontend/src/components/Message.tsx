import { Box, Typography, Divider } from '@mui/material';

const Message = ({ name, message }) => {
  return (
    <>
      <Box sx={{
        width: '80%',
        display: 'flex',
        fontSize: '15px',
        mt: '5px',
        minHeight: '3vh'
      }}>
        <Typography component='p' sx={{ fontSize: '20px' }}>{name}: {message}</Typography>
      </Box >
      <Divider />
    </>
  );
};

export default Message;
