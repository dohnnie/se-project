// Option5_LoadingArea.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Adjusted keyframes: Bounce with opacity between 0 and 0.8.
const bounceUpDown = keyframes`
  0% {
    transform: translateY(60px);
    opacity: 1;
  }
  50% {
    transform: translateY(0);
    opacity: 5;
  }
  100% {
    transform: translateY(60px);
    opacity: 3;
  }
`;

// Main container remains fully opaque.
const LoaderContainer = styled(Box)({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Background layer with low opacity as a watermark.
const BackgroundImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: -250,
  width: '200%',
  height: '105%',
  backgroundImage: 'url(/picPrompt_simple_design.png)', // Ensure this file is in your public folder
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: 0.05,
  zIndex: 1,
});

// The animated letters now have a gradient background.
const GradientLetter = styled(Typography)(({ theme }) => ({
  fontSize: '120px',
  fontWeight: 'bold',
  fontFamily: '"Comic Sans MS", cursive, sans-serif',
  background: 'white', // Apply a gradient as the text fill.
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  // Remove the extra margin if you're using container gap instead:
  // margin: theme.spacing(1),
  animation: `${bounceUpDown} 2s ease-in-out infinite`,
  display: 'inline-block',
  zIndex: 2,
}));

// Updated LetterContainer using flex to evenly space the letters.
const LetterContainer = styled(Box)({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px', // Adjust this value to increase or decrease spacing between letters.
  whiteSpace: 'nowrap', // Ensures that the letters don’t wrap onto a new line.
});

const Option5_LoadingArea: React.FC = () => {
  const letters = 'LOADING'.split('');
  return (
    <LoaderContainer>
      <BackgroundImage />
      <LetterContainer>
        {letters.map((char, index) => (
          <GradientLetter key={index} sx={{ animationDelay: `${index * .1}s` }}>
            {char}
          </GradientLetter>
        ))}
      </LetterContainer>
    </LoaderContainer>
  );
};

export default Option5_LoadingArea;
