import React, { useEffect, useState } from 'react';
import { AppBar, Container, Grid} from '@mui/material';
import axios from 'axios';
import ProductCard from './ProductCard'; 
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

export default function WishlistPage() {
  const [wishlistItems, setwishlistItems] = useState([]);

  const userId = localStorage.getItem('userId');
  const location = useLocation()
  const id = location.state?.id || null;

  async function getwishlistItems() {
    try {
      const response = await axios.post('http://localhost:5000/api/getWishlistProducts', { userId });
      setwishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishListed products:', error);
    }
  }

  const refreshWishlist = () => {
    getwishlistItems();
  };

  useEffect(() => {
    getwishlistItems();
    if(id) getwishlistItems();
  }, [id]);


  return (
    <>
      <AppBar position="static">
        <NavBar title={'Your Wishlist'} />
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: '40px' }}>
        <Grid container spacing={3} mt={4}>
          {wishlistItems?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductCard product={item} Buttons='wishlist' refreshWishlist={refreshWishlist} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
