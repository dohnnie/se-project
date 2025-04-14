import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography, Tooltip } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

const PlayerCard = ({ player }) => {
  const [points, setPoints] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) {
      setIsOverflowing(nameRef.current.scrollWidth > nameRef.current.clientWidth);
    }
  }, [player.name]);

  return (
    <Box
      sx={{
        m: 1,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #2b6cb0 50%, #37b2ab 100%)', 
        color: 'white',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
        minWidth: '18vw',
        maxWidth: '22vw',
      }}
    >
      {/* Top Row: Icon and Player Name */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            bgcolor: '#1a202c',  // darker for contrast against bright teal
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PersonIcon sx={{ fontSize: 35, color: 'white' }} />
        </Box>
        <Tooltip title={player.name} disableHoverListener={!isOverflowing}>
          <Typography
            variant="h6"
            ref={nameRef}
            sx={{
              flexGrow: 1,
              maxWidth: '8ch',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
            }}
          >
            {player.name}
          </Typography>
        </Tooltip>
      </Box>

      {/* Bottom Row: Icons for edit/score and the Points */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          mt: 1,
        }}
      >
        <BorderColorIcon sx={{ fontSize: 24, color: 'white' }} />
        <StarIcon sx={{ fontSize: 28, color: 'white' }} />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            color: '#fffff',
          }}
        >
          {points}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlayerCard;
