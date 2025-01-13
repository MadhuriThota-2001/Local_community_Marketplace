import React from 'react';
import { Container,Typography } from '@mui/material';

import Wallpaper from './Assets/Wallpaper.webp';
import NavBar from '../Components/NavBar';

export default function HomePage() {
  return (
    <>
    <NavBar />
    <Container maxWidth="lg"
    style={{
      paddingTop: '20px',
      width: '100%',
      backgroundImage: `url(${Wallpaper})`,
      backgroundSize: 'center',
      backgroundPosition: 'center',
      justifyContent: 'center', 
      alignItems: 'center',
      display: 'flex',
      height: '100vh', 
    }}>
      <Typography variant="h4" align="center" style={{
          padding: '20px',
          backgroundColor: 'white', 
          borderRadius: '8px',
        }}>
        Welcome to Local Buy
      </Typography>
    </Container>
    </>
  );
}
