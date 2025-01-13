const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const {  productId } = req.body;

  try {
    // Check if the product exists and is owned by the user
    const product = await prisma.sellerProduct.findUnique({
        where: { id: productId },
      });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product from the database
    await prisma.sellerProduct.delete({
      where: {
        id: productId,
      },
    });

    return res.status(200).json({ message: 'Product successfully unlisted' });
  } catch (error) {
    console.error('Error unlisting product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;