import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { Box, Typography } from '@mui/material';

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
<<<<<<< HEAD
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
=======
            maxHeight: '25vh',
            maxWidth: '100vw',
            minWidth: '100vw',
            my: '5px',
            p: '5px',
            justifyContent: 'start',
            alignContent: 'start',
        }}>
            <PersonIcon sx={{
                fontSize: '35px',
                my: '20px',
                mx: '5px',
            }} />
            <Box sx={{
                my: '10px',
                ml: '5px',
                width: '14%',
                pl: '10px'
            }}>
                <Typography component='h1'
                    sx={{

                        fontSize: '40px',
                    }}
                >
                    {name}
                </Typography>
            </Box>
            <BorderColorIcon sx={{
                fontSize: '35px',
                my: '20px',
                mx: '5px',
            }} />
            <StarIcon sx={{
                fontSize: '35px',
                my: '20px',
                mx: '5px',
            }} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                alignContent: 'end',
                bgcolor: 'white',
                minWidth: '2%',
                maxWidth: '3%',
            }}>
                <Typography component='h1'
                    sx={{
                        fontSize: '37px',
                        my: '10px',
                    }}
                >
                    {points}
                </Typography>
            </Box>
>>>>>>> e609475 (Added icons to player list)
        </Box>
    );
}

export default PlayerCard;
