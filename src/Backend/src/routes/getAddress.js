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
        const addresses = await prisma.address.findMany({
            where: {
                userId: parseInt(req.body.userId, 10)
            }
        })  
        res.json(addresses); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;