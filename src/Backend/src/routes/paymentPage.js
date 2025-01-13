const express = require('express');
const router = express.Router();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const stripe = require('stripe')('sk_test_51QKQSgJ8xF3yaB99WIssTp8OEMuGPqfDovmv25jiRyRvUduDjCfJRn0uhBNjXOthovabjHRJiz8Xs3NguISrT39j00ldKIOqqT');

router.post('/', async (req, res) => {
  const { amount } = req.body;
  try {
     const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log(paymentIntent)
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create PaymentIntent');
  }
});

module.exports = router;
