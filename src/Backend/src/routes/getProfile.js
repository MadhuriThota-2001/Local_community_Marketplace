const { getUser } = require('../models/User');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const userEmail = req.body;
    if (!userEmail) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await getUser(userEmail)
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;