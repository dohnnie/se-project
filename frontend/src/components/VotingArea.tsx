import { Box, Typography, Container, Button } from '@mui/material';

const Prompts = ({ prompt }) => {
    return (
        <Box sx={{
            borderRadius: '10px',
            bgcolor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            my: '25px',
            minHeight: '10vh',
            minWidth: '50%',
        }}>
<<<<<<< HEAD
            <Button sx={{ 
                fontSize: '30px',
                p: '5px',
                color: 'black',
            }}>{prompt}</Button>
=======
            <Button sx={{ fontSize: '40px', color: 'black', minHeight: '100%', minWidth: '100%', borderRadius: '10px' }}>{prompt}</Button>
>>>>>>> e609475 (Added icons to player list)
        </Box>
    );
}

const VotingArea = ({ prompts }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            maxWidth: "60vw",
            my: '100px'
        }}>
            <Box sx={{
                borderRadius: '10px',
                bgcolor: 'gold',
                height: '50vh',
                maxWidth: '40%',
            }}>
                <img src="../../public/cat.webp"
                    alt="Image of a cat licking its cheek"
                    height='100%'
                    width='100%'
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
    );
}

export default VotingArea;
