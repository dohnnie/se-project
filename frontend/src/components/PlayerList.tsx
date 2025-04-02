import { Box, Typography, Divider } from '@mui/material';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => {

    return (
        <Box
            sx={{
                maxWidth: '20vw',
                minWidth: '20vw',
                bgcolor: '#56A8F1',
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
