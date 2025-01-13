import React from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Description } from '@mui/icons-material';

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  media: {
    height: 200,
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  content: {
    padding: '16px 24px',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    color: '#D83344',
    fontWeight: 600,
    fontSize: '1.2rem',
  },
  age: {
    color: '#757575',
    fontSize: '0.9rem',
    marginLeft: '8px',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#D83344',
    color: 'white',
    '&:hover': {
      backgroundColor: '#B72A36',
    },
  },
});


const SellerProductCard = ({ title, price, age, image, id , description}) => {
  const classes = useStyles();
  const navigate = useNavigate()
  
  const handleRemoveItem = async (productId) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post('http://localhost:5000/api/seller/unlist', {
        userId,
        productId,
        quantity: 1,
      });
      console.log('Item removed from listing successfully!');
      navigate('/seller-landing')
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };


  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        image={`http://localhost:5000${image}`}
        alt={title}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
          <Typography className={classes.price}>${price}</Typography>
          <Typography className={classes.age}>{age} Years</Typography>
        </Box>
        <Box boxShadow='black' border='1px solid black' borderRadius='10px'>
          <Typography className={classes.age}>{description}</Typography>
        </Box>
        <Button
          fullWidth
          className={classes.button}
          variant="contained"
          onClick={() => {
            handleRemoveItem(id)
            navigate('/seller-landing', { state: { id: id} })
            }
          }
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default SellerProductCard;
