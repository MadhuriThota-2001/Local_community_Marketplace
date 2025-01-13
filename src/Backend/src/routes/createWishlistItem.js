const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const wishlistItem = await prisma.wishlist.create({
      data: {  
        product: {
          connect: { id: productId } 
        },
        user: {
          connect: { id: parseInt(userId) }
        }
      },
    });
    res.json(wishlistItem);
  } catch (error) {
    console.error('Failed to add item to wishlist:', error);
    res.status(500).json({ message: 'Failed to add item to wishlist' });
  }
});

module.exports = router;
