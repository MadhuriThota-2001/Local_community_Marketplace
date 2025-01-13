import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, InputAdornment, Grid, AppBar, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductCard from './ProductCard'; 
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../store.js';
import StoreIcon from '@mui/icons-material/Store';
import appIcon from './Assets/appIcon.png';

export default function LandingPage() {
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([]); 
  const [profileType, setProfileType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    dispatch(logout());
    navigate('/login');
  };


  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/getProducts', { searchValue });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductsAndLocation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/getProducts', {});
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setLocation(data.address.town || 'Unknown city');
        } catch (error) {
          console.error('Error fetching location:', error);
          setLocation('Unable to retrieve location');
        }
      },
      () => {
        console.error('Geolocation permission denied or error');
        setLocation('Unable to retrieve location');
      }
    );
  };
  
  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          console.error('Something went wrong :(');
          return;
        }
        const response = await axios.post('http://localhost:5000/api/getProfile', { userEmail });
        setProfileType(response.data.category === 'SELLER' ? 'seller' : 'consumer');
        localStorage.setItem('userId', response.data.id)
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
    fetchProductsAndLocation();
  }, []); 

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={appIcon} alt="App Icon" style={{ width: 60, height: 40, marginRight: 8, borderRadius: 10 }} />
            <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/landing" onClick={() => fetchProductsAndLocation()}style={{ color: '#fff', textDecoration: 'none' }}>
            Local Buy
          </Link>
        </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search products..."
              variant="outlined"
              size="small"
              style={{ marginRight: '1rem', backgroundColor: '#fff' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={handleSearch}>
              <SearchIcon />
            </Button>
            <TextField
              placeholder="Enter location"
              variant="outlined"
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ marginRight: '1rem', backgroundColor: '#fff' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
            {profileType === 'seller' && (
              <Link to="/seller-landing" style={{ marginRight: '1rem' }}>
                <StoreIcon sx={{ color: 'whitesmoke' }} />
              </Link>
            )}
            <Link to="/cart" style={{ marginRight: '1rem' }}>
              <ShoppingCartIcon sx={{ color: 'whitesmoke' }} />
            </Link>
            <Link to="/wishlist" style={{ marginRight: '1rem' }}>
              <FavoriteIcon sx={{ color: 'whitesmoke' }} />
            </Link>
            <Link to="/profile" style={{ marginRight: '1rem', color: 'inherit' }}>
              <AccountCircleIcon sx={{ color: 'whitesmoke' }} />
            </Link>
            <IconButton color="inherit" onClick={handleSignOut}>
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} Buttons="display" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
