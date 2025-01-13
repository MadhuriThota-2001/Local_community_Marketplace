const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const wishlistItem = await prisma.wishlist.deleteMany({
      where: {
        userId: parseInt(userId, 10),
        productId: productId,
     }
    });
    res.json(wishlistItem);
  } catch (error) {
    console.error('Failed to delete item from wishlist:', error);
    res.status(500).json({ message: 'Failed to delete item from wishlist' });
  }
});

module.exports = router;
