import { Box, Typography, Divider } from '@mui/material';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => {

    return (
        <Box
            sx={{
                bgcolor: 'white',
                minWidth: '10vw',
                borderRadius: '15px',
            }}
        >
            <Typography
                component='h1'
                sx={{
                    fontSize: '70px',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                Players
            </Typography>
            <Divider />
            {players.map(player => <PlayerCard player={player} />)}
        </Box>
    );
};

export default PlayerList;
