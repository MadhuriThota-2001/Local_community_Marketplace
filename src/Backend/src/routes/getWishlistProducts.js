const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const userId = req.body.userId;
    if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
    }
    try {
        const products = await prisma.wishlist.findMany({
            where: {
                userId: parseInt(req.body.userId, 10)
            }
        })
        if (products) {
            const actualProducts = await Promise.all(
                products.map(async (product) => {
                    return await prisma.sellerProduct.findFirst({
                        where: {
                            id: product.productId
                        }
                    });
                })
            );
            
            res.json(actualProducts); 
        }     
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;