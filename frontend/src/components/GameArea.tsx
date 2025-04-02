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

    const testTime = 30;
    const testPlayer = 'John';

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            maxWidth: "60vw",
            maxHeight: '92vh',
            gap: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                borderRadius: '20px',
                bgcolor: '#56A8F1',
                width: '95%',
                p: '10px',
            }}>
                    {
                        /*Prompting*/
                        (status === 2) && (
                            <>
                                <Typography sx={{ fontSize: '75px', mx: '5px' }}>{testPlayer} is prompting</Typography>
                                <Typography sx={{ fontSize: '75px', mx: '10px' }}>{testTime}s remaining</Typography>
                            </>
                        )
                    }

                    {
                        /*Guessing*/
                        (status === 3) && (
                            <>
                                <Typography sx={{ fontSize: '75px' }}>Players are guessing</Typography>
                                <Typography sx={{ fontSize: '75px', mx: '10px' }}>{testTime}s remaining</Typography>
                            </>
                        )
                    }
            </Box>
            {(status === 3) && (
                <Box sx={{
                    display: 'flex',
                    my: '10px',
                    maxHeight: '50vh',
                    maxWidth: '50%',
                }}>
                    <img
                        src="/cat.webp"
                        alt="Image of a cat licking it's cheek"
                        height='100%'
                        width='100%'
                        style={{
                            border: '5px solid #F35B66',
                            borderRadius: '40px',
                        }}
                    />
                </Box>
            )}
            <Box
                component='form'
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
                        }}
                    />
                    <Button
                        variant='contained'
                        sx={{
                            width: '10%',
                            height: '5vh',
                            bgcolor: '#004D17',
                            '&:hover': { bgcolor: '#56A8F1', color: 'black' },
                            color: 'white',
                        }}>
                        SEND
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
}

export default GameArea;
