import React from 'react';
import { Box, Button, Typography } from '@mui/material';


const WaitingArea = () => {
    
    
    const playerCount = 1;
    const MAX_PLAYERS = 5;

    
    const spotsLeft = MAX_PLAYERS - playerCount;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#4D0036',
                color: 'white',
                borderRadius: '10px',
                width: '100%',
                height: '100%',
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, color: '#F35B66' }}>
                Waiting for Players
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#56A8F1' }}>
                Spots Left: {spotsLeft}
            </Typography>
            <Button
                variant="contained"
                sx={{
                    bgcolor: '#004D17',
                    '&:hover': { bgcolor: '#56A8F1', color: 'black' },
                    color: 'white',
                }}
            >
                Start Now
            </Button>
        </Box>
    );
};

export default WaitingArea;
