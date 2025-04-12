import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Divider } from '@mui/material';
import PlayerList from './PlayerList';
import Chat from './Chat';
import GameArea from './GameArea';
import VotingArea from './VotingArea';
import WaitingArea from './WaitingArea';
import WinningVoteArea from './WinningVoteArea';

const GamePage = ({ socket, status = 4, playerList, messages }) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(() => []);


  const testPlayers = [
    { name: 'Johnathan', points: 10 },
    { name: 'Jesus', points: 25 },
    { name: 'Tom', points: 4 },
    { name: 'Gabriella', points: 100 },
    { name: 'Ryan', points: 44 },
  ];
  const testAnswers = [
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
        return <VotingArea prompts={testAnswers} />;
      case 5:
        return <WinningVoteArea winningPrompt={testAnswers[0]} winnerName={testPlayers[0].name} />;
      default:
        return <GameArea socket={socket} status={status} />;
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
        <Typography component='h1'
          sx={{
            fontSize: '70px',
            padding: '5px',
            ml: '15px',
          }}
        >
          Picprompt
        </Typography>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: '92vh',
          maxHeight: '92vh',
          minWidth: '100vw',
          maxWidth: '100vw',
        }}>
        <PlayerList players={playerList} />
        <Container
          sx={{
            bgcolor: '#4D0036',
            minHeight: '92vh',
            maxHeight: '92vh',
            minWidth: '60vw',
            maxWidth: '60vw',
            flexGrow: 1,
            justifyConent: "center",
            alignItems: "center",
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
