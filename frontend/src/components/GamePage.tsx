import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import PlayerCard from './PlayerCard';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const GamePage = ({ socket }) => {
    const navigate = useNavigate();

    const playerList = [
        { name: 'John', points: 10 },
        { name: 'Ryan', points: 25 },
        { name: 'Jose', points: 4 },
        { name: 'Tom', points: 100 },
        { name: 'Mark', points: 44 },
    ];

    const handleLobby = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <Container
            sx={{
                bgcolor: 'black',
                minHeight: '100vh',
                minWidth: '100vw',
                display: "flex",
                flexDirection: "column"
            }}>
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
                <Button
                    variant='contained'
                    onClick={handleLobby}
                >
                    Lobbies
                </Button>
            </Box>
            <Box sx={{ minHeight: '92vh', minWidth: '100vw', display: "flex", flexDirection: "row" }}>
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
                <Box
                    sx={{
                        bgcolor: 'red',
                        minHeight: '92vh',
                        minWidth: '60vw',
                        maxWidth: '70vw',
                    }}
                >
                </Box>
                <Box
                    sx={{
                        bgcolor: 'orange',
                        minHeight: '92vh',
                        minWidth: '17vw',
                    }}
                >
                    <ChatBody />
                    <ChatFooter />
                </Box>
            </Box>
        </Container>
    );
};

export default GamePage;
