const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { userId, address } = req.body;

  try {
    const addressItem = await prisma.address.create({
      data: {  
        address: address,
        user: {
          connect: { id: parseInt(userId) }
        }
      },
    });
    res.json(addressItem);
  } catch (error) {
    console.error('Failed to add item to address:', error);
    res.status(500).json({ message: 'Failed to add item to address' });
  }
});

module.exports = router;
