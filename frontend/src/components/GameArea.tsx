// frontend/src/components/GameArea.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, FormControl, Input, Button } from '@mui/material';
import LoadingArea from './loadingarea';
import { useImageGeneration } from '../hooks/useImageGeneration';

interface GameAreaProps {
  socket: any;
  status?: number; // e.g., 1: loading, 2: prompting, 3: guessing, etc.
  setImageUrl?: (url: string | null) => void; // For lifting generated image URL to parent (GamePage)
  currentPrompter?: string; // The name of the person currently prompting
}

const GameArea: React.FC<GameAreaProps> = ({ socket, status, setImageUrl, currentPrompter }) => {
  const [prompt, setPrompt] = useState<string>('');
  const { imageUrl, statusMessage, generateImage } = useImageGeneration();
  const [timeRemaining, setTimeRemaining] = useState<number>(30);

  // --- Retrieve stored image URL from localStorage on mount ---
  useEffect(() => {
    const storedUrl = localStorage.getItem('latestImageUrl');
    if (storedUrl && setImageUrl) {
      setImageUrl(storedUrl);
    }
  }, [setImageUrl]);

  // --- Store the image URL to localStorage whenever it changes ---
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('latestImageUrl', imageUrl);
    }
  }, [imageUrl]);

  // --- Countdown Timer (used during prompting or guessing) ---
  useEffect(() => {
    if (status === 2 || status === 3) {
      setTimeRemaining(30);
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  // --- Lift generated image URL to parent (in case you need it in GamePage) ---
  useEffect(() => {
    if (setImageUrl && imageUrl) {
      console.log('[GameArea] Lifting image URL to parent:', imageUrl);
      setImageUrl(imageUrl);
    }
  }, [imageUrl, setImageUrl]);

  // --- Handle Prompt Submission ---
  const handlePromptSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    const promptData = {
      prompt,
      player: sessionStorage.getItem('name'),
      promptId: `${socket.id}${Math.random()}`,
    };
    // Emit prompt if socket.emit is available
    if (socket && typeof socket.emit === 'function') {
      socket.emit('submitPrompt', promptData);
    }
    // Generate image based on the prompt
    await generateImage(prompt);
    setPrompt('');
  };

  // --- Render Header based on status ---
  const renderHeader = () => {
    if (status === 2) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            p: 0,
            mx: 'auto',
            mt: '-20px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.15rem',
            }}
          >
            {currentPrompter ? `${currentPrompter} is prompting` : 'Prompting...'}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              '@keyframes combined': {
                '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                '50%': { transform: timeRemaining > 5 ? 'scale(1.2) rotate(2deg)' : 'scale(1.5) rotate(2deg)' },
              },
              fontWeight: 'bold',
              letterSpacing: '0.25rem',
              color: timeRemaining > 10 ? 'green' : timeRemaining > 5 ? '#f0c330' : '#ff0000',
              textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
              transform: 'scale(1) rotate(0deg)',
              ...(timeRemaining <= 10 && {
                animation: 'combined 1s ease-in-out infinite',
                '@keyframes combined': {
                  '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                  '50%': {
                    transform: timeRemaining > 5 ? 'scale(1.2) rotate(2deg)' : 'scale(1.5) rotate(2deg)',
                  },
                },
              }),
            }}
          >
            {timeRemaining}s
          </Typography>
        </Box>
      );
    } else if (status === 3) {
      // For guessing (status === 3), we want a similar layout:
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            p: 1,
            mx: 'auto'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.15rem',
            }}
          >
            Guess the prompt
          </Typography>
          <Typography
            variant="h2"
            sx={{
              '@keyframes combined': {
                '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                '50%': { transform: timeRemaining > 5 ? 'scale(1.2) rotate(2deg)' : 'scale(1.5) rotate(2deg)' },
              },
              fontWeight: 'bold',
              letterSpacing: '0.25rem',
              color: timeRemaining > 10 ? 'green' : timeRemaining > 5 ? '#f0c330' : '#ff0000',
              textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
              transform: 'scale(1) rotate(0deg)',
              ...(timeRemaining <= 10 && {
                animation: 'combined 1s ease-in-out infinite',
                '@keyframes combined': {
                  '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                  '50%': {
                    transform: timeRemaining > 5 ? 'scale(1.2) rotate(2deg)' : 'scale(1.5) rotate(2deg)',
                  },
                },
              }),
            }}
          >
            {timeRemaining}s
          </Typography>
        </Box>
      );
    } else {
      return <Typography sx={{ fontSize: '75px', textAlign: 'center' }}>Game in progress...</Typography>;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '30px',
        maxWidth: '60vw',
        maxHeight: '92vh',
        gap: '20px',
      }}
    >
      <Box sx={{ width: '95%', p: '10px' }}>
        {renderHeader()}
      </Box>

      {status === 2 && (
        <LinearProgress
          variant="determinate"
          value={(timeRemaining / 30) * 100}
          sx={{
            height: '15px',
            borderRadius: '5px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: timeRemaining > 10 ? 'green' : timeRemaining > 5 ? '#f0c330' : '#ff0000',
            },
            width: '100%',
            mb: 2,
            mx: 'auto'
          }}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          my: '10px',
          maxHeight: '50vh',
          maxWidth: '50%',
        }}
      >
        {status === 1 ? (
          <LoadingArea />
        ) : (
          <img
            src={imageUrl ? imageUrl : '/cat.webp'}
            alt={imageUrl ? 'Generated image' : 'Placeholder image'}
            height="100%"
            width="100%"
            style={{ border: '5px solid #37b2ab', borderRadius: '40px' }}
          />
        )}
      </Box>

      {/* Conditional prompt input form based on status (2 for prompting, 3 for guessing) */}
      <Box component="form" onSubmit={handlePromptSubmission}>
        {status === 2 ? (
          <Box sx={{ mt: 12, width: '80%', mx: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                textAlign: 'center',
                mb: 2,
                fontStyle: 'italic',
                fontSize: '1.5rem',
              }}
            >
              Enter your prompt below to generate an image. Your creative input starts the game!
            </Typography>
            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Input
                type="text"
                placeholder="Write Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{
                  width: '100%',
                  height: '5vh',
                  bgcolor: 'white',
                  borderRadius: '5px',
                  mr: '40px',
                }}
                inputProps={{ style: { textAlign: 'center' } }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '10%',
                  height: '5vh',
                  bgcolor: '#1a202b',
                  '&:hover': { bgcolor: '#56A8F1', color: 'black' },
                  color: 'white',
                }}
              >
                SEND
              </Button>
            </FormControl>
          </Box>
        ) : status === 3 ? (
          <Box sx={{ mt: 12, width: '80%', mx: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                textAlign: 'center',
                mb: 2,
                fontStyle: 'italic',
                fontSize: '1.5rem',
              }}
            >
              What creative prompt do you think inspired this image?
            </Typography>
            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Input
                type="text"
                placeholder="Guess the Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                sx={{
                  width: '100%',
                  height: '5vh',
                  bgcolor: 'white',
                  borderRadius: '5px',
                  mr: '40px',
                }}
                inputProps={{ style: { textAlign: 'center' } }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '10%',
                  height: '5vh',
                  bgcolor: '#1a202b',
                  '&:hover': { bgcolor: '#56A8F1', color: 'black' },
                  color: 'white',
                }}
              >
                SEND
              </Button>
            </FormControl>
          </Box>
        ) : null}
      </Box>

      {statusMessage && <Typography variant="h6">{statusMessage}</Typography>}
    </Box>
  );
};

export default GameArea;
