const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { userId, addressId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
    }

    try {
        const address = await prisma.address.findUnique({
            where: {
                id: addressId,
            },
        });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json(address);
    } catch (error) {
        console.log('Error fetching address:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
