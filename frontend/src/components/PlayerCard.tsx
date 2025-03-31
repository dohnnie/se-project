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
            bgcolor: 'white',
            my: '5px',
            p: '5px',
            maxHeight: '25vh',
            maxWidth: '25vw',
            minWidth: '25vw',
        }}>
            <Box sx={{
                float: 'left',
                display: 'flex',
                width: '45%',
            }}>
                <PersonIcon sx={{
                    fontSize: '35px',
                    my: '20px',
                    mx: '5px',
                }} />
                <Typography component='h1'
                    sx={{
                        my: '10px',
                        ml: '5px',
                        width: '14%',
                        pl: '10px',
                        fontSize: '40px',
                    }}
                >
                    {name}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '50%',
                    float: 'right',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    alignItems: 'end',
                }}
            >
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
