const fs = require('fs');
const path = require('path');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/Backend/src/uploads/products'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name, age, price, location, userId, description } = req.body;
  try {
    const image = `/uploads/products/${req.file.filename}`; 
    const sellerProduct = await prisma.sellerProduct.create({
      data: {
        id: `${Date.now()}-${name}`,
        name,
        age,
        price: parseFloat(price),
        location,
        description: description,
        image, 
        user: {
            connect: {
              id: parseInt(userId)
            }
          }
      },
    });


    res.status(200).json({ message: 'Product added successfully!', sellerProduct});
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'An error occurred while adding the product.' });
  }
});

module.exports = router;
