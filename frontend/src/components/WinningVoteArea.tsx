import React from 'react';
import { Box, Typography } from '@mui/material';


const WinningVoteArea = ({ winningPrompt, winnerName }) => {

  return (
    <Box
      sx={{
        bgcolor: '#4D0036',
        maxheight: '92vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: 2,
          color: '#F35B66',
        }}>
        Winning Prompt!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '15px',
          bgcolor: '#004D17',
          py: '15px',
          height: 'auto',
        }}
      >
        <img
          src="/cat.webp"
          alt="Rounds Prompted Picture"
          style={{
            maxWidth: '80%',
            borderRadius: '40px',
            border: '5px solid gold',
          }}
        />
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            color: 'white',
          }}>
          "{winningPrompt}"
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mt: 1,
            color: '#56A8F1',
          }}>
          - {winnerName}
        </Typography>
      </Box>
    </Box>
  );
};

export default WinningVoteArea;
