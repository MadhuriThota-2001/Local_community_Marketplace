const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItem = await prisma.cartItem.create({
      data: {  
        quantity: quantity || 1,
        product: {
          connect: { id: productId } 
        },
        user: {
          connect: { id: parseInt(userId) }
        }
      },
    });
    res.json(cartItem);
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

module.exports = router;
