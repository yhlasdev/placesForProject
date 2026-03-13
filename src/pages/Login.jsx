import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/queries/post';

export default function Login() {

    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation({
        mutationFn: (credentials) => login(credentials),
        onSuccess: (data) => {
            const access_token = data?.data?.data?.access_token;
            const refresh_token = data?.data?.data?.refresh_token;
            Cookies.set('auth_token', access_token, { expires: 7, secure: true, sameSite: 'strict' });
            Cookies.set('refresh_token', refresh_token, { expires: 30, secure: true, sameSite: 'strict' });

            const userData = data?.data?.data?.user_data;
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate('/');
        },
        onError: (error) => {
            console.error('login error:', error.response?.data?.message || error.message);
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();

        loginMutation.mutate({
            phone: phoneNumber,
            password: password
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f4f6'
            }}
        >
            <Card sx={{ maxWidth: 400, width: '100%', mx: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
                        Sign In
                    </Typography>

                    {loginMutation.isError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {loginMutation.error.response?.data?.message || 'login failed'}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={loginMutation.isPending}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loginMutation.isPending}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 1, py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}