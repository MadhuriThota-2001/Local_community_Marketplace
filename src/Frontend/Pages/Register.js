import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Snackbar, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Wallpaper from './Assets/Wallpaper.webp'; 
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' }); // Clear error on field change
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address.';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number.';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters long.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('User created:', response.data);
      setSnackbarMessage('User created successfully!');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Failed to create user.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container
      maxWidth="lg"
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
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
          borderRadius: '8px',
          padding: '20px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(error.name)}
            helperText={error.name}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(error.email)}
            helperText={error.email}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(error.phone)}
            helperText={error.phone}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(error.password)}
            helperText={error.password}
          />
          <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: '16px' }}>
            Register
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: '16px' }}
        >
          Already a user? <a href="/login">Login</a>
        </Typography>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
