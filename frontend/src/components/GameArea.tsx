import { Box, Typography, Container, FormControl, Input, Button } from '@mui/material';
import { useState } from 'react';
import LoadingArea from './loadingArea';

/*
 * Possible statuses are:
 * Start Game = 0
 * Loading = 1
 * isPrompting = 2
 * isGuessing = 3
 * isVoting = 4
 * Vote over = 5
 */

type Prompt = {
  prompt: string,
  player: string | null,
  promptId: string,
}



const GameArea = ({ socket, status }) => {
  const [prompt, setPrompt] = useState(() => '');

  const renderText = (testPlayer: string, testTime: number) => {
    switch (status) {
      case 1: 
        // Loading
        return(<></>);
      case 2:
        //Prompting
        return (
          <>
            <Typography sx={{ fontSize: '75px', m: '10px', }}>{testPlayer} is prompting</Typography>
            <Typography sx={{ fontSize: '75px', m: '10px', }}>{testTime}s remaining</Typography>
          </>
        );
      // Guessing
      case 3:
        return (
          <>
            <Typography sx={{ fontSize: '75px', m: '10px', }}>Players are guessing</Typography>
            <Typography sx={{ fontSize: '75px', m: '10px', }}>{testTime}s remaining</Typography>
          </>
        );
    }
  }
  const handlePromptSubmission = (e) => {
    e.preventDefault();
    const promptData: Prompt = {
      prompt: prompt,
      player: sessionStorage.getItem('name'),
      promptId: `${socket.id}${Math.random()}`,
    }
    socket.emit('submitPrompt', promptData);
    setPrompt('');
  };

  const testTime = 30;
  const testPlayer = 'John';

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      maxWidth: "60vw",
      maxHeight: '92vh',
      gap: '20px'
    }}>
      <Box sx={{
        display: 'flex',
        borderRadius: '20px',
        bgcolor: '#56A8F1',
        width: '95%',
      }}>
        {renderText(testPlayer, testTime)}
      </Box>
      <Box sx={{
        display: 'flex',
        my: '10px',
        maxHeight: '50vh',
        maxWidth: '50%',
      }}>
        {(status === 3) && (

          <img
            src="/cat.webp"
            alt="Image of a cat licking it's cheek"
            height='100%'
            width='100%'
            style={{
              border: '5px solid #F35B66',
              borderRadius: '40px',
            }}
          />
        )}
        {(status === 1) && (
          <LoadingArea></LoadingArea>
        )}
      </Box>
      <Box
        component='form'
      >
        {(status!==1)?
          <FormControl sx={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <Input
              type='text'
              placeholder='Write Prompt'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{
                width: '100%',
                height: '5vh',
                bgcolor: 'white',
                borderRadius: '5px',
                mr: '5px',
              }}
            />
            <Button
              onClick={handlePromptSubmission}
              variant='contained'
              sx={{
                width: '10%',
                height: '5vh',
                bgcolor: '#004D17',
                '&:hover': { bgcolor: '#56A8F1', color: 'black' },
                color: 'white',
              }}>
              SEND
            </Button>
          </FormControl>
        :
        <></>
        }
      </Box>
    </Box>
  );
}

export default GameArea;
