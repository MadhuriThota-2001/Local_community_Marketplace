import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, TextField, Divider } from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const handleAddToCart = async (productId, quantity) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId,
        productId,
        quantity: quantity, 
      });
      alert('Item added to cart successfully!')
      console.log('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
const handleRemoveFromCart = async (productId, quantity) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post('http://localhost:5000/api/cart/remove', {
        userId,
        productId,
        quantity: quantity, 
      });
      alert('Item removed from cart successfully!')
      console.log('Item removed from cart successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post('http://localhost:5000/api/cart/addWishlist', {
        userId,
        productId
      });
      alert('Item added to wishlist successfully!')
      console.log('Item added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };
  const handleRemoveFromWishlist = async (productId) => {
    const userId = localStorage.getItem('userId');
    try {
      await axios.post('http://localhost:5000/api/removeFromWishlist', {
        userId,
        productId
      });
      alert('Item removed from wishlist successfully!')
      console.log('Item removed from wishlist successfully!');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };
  

export default function ProductCard({ product , Buttons, refreshWishlist }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  // To increment quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // To decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Card
      style={{
        margin: '20px',
        width: '300px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="product-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={`http://localhost:5000${product.image}`}
        alt={product.name}
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        }}
      />
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#f4f4f4', marginBottom: '5px', border: '1px black', borderRadius: '5px'}}>
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: '#333',
              }}
            >
              {product.name}
            </Typography>
            <Divider orientation="vertical" flexItem style={{ margin: '0 16px' }} />
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{
                // margin: '10px 0',
                fontSize: '18px',
                color: '#555',
              }}
            >
              ${product.price}
            </Typography>
        </div>
        {Buttons === 'display' && (
             <>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Button 
                  variant="outlined" onClick={decrementQuantity} style={{ minWidth: '40px',  height: '40px',padding: '0',fontSize: '18px',}}>
                  -
                </Button>
                <TextField type="number" value={quantity} style={{ width: '60px',height: '40px',textAlign: 'center', margin: '0 10px',}}
                  inputProps={{ min: 1, readOnly: true ,
                    style: { textAlign: 'center', fontSize: '16px', height: '40px', padding: '0' }, // Adjust text alignment and size
                  }}
                />
                <Button variant="outlined" onClick={incrementQuantity} style={{ minWidth: '40px', height: '40px',padding: '0',fontSize: '18px'}}>
                  +
                </Button>
              </Box>
              <Typography>{product.description}</Typography>
              <Button variant="contained" color="primary" style={{ marginRight: '10px',transition: 'background-color 0.3s ease'}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e8e41')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
                onClick={() => handleAddToCart(product.id, quantity)}
              >
                Add to <span><ShoppingCartIcon /></span>
              </Button>
              <Button variant="outlined" color="secondary" style={{ borderColor: '#f50057', color: '#f50057', transition: 'color 0.3s ease, border-color 0.3s ease',}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ff4081';
                  e.currentTarget.style.color = '#ff4081';
                }}
                onClick={() => handleAddToWishlist(product.id, quantity)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f50057';
                  e.currentTarget.style.color = '#f50057';
                }}
              >
                Wishlist <span><FavoriteIcon /></span>
              </Button>
              </>
          )}
        {Buttons === 'wishlist' && (
             <Box display="flex" alignItems="center" justifyContent="space-evenly" mb={2}>
              <Button variant="contained" color="primary" style={{ marginRight: '10px',transition: 'background-color 0.3s ease'}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e8e41')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
                onClick={() => handleAddToCart(product.id, quantity)}
              >
                Add to <span><ShoppingCartIcon /></span>
              </Button>
              <Button variant="outlined" color="secondary" style={{ borderColor: '#f50057', color: '#f50057', transition: 'color 0.3s ease, border-color 0.3s ease',}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ff4081';
                  e.currentTarget.style.color = '#ff4081';
                }}
                onClick={async () => {
                  await handleRemoveFromWishlist(product.id, quantity)
                  refreshWishlist()
                  navigate('/wishlist',  { state: { id: product.id } })
                }
              }
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f50057';
                  e.currentTarget.style.color = '#f50057';
                }}
              >
                Remove from <span><FavoriteIcon /></span>
              </Button>
              </Box>
          )}
        {Buttons === 'cart' && (
             <Box display="flex" alignItems="center" justifyContent="space-evenly" mb={2} marginTop='2px'>
              <Button variant="contained" color="primary" style={{ marginRight: '10px',transition: 'background-color 0.3s ease'}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e8e41')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
                onClick={async () => {
                  await handleRemoveFromCart(product.id, quantity);
                  navigate('/cart'); // Ensures navigation after the function call
                }}
              >
                Remove from <span><ShoppingCartIcon /></span>
              </Button>
              <Button variant="outlined" color="secondary" style={{ borderColor: '#f50057', color: '#f50057', transition: 'color 0.3s ease, border-color 0.3s ease',}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ff4081';
                  e.currentTarget.style.color = '#ff4081';
                }}
                onClick={ async() => {
                  await handleAddToWishlist(product.id, quantity)
                  
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f50057';
                  e.currentTarget.style.color = '#f50057';
                }}
              >
                Save to <span><FavoriteIcon /></span>
              </Button>
              </Box>
          )}
      </CardContent>
    </Card>
  );
}
