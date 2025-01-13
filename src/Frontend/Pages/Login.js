import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store.js';
import Wallpaper from './Assets/Wallpaper.webp';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/login', formData);
      console.log('Login successful');
      localStorage.setItem('userEmail', formData.email);
      setSnackbarMessage('Login successful!');
      setOpenSnackbar(true);
      dispatch(login({ email: formData.email }));
      setTimeout(() => {
        navigate('/landing');
      }, 2000);
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Failed to log in.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      style={{
        paddingTop: '20px',
        width: '100%',
        backgroundImage: `url(${Wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          style={{ textAlign: 'center', marginTop: '15px' }}
        >
          Not a user? <a href="/register" style={{ color: '#1976d2' }}>Register</a>
        </Typography>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarMessage.includes('successful') ? 'success' : 'error'}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
