// Option2_LoadingArea.tsx
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const LoaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
  width: '100%',
  backgroundColor: '',
});

const Letter = styled(Box)(({ theme }) => ({
  fontSize: '100px',
  fontWeight: 'bold',
  color: '#37b2ab',
  margin: theme.spacing(1),
  animation: `${slideIn} 3s ease-in-out infinite`,
  display: 'inline-block',
}));

const LoadingArea = () => {
  const letters = 'LOADING'.split('');
  return (
    <LoaderContainer>
      {letters.map((char, i) => (
        <Letter key={i} sx={{ animationDelay: `${i * 0.1}s` }}>
          {char}
        </Letter>
      ))}
    </LoaderContainer>
  );
};

export default LoadingArea;
