import { Box, Typography, Container, FormControl, Input, Button } from '@mui/material';
import { useState } from 'react';

/*
 * Possible statuses are:
 * Start Game = 0
 * Loading = 1
 * isPrompting = 2
 * isGuessing = 3
 * isVoting = 4
 * Vote over = 5
 */

const GameArea = ({ status = 2 }) => {
    const [answer, setAnswer] = useState(() => '');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: "60vw"
        }}>
            {(status === 0) ? (
                <Typography sx={{ fontSize: '75px' }}>Waiting for Players</Typography>
            ) : (
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    bgcolor: 'grey',
                    my: '50px'
                }}>
                    <Box sx={{
                        bgcolor: 'white',
                        borderRadius: '20px',
                        mr: 'auto',
                        p: '10px',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        {
                            /*Prompting*/
                            (status === 2) && (
                                <>
                                    <Typography sx={{ fontSize: '75px', mx: '5px' }}>John is prompting</Typography>
                                    <Typography sx={{ fontSize: '75px', mx: '10px' }}>40s remaining</Typography>
                                </>
                            )
                        }

                        {
                            /*Guessing*/
                            (status === 3) && (
                                <>
                                    <Typography sx={{ fontSize: '75px' }}>Players are guessing</Typography>
                                    <Typography sx={{ fontSize: '75px', mx: '10px' }}>20s remaining</Typography>
                                </>
                            )
                        }
                    </Box >
                </Container>
            )}
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
}

export default GameArea;
