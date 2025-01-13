import React, { useEffect, useState } from 'react';
import { AppBar, Container, Typography, Button, Box, Grid } from '@mui/material';
import axios from 'axios';
import ProductCard from './ProductCard'; 
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const location = useLocation();

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const id = location.state?.id;


  async function getCartItems() {
    try {
      const response = await axios.post('http://localhost:5000/api/getCartProducts', { userId });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  }

  async function handleClearcart() {
    try {
      await axios.post('http://localhost:5000/api/clearCart', { userId });
      alert('Cart Cleared successfully');
      await getCartItems();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  const handleChooseAddress = async (addressId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/getAddressById', { userId, addressId });
      setAddress(response.data);
    } catch (error) {
      console.error('Error choosing address:', error);
    }
  };

  useEffect(() => {
    getCartItems();
    if (id) handleChooseAddress(id);
  }, [id]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <AppBar position="static">
        <NavBar title="Your Cart" />
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: '40px' }}>
        <Grid container spacing={3} mt={4}>
          {cartItems.length ? (
            cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ProductCard product={item} Buttons='cart' />
              </Grid>
            ))
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" mt={4}>
              <Typography variant="h6" color="textPrimary" fontWeight="bold">
                No items in Cart
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ padding: '12px', fontSize: '18px', mt: 2 }}
                onClick={() => navigate('/landing')} 
              >
                Continue Shopping
              </Button>
            </Box>
          )}
        </Grid>

        <Box 
          sx={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <Box 
          sx={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            Address:
          </Typography>
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            {address.address || "No address selected"}
          </Typography>
        </Box>

        <Box sx={{ marginTop: '20px', display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="warning" 
            sx={{ padding: '12px', fontSize: '18px', flex: 1 }}
            onClick={handleClearcart}
          >
            Clear Cart
          </Button>
          {id ? (
            <Button 
              variant="contained" 
              color="success" 
              sx={{ padding: '12px', fontSize: '18px', flex: 1 }}
              onClick={() => navigate('/payment', { state: { cart: cartItems } })}
            >
              Proceed to Payment
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ padding: '12px', fontSize: '18px', flex: 1 }}
              onClick={() => navigate('/choose-address')}
            >
              Choose Address
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
}
