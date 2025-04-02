import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const PlayerCard = ({ player }) => {
    const [points, setPoints] = useState(() => 0);

    const name = player.name;

    return (
        <Box sx={{
            margin: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '20vw',
            bgcolor: '#56A8F1',
            mb: '8px',
            padding: '8px',
            borderRadius: '10px',
            color: 'white',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}>
                <Box 
                    sx={{ 
                        width: 50,
                        height: 50,
                        bgcolor: '#004D17',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <PersonIcon sx={{
                        fontSize: '35px',
                    }} />
                </Box>
                <Typography variant='h3'
                    sx={{
                        flexGrow: 1,
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <BorderColorIcon sx={{
                    fontSize: '2rem',
                    color: '#F35B66',
                }} />
                <StarIcon sx={{
                    fontSize: '2.5rem',
                    color: '#F35B66',
                }} />
                <Typography variant='h4'
                    sx={{
                        flexGrow: 1,
                        fontWeight: 'bold',
                        color: '#4D0036',
                    }}
                >
                    {points}
                </Typography>
            </Box>
        </Box>
    );
}

export default PlayerCard;
