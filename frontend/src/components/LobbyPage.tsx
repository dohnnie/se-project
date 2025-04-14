// frontend/src/components/LobbyPage.tsx
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Box, FormControl, Input, Button, Typography } from '@mui/material';

interface LobbyPageProps {
  isConnected: boolean;
  socket: any;
}

const LobbyPage: React.FC<LobbyPageProps> = ({ isConnected, socket }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lobbyPin, setLobbyPin] = useState(''); // new state for lobby PIN

  const handleCreateLobby = (e: React.FormEvent) => {
    e.preventDefault();
    // Save player's name and socket id locally
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('playerId', socket.id);
    // Send createLobby event with name and desired lobby PIN
    socket.emit('createLobby', { name, lobbyPin });
    // Navigate to game page (you may want to pass the lobbyPin via context or state)
    navigate('/game');
  };

  const handleJoinLobby = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('playerId', socket.id);
    // Send joinLobby event
    socket.emit('joinLobby', { name, lobbyPin });
    navigate('/game');
  };



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        // A modern gradient background:
        background: 'linear-gradient(135deg, #1a202c 65%, #2b6cb0 100%);'
      }}>
      <Typography
          component="h1"
          sx={{
            fontSize: '100px',
            fontWeight: 'bold',
            position: 'relative',
            p: '5px',
            ml: '15px',
            color: 'white', // fallback color
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
            letterSpacing: 2,              // Additional letter spacing
            mb: 4                          // Margin bottom for extra spacing
          }}
        >
          Picprompt
        </Typography>


      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: '80%', sm: '40%', md: '30%' }
        }}
      >
        <FormControl>
          <Input
            type="text"
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              color: '#2d3748',
              bgcolor: 'white',
              borderRadius: 1,
              fontSize: '1.25rem',
              px: 1,
              py: 0.5
            }}
          />
        </FormControl>
        <FormControl>
          <Input
            type='text'
            name='lobbyPin'
            placeholder='Enter lobby PIN (optional)'
            value={lobbyPin}
            onChange={(e) => setLobbyPin(e.target.value)}
            sx={{
              color: '#2d3748',
              bgcolor: 'white',
              borderRadius: 1,
              fontSize: '1.25rem',
              px: 1,
              py: 0.5
            }}
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
          width: { xs: '80%', sm: '40%', md: '30%' }
        }}
      >
        <Button
          variant='contained'
          onClick={handleCreateLobby}
          sx={{
            height: '3rem',
            bgcolor: '#3182ce',
            '&:hover': { bgcolor: '#2b6cb0' }
          }}
        >
          Create Lobby
        </Button>
        <Button
          variant='contained'
          onClick={handleJoinLobby}
          sx={{
            height: '3rem',
            bgcolor: '#38b2ac',
            '&:hover': { bgcolor: '#319795' }
          }}
        >
          Join Lobby
        </Button>
      </Box>
    </Box>
  );
};

export default LobbyPage;

  /////// using images as background
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         minHeight: '100vh',
//         width: '100vw',
//         // Use your advanced logo as the background image (in public folder)
//         backgroundImage: 'url(/picPrompt_advanced.webp)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       {/* Dark overlay for readability */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           bgcolor: 'rgba(0, 0, 0, 0.4)',
//           zIndex: 1,
//         }}
//       />
//       {/* Content on top of the background */}
//       <Box
//         sx={{
//           position: 'relative',
//           zIndex: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           minHeight: '100vh',
//           px: 2,
//         }}
//       >
//         <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
//           Welcome to PicPrompt!
//         </Typography>
//         <FormControl sx={{ mb: 2, width: '300px' }}>
//           <Input
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             sx={{
//               color: '#2d3748',
//               bgcolor: 'white',
//               borderRadius: 1,
//               fontSize: '1.25rem',
//               px: 1,
//               py: 0.5,
//             }}
//           />
//         </FormControl>
//         <FormControl sx={{ mb: 4, width: '300px' }}>
//           <Input
//             type="text"
//             placeholder="Enter lobby ID (optional)"
//             value={lobbyPin}
//             onChange={(e) => setLobbyPin(e.target.value)}
//             sx={{
//               color: '#2d3748',
//               bgcolor: 'white',
//               borderRadius: 1,
//               fontSize: '1.25rem',
//               px: 1,
//               py: 0.5,
//             }}
//           />
//         </FormControl>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={handleCreateLobby}
//             sx={{ bgcolor: '', '&:hover': { bgcolor: '#56A8F1' } }}
//           >
//             Create Lobby
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleJoinLobby}
//             sx={{ bgcolor: '#37b2ab', '&:hover': { bgcolor: '#56A8F1' } }}
//           >
//             Join Lobby
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LobbyPage;