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
        background: '',
        border: '1px solid transparent',
        borderImage: 'linear-gradient(90deg, #2b6cb0, #37b2ab) 1',
        boxShadow: '0px 4px 10px rgba(150, 200, 240, 0.4)',
        padding: '10px',
        margin: '5px',
        mt: '12vh',
        gap: '12px',
      }}
    >
      <Typography
  component="h1"
  variant="h1"
  sx={{
    fontSize: '70px',
    fontWeight: 'bold',
    position: 'relative',
    p: '0px',
    mx: 'auto',         // Auto horizontal margins center the element
    textAlign: 'center',  // Center the text within the element
    color: 'white',       // Fallback color (won't be visible due to clipping)
    background: 'white',
    backgroundSize: '200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.25rem',
    mb: 4
  }}
>
  Players
</Typography>





<Divider
  sx={{
    height: '0px',
    borderColor: '#37b2ab',
    mt: -2,
    mb: 0,
  }}

      

      ></Divider>
      {players.map(player => <PlayerCard key={player.id} player={player} />)}
    </Box>
  );
};

export default PlayerList;
