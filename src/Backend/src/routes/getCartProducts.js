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
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId: parseInt(userId, 10),
            },
        });

        const actualProducts = await Promise.all(
            cartItems.map(async (item) => {
                const product = await prisma.sellerProduct.findFirst({
                    where: {
                        id: item.productId,
                    },
                });

                if (product) {
                    return {
                        ...product,
                        quantity: item.quantity,
                    };
                }
                return null;
            })
        );
        const filteredProducts = actualProducts.filter(product => product !== null);

        res.json(filteredProducts);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
