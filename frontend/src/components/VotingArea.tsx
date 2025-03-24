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
            <Button sx={{ fontSize: '40px', p: '5px', color: 'black' }}>{prompt}</Button>
        </Box>
    );
}

const VotingArea = ({ prompts }) => {
    return (
        <Box sx={{
            flexDirection: 'row',
            display: 'flex',
            my: '100px'
        }}>
            <Box sx={{
                borderRadius: '10px',
                bgcolor: 'gold',
                height: '50vh',
                width: '50%',
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
                minWidth: '50%',
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
