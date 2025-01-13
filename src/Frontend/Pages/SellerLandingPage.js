import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Typography, Grid } from '@mui/material';
import SellerProductCard from './SellerProduct';
import SellerNavBar from './SellerNavBar';
import { useLocation } from 'react-router-dom';

const SellerLanding = () => {
  const [products, setProducts] = useState([]);
  const [Profile, setProfile] = useState({}); 
  const location = useLocation()
  const id = location.state?.id || null;

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, [id]);

  const fetchProducts = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'), 10);  
      const response = await axios.get(`http://localhost:5000/api/seller/products/${userId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <SellerNavBar title={Profile.name || 'Seller'} /> 
      </AppBar>

      <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
        <h1>My Products</h1>
      </Typography>
      <Grid container spacing={2} margin={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <SellerProductCard
              key={product.id}
              title={product.name}
              age={product.age}
              price={product.price}
              image={product.image}
              id={product.id}
              description={product.description}
            />
          ))
        ) : (
          <Typography align="center">No products listed yet.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default SellerLanding;
