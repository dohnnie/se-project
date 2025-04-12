// frontend/src/components/GameArea.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, FormControl, Input, Button } from '@mui/material';
import { useImageGeneration } from '../hooks/useImageGeneration';

interface GameAreaProps {
  socket: any;
  status?: number;
  setImageUrl?: (url: string) => void;
}

const GameArea: React.FC<GameAreaProps> = ({ socket, status = 2, setImageUrl }): JSX.Element => {
  const [prompt, setPrompt] = useState('');
  const { imageUrl, statusMessage, generateImage } = useImageGeneration();

  // Lift the generated image URL to the parent when available
  useEffect(() => {
    if (setImageUrl && imageUrl) {
      console.log('[GameArea] Lifting image URL to parent:', imageUrl);
      setImageUrl(imageUrl);
    }
  }, [imageUrl, setImageUrl]);
  

  const handlePromptSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    // Emit prompt event over socket if needed
    const promptData = {
      prompt,
      player: sessionStorage.getItem('name'),
      promptId: `${socket.id}${Math.random()}`
    };
    socket.emit('submitPrompt', promptData);

    // Call the custom hook's function to generate the image
    await generateImage(prompt);
    setPrompt('');
  };

  const renderText = (testPlayer: string, testTime: number) => {
    if (status === 2) {
      return (
        <>
          <Typography sx={{ fontSize: '75px', mx: '5px' }}>{testPlayer} is prompting</Typography>
          <Typography sx={{ fontSize: '75px', mx: '10px' }}>{testTime}s remaining</Typography>
        </>
      );
    } else if (status === 3) {
      return (
        <>
          <Typography sx={{ fontSize: '75px' }}>Players are guessing</Typography>
          <Typography sx={{ fontSize: '75px', mx: '10px' }}>{testTime}s remaining</Typography>
        </>
      );
    }
    return <Typography sx={{ fontSize: '75px' }}>Game in progress...</Typography>;
  };

  const testTime = 30;
  const testPlayer = 'John';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '30px', maxWidth: '60vw', maxHeight: '92vh', gap: '20px' }}>
      <Box sx={{ display: 'flex', borderRadius: '20px', bgcolor: '#56A8F1', width: '95%', p: '10px' }}>
        {renderText(testPlayer, testTime)}
      </Box>
      <Box sx={{ display: 'flex', my: '10px', maxHeight: '50vh', maxWidth: '50%' }}>
        <img
          src={imageUrl ? imageUrl : '/cat.webp'}
          alt={imageUrl ? 'Generated image' : 'Placeholder image'}
          height="100%"
          width="100%"
          style={{ border: '5px solid #F35B66', borderRadius: '40px' }}
        />
      </Box>
      <Box component="form" onSubmit={handlePromptSubmission}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
          <Input
            type="text"
            placeholder="Write Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ width: '100%', height: '5vh', bgcolor: 'white', borderRadius: '5px', mr: '5px' }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '10%', height: '5vh', bgcolor: '#004D17', '&:hover': { bgcolor: '#56A8F1', color: 'black' }, color: 'white' }}
          >
            SEND
          </Button>
        </FormControl>
      </Box>
      {statusMessage && <Typography variant="h6">{statusMessage}</Typography>}
    </Box>
  );
};

export default GameArea;
