import { Box, Typography, Divider } from '@mui/material';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '20vw',
        minWidth: '20vw',
        maxHeight: '92vh',
        height: '70%',
        bgcolor: '#56A8F1',
        padding: '10px',
        margin: '5px',
        mt: '12vh',
        borderRadius: '15px',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Typography
        component='h1'
        sx={{
          fontSize: '70px',
          display: 'flex',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        Players
      </Typography>
      {players.map(player => <PlayerCard player={player} />)}
    </Box>
  );
};

export default PlayerList;
