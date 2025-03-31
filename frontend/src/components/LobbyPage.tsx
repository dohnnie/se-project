import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Box, FormControl, Input, Button, Typography } from '@mui/material';

const LobbyPage = ({ socket }) => {
    const navigate = useNavigate();
    const [name, setName] = useState(() => '')
    const [lobbyId, setLobbyId] = useState(() => '')


    const handleCreateLobby = (e) => {
        e.preventDefault();
        console.log('Create button clicked!');
        console.log(`Name: ${name}`);
        socket.emit('create', { name: name, id: socket.id });
        navigate('/game');
    };

    const handleJoinLobby = (e) => {
        e.preventDefault();
        console.log('Join button clicked!');
        console.log(`Name: ${name}`);
        console.log(`Join Code: ${lobbyId}`);
        navigate('/game');
    };


    return (
        <Container sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography component='h1'
                sx={{
                    fontSize: '200px',
                }}
            >
                PicPrompt
            </Typography>
            <Box component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    my: '5px',
                }}>
                <FormControl>
                    <Input
                        type="text"
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            minHeight: '5vh',
                            minWidth: '20%',
                            fontSize: '30px',
                            mb: '10px',
                        }}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type='text'
                        name='lobbyid'
                        placeholder='Enter lobby ID'
                        value={lobbyId}
                        onChange={(e) => setLobbyId(e.target.value)}
                        sx={{
                            minHeight: '5vh',
                            minWidth: '20%',
                            fontSize: '30px'
                        }}
                    />
                </FormControl>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '20px',
                minWidth: '35%'
            }}>
                <Button sx={{
                    height: '5vh',
                    mb: '10px',
                    minWidth: '100%',
                }}
                    variant='contained'
                    onClick={handleCreateLobby}
                >
                    Create Lobby
                </Button>
                <Button
                    sx={{
                        height: '5vh',
                        minWidth: '100%',
                    }}
                    variant='contained'
                    onClick={handleJoinLobby}
                >
                    Join Lobby
                </Button>
            </Box>
        </Container>
    );
}

export default LobbyPage;
