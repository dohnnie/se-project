import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material';

const PlayerCard = ({ player }) => {

    const name = player.name;
    const points = player.points;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'start',
            bgcolor: 'white',
            my: '5px',
            p: '5px',
            maxHeight: '25vh',
            maxWidth: "100vw",
            minWidth: '100vw',
        }}>
            <PersonIcon sx={{
                fontSize: '35px',
                my: '20px',
                mx: '5px',
            }} />
            <Box sx={{
                my: '10px',
                ml: '5px',
                width: '14%',
                pl: '10px'
            }}>
                <Typography component='h1'
                    sx={{

                        fontSize: '40px',
                    }}
                >
                    {name}
                </Typography>
            </Box>
            <BorderColorIcon sx={{
                fontSize: '35px',
                my: '20px',
                mx: '5px',
            }} />
            <StarIcon sx={{
                fontSize: '35px',
                my: '20px',
                mx: '5px',
            }} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'end',
                alignContent: 'end',
                bgcolor: 'white',
                minWidth: '2%',
                maxWidth: '3%',
            }}>
                <Typography component='h1'
                    sx={{
                        fontSize: '37px',
                        my: '10px',
                    }}
                >
                    {points}
                </Typography>
            </Box>
        </Box>
    );
}

export default PlayerCard;
