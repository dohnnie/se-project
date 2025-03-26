import React from 'react';
import { Box } from '@mui/material';

const PlayerCard = ({ player }) => {

    const name = player.name;
    const points = player.points;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: 'white',
            maxHeight: '25vh',
            maxWidth: '100vw',
            width: "100%",
            padding: "10px",
            overflow: "hidden",
            flexWrap: "wrap", // Allows wrapping to mitigate overflow
            my: '5px',
            p: '5px' 
        }}>            
            <p
            style={{
                flex: "1 1 0", // text shrinks instead of overflowing
                minWidth: "0", 
                textAlign: "center"
            }}>Player ID icon</p>
            <h2
            style={{
                margin: "0 10px",
                flex: "1 1 0",
                minWidth: "0", 
                whiteSpace: "nowrap", // prevents breaking words mid-letter
                overflow: "hidden",
                textOverflow: "ellipsis" // If the name is very long, overflow gets "..."
            }}>{name}</h2>
            <p
            style={{
                flex: "1 1 0",
                minWidth: "0", 
                textAlign: "center"
            }}>Prompting Role Icon Here</p>
            <p
            style={{
                flex: "1 1 0",
                minWidth: "0", 
                textAlign: "center"
            }}>Winning Icon Here</p>
            <p
            style={{
                flex: "1 1 0",
                fontWeight: "bold",
                minWidth: "0", 
                textAlign: "center"
            }}>{points}</p>
        </Box>
    );
}

export default PlayerCard;
