import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Container, TextField, Button, Typography, Grid, Paper, Box, IconButton } from '@mui/material';
import NavBar from './NavBar';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

export default function AddressPage() {
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Fetch existing addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/getAddress`, { userId });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [userId]);

  // Save a new address
  const handleAddAddress = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/add/address', { userId, address });
      setAddresses([...addresses, response.data]);
      setAddress('');
      alert('Address saved!');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  // Update an existing address
  const handleEditAddress = async (addressId, updatedAddress) => {
    try {
      await axios.put(`http://localhost:5000/api/updateAddress/${addressId}`, { address: updatedAddress });
      setAddresses(
        addresses.map(addr => (addr.id === addressId ? { ...addr, address: updatedAddress } : addr))
      );
      setEditingAddressId(null); // Exit edit mode
      alert('Address updated!');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  // Choose an address for the cart
  const handleChooseAddress = async (addressId) => {
    // try {
    //   await axios.post('http://localhost:5000/api/selectAddress', { userId, addressId });
    //   navigate('/cart'); // Redirect back to cart page
    // } catch (error) {
    //   console.error('Error choosing address:', error);
    // }
    navigate('/cart',  { state: { id: addressId } })
  };
  // Choose an address for the cart
  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.post('http://localhost:5000/api/deleteAddress', { addressId });
      navigate('/choose-address'); // Redirect back to cart page
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <NavBar title="Address List" />
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        {/* Existing Addresses */}
        <Grid container spacing={3}>
          {addresses.map((addr) => (
            <Grid item xs={12} sm={6} key={addr.id}>
              <Paper
                sx={{
                  padding: '16px',
                  position: 'relative',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer',
                }}
              >
                {editingAddressId === addr.id ? (
                  <TextField
                    fullWidth
                    value={addr.address}
                    onChange={(e) => setAddresses(addresses.map(a => a.id === addr.id ? { ...a, address: e.target.value } : a))}
                  />
                ) : (
                  <Typography>{addr.address}</Typography>
                )}

                {/* Edit and Choose Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  {editingAddressId === addr.id ? (
                    <Button
                      startIcon={<CheckIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditAddress(addr.id, addr.address)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      startIcon={<EditIcon />}
                      variant="outlined"
                      onClick={() => setEditingAddressId(addr.id)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleChooseAddress(addr.id)}
                  >
                    Choose
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <br></br>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Address
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleAddAddress}>
          Save Address
        </Button>
      </Container>
    </>
  );
}
