import React, { useState, useEffect } from 'react';
import { AppBar, Container, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import NavBar from './NavBar';

const Input = styled('input')({
  display: 'none',
});

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [profileType, setProfileType] = useState('Consumer'); // New state for profile type
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        console.error('Something went wrong :(');
        return;
      }
      const response = await axios.post('http://localhost:5000/api/getProfile', { userEmail });
      setProfile(response.data);
      localStorage.setItem('userId', response.data.id);
      setProfileImage(response.data.profileImage || ''); 
      setProfileType(response.data.category === 'SELLER' ? 'Seller' : 'Consumer');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const userEmail = localStorage.getItem('userEmail');
    formData.append('userEmail', userEmail);

    try {
      const response = await axios.post('http://localhost:5000/api/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfileImage(response.data.imageUrl); 
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleOrders = () => {
    navigate('/orders')
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  // const handleSwitchProfile = () => {
  //   // Toggle between 'Consumer' and 'Seller' profile views
  //   setProfileType((prevType) => (prevType === 'Consumer' ? 'Seller' : 'Consumer'));
  // };

  return (
    <>
      <AppBar position="static">
        {/* { profile.category === 'SELLER' ?     
        <SellerNavBar title={profile.name} /> : */}
        <NavBar title={profile.name} />
        {/* } */}
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Profile
        </Typography>
        <div style={{ marginBottom: '20px' }}>
          <Avatar
            alt={profile.name || ''}
            src={`http://localhost:5000${profileImage}` || '/default-avatar.png'}
            style={{
              width: '100px',
              height: '100px',
              margin: '0 auto',
            }}
          />
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageChange} />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <TextField fullWidth margin="normal" label="Name" value={profile.name || ''} disabled />
        <TextField fullWidth margin="normal" label="Email" value={profile.email || ''} disabled />
        <TextField fullWidth margin="normal" label="Phone" value={profile.phone || ''} disabled />
        <TextField fullWidth margin="normal" label="Address" value={profile.address || ''} disabled />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: '20px' }}>
              Edit Profile
            </Button>
            <Button variant="contained" color="primary" onClick={handleOrders} style={{ marginTop: '20px' }}>
              Orders
            </Button>
          </div>
          <>
            {profileType === 'Consumer' && profile.category !== 'SELLER' ? (
              <Button variant="contained" color="secondary" onClick={() => navigate('/seller-onboard')} style={{ marginTop: '10px' }}>
                Become a Seller
              </Button>
            ) : (
              profileType === 'Seller' && (
                <Button variant="contained" color="secondary" onClick={() => navigate('/seller-landing')} style={{ marginTop: '10px' }}>
                  Sell Products
                </Button>
              )
            )}
          </>
        </div>
      </Container>
    </>
  );
}
