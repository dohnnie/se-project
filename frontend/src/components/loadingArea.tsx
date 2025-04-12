import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// adjust this to speed up/slow down the animation (seconds)
const animationDuration = 4;

const bounceUpDown = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
`;

const LoaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
  height: '100%',
  width: '100%',
  backgroundColor: '#4D0036',
});

const Letter = styled(Box)(({ theme }) => ({
  fontSize: '64px',
  fontWeight: 'bold',
  color: '#56A8F1',
  margin: theme.spacing(1),
  animation: `${bounceUpDown} ${animationDuration}s ease-in-out infinite`,
  display: 'inline-block',
}));

const loadingArea = () => {

    // adjust this to change the word that is animated
    const letters = 'LOADING'.split('');

    return (
      <LoaderContainer>
        {letters.map((char, i) => (
          <Letter
            key={i}
            sx={{ animationDelay: `${i * 0.15}s` }}
          >
            {char}
          </Letter>
        ))}
      </LoaderContainer>
    );
}

export default loadingArea;

