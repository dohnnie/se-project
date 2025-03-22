import { useState } from 'react';
import { Box, FormControl, Input, Button } from '@mui/material';

const ChatFooter = () => {
    const [message, setMessage] = useState(() => '');

    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessage('');
    };

    return (
        <Box
            sx={{
                p: '10px',
                bgcolor: '#f9f5eb',
                height: '10vh'
            }}>
            <Box component='form'>
                <FormControl
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <Input
                        type='text'
                        placeholder='Write Message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{
                            width: '80%',
                            height: '100%',
                            borderRadius: '10px',
                            border: '1px solid #ddd',
                            outline: 'none',
                            p: '15px'
                        }}
                    />
                    <Button
                        sx={{
                            width: '150px',
                            bgcolor: 'green',
                            p: '10px',
                            border: 'none',
                            outline: 'none',
                            color: '#eae3d2',
                            cursor: 'pointer',
                            "&:hover": { bgcolor: '#81c981' }
                        }}>

                        SEND
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default ChatFooter;
