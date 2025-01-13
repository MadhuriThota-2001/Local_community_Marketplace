import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography, Box, Grid, Paper, Divider, AppBar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

export default function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = location.state?.cart || [];
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartProductIds = cart.map((item) => item.id)

  async function createPaymentRecord(amount, status, cartProductIds, userId){
    await axios.post('http://localhost:5000/api/create-payment-record', {
      data: {amount, status, cartProductIds, userId},
    })
  }

  async function handleClearcart() {
    try {
      const userId = localStorage.getItem('userId')
      await axios.post('http://localhost:5000/api/clearCart', { userId });
      
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  async function handlePayment(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe has not loaded yet.');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const { data: clientSecret } = await axios.post('http://localhost:5000/api/create-payment-intent', {
        userId,
        amount: cartTotal * 100, // Stripe requires the amount in cents
      });

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userId,
          },
        },
      });

      if (paymentResult.error) {
        console.error('Payment failed:', paymentResult.error.message);
        alert('Payment failed! Please try again.');
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        const {paymentIntent: { amount, status}} = paymentResult
        await createPaymentRecord(amount, status, cartProductIds, userId)
        await handleClearcart()
        alert('Payment successful!');
        navigate('/success-page');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during the payment process. Please try again.');
    }
  }

  return (
    <>
    <AppBar position="static">
      <NavBar title={'Payment'}   color="#fff"/>
    </AppBar>
    <Box 
      sx={{ 
        padding: '20px', 
        backgroundColor: '#f9f9f9', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Typography variant="h4" gutterBottom>
        Payment Page
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          padding: '20px', 
          marginBottom: '20px', 
          width: '100%', 
          maxWidth: '600px' 
        }}
      >
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>

        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <Box key={item.id} sx={{ marginBottom: '10px' }}>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        )}
      </Paper>

      <Paper 
        elevation={3} 
        sx={{ 
          padding: '20px', 
          width: '100%', 
          maxWidth: '600px' 
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enter Card Details
        </Typography>
        <form onSubmit={handlePayment}>
          <Box sx={{ marginBottom: '20px' }}>
            <CardElement 
              options={{ 
                style: { 
                  base: { 
                    fontSize: '16px', 
                    color: '#424770', 
                    '::placeholder': { color: '#aab7c4' } 
                  }, 
                  invalid: { color: '#9e2146' } 
                } 
              }} 
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={!stripe}
              >
                Pay ${cartTotal.toFixed(2)}
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/landing')}
                >
              cancel
              </Button>
          </Box>
        </form>
      </Paper>
    </Box>
    </>
  );
}
