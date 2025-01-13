import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Assuming you store the user ID in local storage after login

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      console.error('User ID not found');
      navigate('/login'); 
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/profile/${userId}`, profile);
      alert('Profile updated successfully!');
      navigate('/profile'); // Redirect back to the profile page after saving
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Your Profile
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={profile.address}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
}
