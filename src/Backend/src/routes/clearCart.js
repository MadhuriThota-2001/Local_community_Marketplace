const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { userId } = req.body;

  try {
    const deleteResult = await prisma.cartItem.deleteMany({
      where: {
        userId: parseInt(userId, 10),
      },
    });
    res.json({ message: 'Cart cleared successfully', deletedCount: deleteResult.count });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    res.status(500).json({ message: 'Failed to clear cart', error });
  }
});

module.exports = router;
