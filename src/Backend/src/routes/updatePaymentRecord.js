const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const {  transactionId, action } = req.body;

  try {
    const paymentRecords = await prisma.payment.update({
          where: {
            id: parseInt(transactionId,10)
          },
          data: { orderStatus: action },
        });

    res.json({ message: 'Payment records updated successfully', paymentRecords });
  } catch (error) {
    console.error('Failed to update payment table:', error);
    res.status(500).json({ message: 'Failed to update payment table:' });
  }
});

module.exports = router;
