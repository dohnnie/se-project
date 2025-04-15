// frontend/src/components/GamePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';
import PlayerList from './PlayerList';
import Chat from './Chat';
import GameArea from './GameArea';
import VotingArea from './VotingArea';
import WaitingArea from './WaitingArea';
import WinningVoteArea from './WinningVoteArea';

interface GamePageProps {
  socket: any;
  status?: number;
  playerList: any[];
  messages: any[];
}

const GamePage: React.FC<GamePageProps> = ({ socket, status = 4, playerList, messages }) => {
  const navigate = useNavigate();
  
  // Use local state that we can update based on events.
  const [sharedImageUrl, setSharedImageUrl] = useState<string | null>(null);
  const [prompter, setPrompter] = useState('');
  const [gameStatus, setGameStatus] = useState<number>(status);
  
  // Handle leaving the lobby.
  const handleLobby = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  // Listen for player list updates (for example, from the server).
  useEffect(() => {
    const updateListHandler = (players: any[]) => {
      // Optionally update active players here if needed.
      // Then update game status based on the number of players.
      if (players.length >= 3) {
        setGameStatus(2); // At least 3 players: move to prompting
      } else {
        setGameStatus(1); // Fewer than 3: keep in waiting/loading state
      }
    };

    socket.on('updateList', updateListHandler);

    return () => {
      socket.off('updateList', updateListHandler);
    };
  }, [socket]);

  // Listen for the game initialization event.
  useEffect(() => {
    const handleInitGame = (initData: any) => {
      console.log('Game started with:', initData);
      setGameStatus(initData.status);
      setPrompter(initData.prompter);
      // Optionally set the timer state here if needed.
    };

    socket.on('gameStart', handleInitGame);

    return () => {
      socket.off('gameStart', handleInitGame);
    };
  }, [socket]);

  // (Optional) Listen for voteSubmitted events.
  // (Make sure that the variable 'prompts' exists in scope if you’re using this.)
  // socket.on('voteSubmitted', (voteData: any) => {
  //   const promptKey = voteData.prompt;
  //   // This part may be handled elsewhere in your app.
  // });

  // Render game content based on the local gameStatus.
  const renderGameContent = (): JSX.Element => {
    switch (gameStatus) {
      case 0:
        return <WaitingArea />;
      case 4:
        return (
          <VotingArea
            prompts={["cat", "dog", "animal", "default prompt"]}
            sharedImageUrl={sharedImageUrl}
          />
        );
      case 5:
        return <WinningVoteArea winningPrompt={"cat"} winnerName={"Johnathan"} />;
      default:
        // Pass the setImageUrl function (not the URL) to GameArea.
        return (
          <GameArea
            socket={socket}
            status={gameStatus}
            setImageUrl={setSharedImageUrl}
            currentPrompter={prompter}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a202c 65%, #2b6cb0 90%)',
        maxHeight: '100vh',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a202c 45%, #2b6cb0 90%)',
          minHeight: '8vh',
          maxHeight: '10vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: '100px',
              fontWeight: 'bold',
              position: 'absolute',
              top: -50,
              right: 1200,
              padding: '10px',
              color: 'white',
              background: 'linear-gradient(90deg, white, #56A8F1, #37b2ab, white)',
              backgroundSize: '200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              
              animation: 'gradientShift 3s ease infinite',
              '@keyframes gradientShift': {
                '0%': { backgroundPosition: '0%' },
                '50%': { backgroundPosition: '100%' },
                '100%': { backgroundPosition: '0%' },
              },
            }}
          >
            Picprompt
          </Typography>
        </Box>

        <Button
          sx={{
            size: 'small',
            minHeight: '5vh',
            display: 'flex',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            bgcolor: '#37b2ab',
            '&:hover': { bgcolor: 'white', color: '#37b2ab' },
            mr: '50px'
          }}
          variant="contained"
          onClick={handleLobby}
        >
          Leave Game
        </Button>
      </Box>

      {/* Main Content Area: Three Columns */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: '92vh',
          width: '100vw'
        }}
      >
        {/* Left Sidebar: Player List */}
        <Box sx={{ flexBasis: '20%', p: 2 }}>
          <PlayerList players={playerList} />
        </Box>
        {/* Center Area: Dynamic Game Content */}
        <Container
          sx={{
            background: 'linear-gradient(135deg, #1a202c 65%, #2b6cb0 100%)',
            minHeight: '92vh',
            flexBasis: '60%',
            flexGrow: 1,
            p: 2
          }}
        >
          {renderGameContent()}
        </Container>
        {/* Right Sidebar: Chat */}
        <Box sx={{ flexBasis: '20%', p: 2 }}>
          <Chat socket={socket} messages={messages} />
        </Box>
      </Box>
    </Box>
  );
};

export default GamePage;
