const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { addressId } = req.body;

  try {
    const addressItem = await prisma.address.delete({
     where: {
        id: addressId
     }
    });
    res.json(addressItem);
  } catch (error) {
    console.error('Failed to delete item from address:', error);
    res.status(500).json({ message: 'Failed to delete item from address' });
  }
});

module.exports = router;
