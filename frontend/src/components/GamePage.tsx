import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import PlayerCard from './PlayerCard';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import GameArea from './GameArea';
import VotingArea from './VotingArea';

const GamePage = ({ socket, status = 4 }) => {
    const navigate = useNavigate();

    const playerList = [
        { name: 'John', points: 10 },
        { name: 'Ryan', points: 25 },
        { name: 'Jose', points: 4 },
        { name: 'Tom', points: 100 },
        { name: 'Mark', points: 44 },
    ];

    const answers = [
        "cat",
        "dog",
        "animal",
        "This is a default prompt answer"
    ];

    const handleLobby = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <Box // page wrapper
            sx={{
                bgcolor: 'black',
                maxHeight: '100vh',
                maxWidth: '100vw',
                display: "flex",
                flexDirection: "column",
            }}>
            <Box // header
                sx={{
                    bgcolor: 'hotpink',
                    minHeight: '8vh',
                    minWidth: '100%',
                    border: 2,
                    borderColor: 'cyan',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 16px",
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
            <Box // main wrapper
                sx={{ 
                    display: "flex", 
                    flexDirection: "row",
                    minHeight: '92vh', 
                    minWidth: '100vw', 
                    maxWidth: "100vw",
                }}>
                <Box // player cards sidebar
                    sx={{
                        bgcolor: 'blue',
                        minHeight: '92vh',
                        minWidth: '20vw',
                        maxWidth: "20%",
                    }}
                >
                    {playerList.map(player =>
                        <PlayerCard player={player} />)}
                </Box>
                <Container // game/voting area
                    sx={{
                        bgcolor: 'red',
                        minHeight: '92vh',
                        minWidth: '60vw',
                        maxWidth: "60%",
                        flexGrow: 1,
                        justifyConent: "center",
                        alignItems: "center",
                        padding: "16px"
                    }}
                >
                    {(status !== 4) ? (<GameArea />) : (<VotingArea prompts={answers} />)}
                </Container>
                <Box // chatbox sidebar
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: '92vh',
                        minWidth: "20vw",
                        maxWidth: "20%",
                        bgcolor: 'orange',
                        justifyContent: "space-between",
                    }}
                >
                    <ChatBody />
                    <ChatFooter />
                </Box>
            </Box>
        </Box>
    );
};

export default GamePage;
