import React, { useState } from 'react';
import { Box, FormControl, Input, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lobbyPin, setLobbyPin] = useState('');

  const handleCreateLobby = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/game');
  };

  const handleJoinLobby = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/game');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(/picPrompt_advanced.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient overlay with blur */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(3px)',
          zIndex: 1,
        }}
      />
      {/* Group all content in a Box and push it lower */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // Push the grouped content lower on the screen:
          mt: '0vh', // Adjust this value as needed (50% of viewport height)
          transform: 'translateY(240%)', // This centers it vertically relative to the pushed position
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: '50px',
            WebkitTextStroke: '0px #39afa7',
            color: 'white',
            mb: 1,
            textShadow: '1px 1px 6px rgba(0,0,0,0.7)',
          }}
        >
          Welcome to PicPrompt!
        </Typography>
        <FormControl sx={{ mb: 2, width: '300px' }}>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              color: '#2d3748',
              bgcolor: 'white',
              borderRadius: 1,
              fontSize: '1.25rem',
              px: 1,
              py: 0.5,
            }}
          />
        </FormControl>
        <FormControl sx={{ mb: 2, width: '300px' }}>
          <Input
            type="text"
            placeholder="Enter lobby ID (optional)"
            value={lobbyPin}
            onChange={(e) => setLobbyPin(e.target.value)}
            sx={{
              color: '#2d3748',
              bgcolor: 'white',
              borderRadius: 1,
              fontSize: '1.25rem',
              px: 1,
              py: 0.5,
            }}
          />
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleCreateLobby}
            sx={{ bgcolor: '#37b2ab', '&:hover': { bgcolor: '#56A8F1' } }}
          >
            Create Lobby
          </Button>
          <Button
            variant="contained"
            onClick={handleJoinLobby}
            sx={{ bgcolor: '#37b2ab', '&:hover': { bgcolor: '#56A8F1' } }}
          >
            Join Lobby
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LobbyPage;