const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { data: { amount, status, cartProductIds, userId } } = req.body;

  try {
    const product = await prisma.sellerProduct.findUnique({
      where: {
        id: cartProductIds[0]
      },
      select: {
        userId: true 
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const sellerUserId = product.userId;

    const paymentRecords = await Promise.all(
      cartProductIds.map(async (productId) => {
        return prisma.payment.create({
          data: {
            consumerUserId: parseInt(userId), 
            sellerUserId: sellerUserId, 
            productId: productId, 
            status: status === 'succeeded'? 'SUCCESS': 'FAILED',
            amount: amount,
          }
        });
      })
    );

    res.json({ message: 'Payment records created successfully', paymentRecords });
  } catch (error) {
    console.error('Failed to add items to payment table:', error);
    res.status(500).json({ message: 'Failed to add items to payment table' });
  }
});

module.exports = router;
