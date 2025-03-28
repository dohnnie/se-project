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
            <Button sx={{
                fontSize: '30px',
                p: '5px',
                color: 'black',
            }}>
                {prompt}
            </Button>
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
                maxWidth: '50%',
                mr: 10,
            }}>
                <img src="/cat.webp"
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
