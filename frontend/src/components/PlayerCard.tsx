import React from 'react';
import { Box } from '@mui/material';

const PlayerCard = ({ player }) => {

    const name = player.name;
    const points = player.points;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: 'white',
            maxHeight: '25vh',
            maxWidth: '100vw',
            my: '5px',
            p: '5px'
        }}>
            <p>Player ID icon</p>
            <h2>{name}</h2>
            <p>Prompting Role Icon Here</p>
            <p>Winning Icon Here</p>
            <p>{points}</p>
        </Box>
    );
}

export default PlayerCard;
