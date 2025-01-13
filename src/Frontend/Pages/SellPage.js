import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SellPage() {
  const [product, setProduct] = useState({
    name: '',
    age: '',
    price: '',
    location: '',
    description: '',
    image: null, 
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const userId = parseInt(localStorage.getItem('userId'));

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('age', product.age);
    formData.append('price', product.price);
    formData.append('location', product.location);
    formData.append('description', product.description);
    formData.append('image', product.image);  
    formData.append('userId', userId)
    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.status === 200) {
        alert('Product added for sale!');
        setProduct({
          name: '',
          age: '',
          price: '',
          location: '',
          description: '',
          image: null,
        });
        navigate('/seller-landing')
      }

    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sell Your Product
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Product Name"
        name="name"
        value={product.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Age of Product"
        name="age"
        value={product.age}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Price"
        name="price"
        value={product.price}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Location"
        name="location"
        value={product.location}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={product.description}
        onChange={handleInputChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleAddProduct}>
        Add Product
      </Button>
    </Container>
  );
}
