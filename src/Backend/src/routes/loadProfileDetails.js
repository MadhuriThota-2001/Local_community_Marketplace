const express = require('express');
const multer = require('multer');
const router = express.Router();
// const fs = require('fs');
// const path = require('path');
const {updateProfile} = require('../models/User')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("Saving to:", uploadDir);
    cb(null, 'src/Backend/src/uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  const userEmail = req.body.userEmail;
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const updateResult = await updateProfile({userEmail: userEmail, imageUrl: imageUrl});
    console.log(updateResult)
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error updating profile image', error);
    res.status(500).json({ message: 'Error updating profile image', error });
  }
});

module.exports = router;
