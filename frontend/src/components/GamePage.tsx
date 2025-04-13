// frontend/src/components/GamePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';
import PlayerList from './PlayerList';
import Chat from './Chat';
import GameArea from './GameArea';
import VotingArea from './VotingArea';
import WaitingArea from './WaitingArea';
import WinningVoteArea from './WinningVoteArea';

const GamePage = ({ socket, status, playerList, messages, prompts }) => {
  const navigate = useNavigate();
  const [sharedImageUrl, setSharedImageUrl] = useState<string | null>(null);

  const handleLobby = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/');
  };

  const renderGameContent = () => {
    switch (status) {
      case 0:
        return <WaitingArea socket={socket} />;
      case 4:
        return <VotingArea socket={socket} prompts={prompts.current} sharedImageUrl={sharedImageUrl} />;
      case 5:
        return <WinningVoteArea winningPrompt={"cat"} winnerName={"Johnathan"} />;
      default:
        return <GameArea socket={socket} status={status} setImageUrl={setSharedImageUrl} />;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#4D0036',
        maxHeight: '100vh',
        maxWidth: '100vw',
        display: "flex",
        flexDirection: "column"
      }}>
      <Box
        sx={{
          bgcolor: '#F35B66',
          minHeight: '8vh',
          maxHeight: '10vh',
          minWidth: '100vw',
          display: 'flex',
          flexDirection: 'row',
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component='h1' sx={{ fontSize: '70px', padding: '5px', ml: '15px' }}>Picprompt</Typography>
        <Typography>Player Count: {playerList.length}</Typography>
        <Button
          sx={{
            size: 'small',
            minHeight: '5vh',
            display: 'flex',
            bgcolor: '#004D17',
            '&:hover': { bgcolor: '#56A8F1', color: 'black' },
            mr: '15px',
          }}
          variant='contained'
          onClick={handleLobby}
        >
          Leave Game
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", minHeight: '92vh', maxHeight: '92vh', minWidth: '100vw', maxWidth: '100vw' }}>
        <PlayerList players={playerList} />
        <Container
          sx={{
            bgcolor: '#4D0036',
            minHeight: '92vh',
            maxHeight: '92vh',
            minWidth: '60vw',
            maxWidth: '60vw',
            flexGrow: 1,
          }}
        >
          {renderGameContent()}
        </Container>
        <Chat socket={socket} messages={messages} />
      </Box>
    </Box>
  );
};

export default GamePage;
