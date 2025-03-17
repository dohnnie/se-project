import React from 'react';
import { Box } from '@mui/material';

const PlayerCard = ({ player }) => {

    const name = player.name;
    const points = player.points;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <h1>Player ID icon</h1>
            <h2>{name}</h2>
            <h3>Prompting Role Icon Here</h3>
            <h3>Winning Icon Here</h3>
            <p>{points}</p>
        </Box>
    );
}

export default PlayerCard;
