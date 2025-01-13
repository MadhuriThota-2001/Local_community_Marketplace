import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, AppBar } from '@mui/material';
import axios from 'axios'
import NavBar from './NavBar';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Simulate fetching orders from an API
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId')
      const orders = await axios.post('http://localhost:5000/api/getOrders', {userId});
      setOrders(orders.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
    <AppBar position="static">
      <NavBar title={'Orders'}   color="#0d6efd"/>
    </AppBar>
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3} margin='10px'>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card sx={{ maxWidth: 345, height: 400, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image={`http://localhost:5000${order.product.image}`}
                alt={order.product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {order.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${order.product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {order.paymentTimestamp}
                </Typography>
                <Typography
                  variant="body2"
                  color={order.orderStatus === 'CONFIRMED' ? 'green' : order.status === 'SHIPPED' ? 'orange' : 'red'}
                >
                  Status: {order.orderStatus}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default OrdersPage;
