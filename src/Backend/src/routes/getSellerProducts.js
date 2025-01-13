const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);  

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const products = await prisma.sellerProduct.findMany({
            where: {
                userId: parseInt(userId)
            }
        });
        res.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

module.exports = router;
