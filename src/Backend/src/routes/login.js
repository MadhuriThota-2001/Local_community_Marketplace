const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    async function hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
      }
      
      // Comparing passwords
      async function comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
      }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await comparePassword(password, await hashPassword(user.password));

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const crypto = require('crypto');
    const secret = crypto.randomBytes(32).toString('hex');

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
