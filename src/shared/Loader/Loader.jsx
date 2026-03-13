import { Box } from '@mui/material';
export const Loader = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ maxHeight: 300, maxWidth: 300, width: 'auto', height: 'auto' }}>
                loading...
            </Box>
        </Box>
    )
}