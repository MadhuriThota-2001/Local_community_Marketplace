const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cartItem = await prisma.cartItem.deleteMany({
     where: {
        userId: parseInt(userId, 10),
        productId: productId,
     }
    });
    res.json(cartItem);
  } catch (error) {
    console.error('Failed to delete item from cart:', error);
    res.status(500).json({ message: 'Failed to delete item from cart' });
  }
});

module.exports = router;
