const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  try {
    const {
      userId, 
      fullname,
      email,
      mobile,
      address, 
      experience,
      paymentMethod,
      upiId,   
      bankDetails 
    } = req.body;

    const createdAddress = await prisma.address.create({
      data: {
        userId,  // Link the address to the user
        address: `${address.doorNo}, ${address.street}, ${address.landmark}, ${address.city} - ${address.pincode}`,
      },
    });

    // Step 2: Create the seller entry and link the address
    const createdSeller = await prisma.seller.create({
      data: {
        fullname,
        email,
        mobile,
        experience,
        paymentMethod,
        upiId: paymentMethod === 'UPI' ? upiId : null,
        addressId: createdAddress.id,
        bankDetails: paymentMethod === 'BANK' ? {
          create: bankDetails,
        } : undefined,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        category: 'SELLER',
      },
    });

    res.status(200).json({
      message: 'Seller onboarding successful, user category updated to SELLER.',
      seller: createdSeller,
    });
  } catch (error) {
    console.error('Error during seller onboarding:', error);
    res.status(500).json({
      error: 'An error occurred during seller onboarding. Please try again.',
    });
  }
});

module.exports = router;
