import { Box, Typography } from '@mui/material';

export default function AdminDashboard() {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
                This page is only visible to administrators.
            </Typography>
        </Box>
    );
}
