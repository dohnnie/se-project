import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Divider } from '@mui/material';
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
        <Box
            sx={{
                bgcolor: 'black',
<<<<<<< HEAD
                maxHeight: '100vh',
                maxWidth: '100vw',
=======
                maxHeight: 'calc(100vh - 10px)',
                maxWidth: '100%',
                display: "flex",
                flexDirection: "column",
                m: '0',
            }}>
            <Box
                sx={{
                    bgcolor: 'hotpink',
<<<<<<< HEAD
                    minHeight: '8vh',
                    minWidth: '100%',
=======
                    maxHeight: '8vh',
                    minWidth: '100vw',
>>>>>>> e609475 (Added icons to player list)
                    border: 2,
                    borderColor: 'cyan',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 16px",
                }}
            >
                <Typography component='h1'
                    sx={{
                        fontSize: '70px',
                        m: 1,
                    }}
                >
                    Picprompt
                </Typography>
                <Button
                    variant='text'
                    onClick={handleLobby}
                    sx={{
                        size: 'small',
                        minHeight: '5vh',
                        display: 'flex',
                        color: 'black',
                        m: 1,
                    }}
                >
                    Lobbies
                </Button>
            </Box>
            <Box
                sx={{ 
                    display: "flex", 
                    flexDirection: "row",
                    minHeight: '92vh', 
                    minWidth: '100vw', 
                    maxWidth: "100vw",
                }}>
                <Box
                    sx={{
                        bgcolor: 'blue',
                        minHeight: '92vh',
<<<<<<< HEAD
                        minWidth: '20vw',
                        maxWidth: "20%",
=======
                        minWidth: '10vw',
                        borderRadius: '15px',
>>>>>>> e609475 (Added icons to player list)
                    }}
                >
                    <Typography
                        component='h1'
                        sx={{
                            fontSize: '70px',
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center',
                            bgcolor: 'white',
                        }}
                    >
                        Players
                    </Typography>
                    <Divider />
                    {playerList.map(player =>
                        <PlayerCard player={player} />)}
                </Box>
                <Container
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
                    {(status !== 4) ? (<GameArea status={status} />) : (<VotingArea prompts={answers} />)}
                </Container>
                <Box
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
