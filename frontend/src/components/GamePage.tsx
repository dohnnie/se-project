import React from 'react';
import { Container, Box, Button } from '@mui/material';
import PlayerCard from './PlayerCard';

const GamePage = ({ websocket }) => {

    const playerList = [
        { name: 'John', points: 10 },
        { name: 'Ryan', points: 25 },
        { name: 'Jose', points: 4 },
        { name: 'Tom', points: 100 },
        { name: 'Mark', points: 44 },
    ];

    return (
        /* Wrapper Div*/
        <Container
            sx={{
                bgcolor: 'black',
                minHeight: '100vh',
                minWidth: '100vw',
                display: "flex",
                flexDirection: "column"
            }}>
            { /* Header*/}
            <Box
                sx={{
                    bgcolor: 'hotpink',
                    minHeight: '8vh',
                    minWidth: '100vw',
                    border: 2,
                    borderColor: 'cyan',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <h1>Picprompt</h1>
                <Button sx={{
                    px: 10,
                }} variant='contained'>
                    Lobbies
                </Button>
            </Box>
            {/* Wrapper div for layout*/}
            <Box sx={{ minHeight: '92vh', minWidth: '100vw', display: "flex", flexDirection: "row" }}>
                {/* Player list */}
                <Box
                    sx={{
                        bgcolor: 'blue',
                        minHeight: '92vh',
                        minWidth: '10vw',
                    }}
                >
                    {playerList.map(player =>
                        <PlayerCard player={player} />)}
                </Box>
                {/* Play Area */}
                <Box
                    sx={{
                        bgcolor: 'red',
                        minHeight: '92vh',
                        minWidth: '60vw',
                        maxWidth: '70vw',
                    }}
                >
                </Box>
                {/* Chat */}
                <Box
                    sx={{
                        bgcolor: 'orange',
                        minHeight: '92vh',
                        minWidth: '17vw',
                    }}
                >
                </Box>
            </Box>
        </Container>
    );
};

export default GamePage;
