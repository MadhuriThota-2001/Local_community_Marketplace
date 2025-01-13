const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    // Find any product name matching partially or exactly with searchItem
    try {
        const name = req.body?.searchValue || '';
        let products
        if(name){
            products = await prisma.sellerProduct.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: name,
                                mode: 'insensitive',
                            },
                        },
                        {
                            location: {
                                contains: name,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }
            });
        }
        else {
            products = await prisma.sellerProduct.findMany();
        }
        res.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

module.exports = router;
