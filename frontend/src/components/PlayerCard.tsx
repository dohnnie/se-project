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
            overflowWrap: "break-word",
            my: '5px',
            p: '5px', 
            maxWidth: "20vw"
        }}>            
            <p
            style={{
                flex: "1 1 0",
                minWidth: "0", 
                textAlign: "center",
            }}>Player ID icon</p>
            <h2
            style={{
                margin: "0 10px",
                flex: "1 1 0",
                minWidth: "0", 
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}>{name}</h2>
            <p
            style={{
                flex: "1 1 0",
                minWidth: "0", 
                textAlign: "center",
            }}>Prompting Role Icon Here</p>
            <p
            style={{
                flex: "1 1 0",
                minWidth: "0", 
                textAlign: "center",
            }}>Winning Icon Here</p>
            <p
            style={{
                flex: "1 1 0",
                fontWeight: "bold",
                minWidth: "0", 
                textAlign: "center",
            }}>{points}</p>
        </Box>
    );
}

export default PlayerCard;
