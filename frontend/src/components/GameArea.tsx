import { Box, Typography, Container, FormControl, Input, Button } from '@mui/material';
import { useState } from 'react';


const GameArea = () => {
    const [answer, setAnswer] = useState(() => '');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'gray',
                my: '50px'
            }}>
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '20px',
                    mr: 'auto',
                    p: '10px'
                }}>
                    <Typography sx={{
                        fontSize: '75px',
                    }}>
                        John is prompting
                    </Typography>
                </Box>
                <Typography sx={{
                    fontSize: '75px'
                }}>
                    40s remaining
                </Typography>

            </Container>
            <Box sx={{
                my: '10px',
                borderRadius: '10px',
                bgcolor: 'gold',
                minHeight: '50vh',
                maxHeight: '50vh',
                minWidth: '100%',
            }}>
                <img
                    src="../../public/cat.webp"
                    alt="Image of a cat licking it's cheek"
                    height='100%'
                    width='100%'
                />
            </Box>
            <Box
                component='form'
                sx={{
                    my: '20px'
                }}
            >
                <FormControl sx={{
                    bgcolor: 'peru',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Input
                        type='text'
                        placeholder='Write Answer'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        sx={{
                            width: '80%',
                            height: '5vh',
                            mr: '100px'
                        }}
                    />
                    <Button
                        variant='contained'
                        sx={{
                            width: '10%',
                            height: '5vh',
                        }}>
                        SEND
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default GameArea;
