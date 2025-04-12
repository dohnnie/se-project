import { Box, Typography, Container, Button } from '@mui/material';

const Prompts = ({ prompt }) => {
  return (
    <Button
      variant='contained'
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
        bgcolor: '#F35B66',
        my: '15px',
      }}>
      {prompt}
    </Button>
  );
}

const VotingArea = ({ prompts }) => {
  return (
    <>
      <Typography
        sx={{
          bgcolor: '#56A8F1',
          color: 'black',
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
          fontSize: '70px',
          borderRadius: '10px',
          m: '20px',
        }}
      >
        Vote for the best prompt!
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        maxWidth: "60vw",
        mt: '50px',
        mb: '100px'
      }}>
        <Box sx={{
          borderRadius: '10px',
          height: '50vh',
          maxWidth: '50%',
          mr: 10,
        }}>
          <img src="/cat.webp"
            alt="Image of a cat licking its cheek"
            height='100%'
            width='100%'
            style={{
              border: '5px solid #F35B66',
              borderRadius: '40px',
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '60%',
          minHeight: '50vh',
        }}>
          <Container>
            {
              prompts.map(currentPrompt => <Prompts prompt={currentPrompt} />)
            }
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default VotingArea;
