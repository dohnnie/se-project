import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Divider } from '@mui/material';
import PlayerList from './PlayerList';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import GameArea from './GameArea';
import VotingArea from './VotingArea';
import WaitingArea from './WaitingArea';
import WinningVoteArea from './WinningVoteArea';

const GamePage = ({ socket, status = 2 }) => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState(() => []);

    useEffect(() => {
        socket.on('updateList', pList => {
            console.log(pList);
            const newList = pList;
            setPlayers(() => newList);
        });
    }, [socket, players]);

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

    const renderGameContent = () => {
        switch (status) {
            case 0:
                return <WaitingArea />;
            case 4:
                return <VotingArea prompts={answers} />;
            case 5:
                return <WinningVoteArea winningPrompt={answers[0]} winnerName={playerList[0].name} />;
            default:
                return <GameArea status={status} />;
        }
    }

    return (
        <Box
            sx={{
                bgcolor: '#4D0036',
                maxHeight: '100vh',
                maxWidth: '100vw',
                display: "flex",
                flexDirection: "column",
                m: '0px',
            }}>
            <Box
                sx={{
                    bgcolor: '#F35B66',
                    minHeight: '8vh',
                    maxHeight: '8vh',
                    minWidth: '100vw',
                    border: 2,
                    borderColor: '#56A8F1',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography component='h1'
                    sx={{
                        color: 'white',
                        fontSize: '70px',
                        m: 1,
                    }}
                >
                    Picprompt
                </Typography>
                <Button
                    sx={{
                        size: 'small',
                        minHeight: '5vh',
                        display: 'flex',
                        color: 'white',
                        m: 1,
                    }}
                    variant='contained'
                    onClick={handleLobby}
                >
                    Lobbies
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    minHeight: '92vh',
                    maxHeight: '92vh',
                    minWidth: '100vw',
                    maxWidth: '100vw',
                    bgcolor: '#56A8F1',
                }}>
                <PlayerList players={players} />
                <Container
                    sx={{
                        bgcolor: '#F35B66',
                        minHeight: '92vh',
                        maxHeight: '92vh',
                        minWidth: '60vw',
                        maxWidth: '60vw',
                        flexGrow: 1,
                        justifyConent: "center",
                        alignItems: "center",
                        padding: '0 !important',
                    }}
                >
                    {renderGameContent()}
                </Container>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: '92vh',
                        maxHeight: '92vh',
                        minWidth: "15vw",
                        maxWidth: '15vw',
                        bgcolor: '#004D17',
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
