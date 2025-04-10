import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Box, FormControl, Input, Button, Typography } from '@mui/material';

const LobbyPage = ({ isConnected, socket }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(() => '')
  const [lobbyId, setLobbyId] = useState('');


  const handleCreateLobby = (e) => {
    e.preventDefault();
    console.log('Create button clicked!');
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('playerId', socket.id);
    socket.emit('create', { name: name, id: socket.id });
    navigate('/game');
  };

  const handleJoinLobby = (e) => {
    e.preventDefault();
    console.log('Join button clicked!');
    console.log(`Name: ${name}`);
    navigate('/game');
  };


  return (
    <Box sx={{
      justifySelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#4D0036',
      color: 'white',
      minHeight: '100vh',
      minWidth: '100vw',
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
              color: '#56A8F1',
              bgcolor: 'white',
              minHeight: '5vh',
              minWidth: '20%',
              fontSize: '30px',
              mb: '10px',
              pl: '5px',
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
              color: '#56A8F1',
              bgcolor: 'white',
              minHeight: '5vh',
              minWidth: '20%',
              fontSize: '30px',
              pl: '5px',
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
          bgcolor: '#004D17',
          '&:hover': { bgcolor: '#56A8F1' },
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
            bgcolor: '#004D17',
            '&:hover': { bgcolor: '#56A8F1' },
          }}
          variant='contained'
          onClick={handleJoinLobby}
        >
          Join Lobby
        </Button>
      </Box>
    </Box>
  );
}

export default LobbyPage;
