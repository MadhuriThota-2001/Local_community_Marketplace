const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'UserId is required' });
    }

    try {
        // Fetch all orders for the user
        const orders = await prisma.payment.findMany({
            where: {
                consumerUserId: parseInt(userId),
            },
            include: {
                product: true,
            },
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        // Format the response to include only necessary fields
        const formattedOrders = orders.map((order) => ({
            id: order.id,
            product: {
                id: order.product.id,
                name: order.product.name,
                price: order.product.price,
                image: order.product.image,
                age: order.product.age,
                location: order.product.location,
            },
            amount: order.amount,
            status: order.status,
            orderStatus: order.orderStatus,
            paymentTimestamp: order.paymentTimestamp,
        }));

        res.json(formattedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
