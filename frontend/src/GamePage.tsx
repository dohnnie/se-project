import React from 'react';
import { Container, Box } from '@mui/material';

const GamePage = () => {

    return (
        /* Wrapper Div*/
        <Container sx={{ bgcolor: 'black', minHeight: '100vh', minWidth: '100vw' }}>
            { /* Header*/}
            <Box
                sx={{
                    bgcolor: 'hotpink',
                    minHeight: '8vh',
                    minWidth: '100vw',
                    border: 2,
                    borderColor: 'white'
                }}
            >
                <p>Hello Header</p>
            </Box>
            {/* Wrapper div for layout*/}
            <Box sx={{ minHeight: '92vh', minWidth: '100vw', flexDirection: 'row' }}>
                {/* Player list */}
                <Box
                    sx={{
                        bgcolor: 'blue',
                        minHeight: '92vh',
                        minWidth: '25vw',
                    }}
                >
                    <p>Hello Players</p>
                </Box>
                {/* Play Area */}
                <Box
                    sx={{
                        bgcolor: 'red',
                        minHeight: '92vh',
                        minWidth: '50vw',
                    }}
                >
                    <p>Hello Play</p>
                </Box>
                {/* Chat */}
                <Box
                    sx={{
                        bgcolor: 'orange',
                        minHeight: '92vh',
                        minWidth: '25vw',
                    }}
                >
                    <p>Hello Chat</p>
                </Box>
            </Box>
        </Container>
    );
};

export default GamePage;
