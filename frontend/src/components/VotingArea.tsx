// Option 2: Dark Minimalist (VotingArea.tsx)
import { Box, Typography, Container, Button } from '@mui/material';

interface VotingAreaProps {
  prompts: string[];
  sharedImageUrl?: string | null;
}

const Prompts = ({ prompt }: { prompt: string }) => {
  return (
    <Button
  variant="contained"
  sx={{
    borderRadius: '10px',
    minHeight: '20%',
    minWidth: '100%',
    maxHeight: '25%',
    maxWidth: '100%',
    fontSize: '25px',
    p: '5px',
    color: 'white',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #2b6cb0, #37b2ab)',
    my: '15px',
    backgroundSize: '200%',
    animation: 'gradientShift 3s ease infinite',
    '@keyframes gradientShift': {
      '0%': { backgroundPosition: '0%' },
      '50%': { backgroundPosition: '100%' },
      '100%': { backgroundPosition: '0%' },
    },
  }}
>
  {prompt}
</Button>

  );
};

const VotingArea: React.FC<VotingAreaProps> = ({ prompts, sharedImageUrl }): JSX.Element => {
  return (
    <>
      <Typography
  component="h1"
  sx={{
    fontSize: '70px',
    fontWeight: 'bold',
    textAlign: 'center',
    m: '40px',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    color: 'white',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
  }}
>
  Vote for the best prompt!
</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          maxWidth: '60vw',
          mt: '50px',
          mb: '100px',
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            height: '50vh',
            maxWidth: '50%',
            mr: 2,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
          }}
        >
          <img
            src={sharedImageUrl ? sharedImageUrl : '/cat.webp'}
            alt={sharedImageUrl ? 'Generated image' : "Placeholder"}
            style={{ width: '100%', height: '100%', borderRadius: '10px', border: '2px solid #2d3748' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '60%',
            minHeight: '50vh',
            justifyContent: 'center',
          }}
        >
          <Container>
            {prompts.map((currentPrompt, index) => (
              <Prompts prompt={currentPrompt} key={index} />
            ))}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default VotingArea;
