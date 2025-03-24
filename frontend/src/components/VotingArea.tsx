import { Box } from '@mui/material';

const Prompts = (answer) => {
    return (
        <Box sx={{
            borderRadius: '10px',
            bgcolor: 'white'
        }}>
        </Box>
    );
}

const VotingArea = ({ answers = [] }) => {
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
            </Box>
            {answers.map((answer) => <Prompts answer={answer} />}
        </Box>
    );
}

export default VotingArea;
