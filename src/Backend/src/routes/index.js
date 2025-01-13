// 'src/routes/index.js'
const express = require('express');
const router = express.Router();

// Import route handlers
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const profileRoutes = require('./getProfile.js');
const uploadProfileRoutes = require('./loadProfileDetails.js');
const sellerOnboardRoutes = require('./sellerOnboard.js');
const productRoutes = require('./product.js');
const sellerProductRoutes = require('./getSellerProducts.js');
const userProductRoutes = require('./getProducts.js');
const cartRoutes = require('./createCartItem.js')
const wishlistRoutes = require('./createWishlistItem.js')
const cartProducts = require('./getCartProducts.js')
const WishlistProducts = require('./getWishlistProducts.js')
const unlistSellerProduct = require('./unlistSellerProduct.js')
const addAddress = require('./createAddress.js')
const getAddress = require('./getAddress.js')
const deleteAddress = require('./deleteAddress.js')
const getAddressById = require('./getAddressById.js')
const clearCart = require('./clearCart.js')
const removeFromWishlist = require('./removeFromWishlist.js')
const deleteCartItem = require('./deleteCartItem.js')
const paymentItem = require('./paymentPage.js')
const paymentRecordItem = require('./createPaymentRecord.js')
const getOrderRoutes = require('./getOrders.js')
const getTransactionRoutes = require('./getTransactions.js')
const getUpdateTransactionRoutes = require('./updatePaymentRecord.js')

// Use route handlers
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/getProfile', profileRoutes);
router.use('/uploadProfileImage', uploadProfileRoutes);
router.use('/seller/onboard', sellerOnboardRoutes);
router.use('/products', productRoutes);
router.use('/seller/products', sellerProductRoutes);
router.use('/getProducts', userProductRoutes);
router.use('/cart/add', cartRoutes);
router.use('/cart/remove', deleteCartItem);
router.use('/cart/addWishlist', wishlistRoutes);
router.use('/seller/unlist', unlistSellerProduct);
router.use('/getCartProducts', cartProducts);
router.use('/getWishlistProducts', WishlistProducts);
router.use('/add/address', addAddress);
router.use('/getAddress', getAddress);
router.use('/deleteAddress', deleteAddress);
router.use('/getAddressById', getAddressById);
router.use('/clearCart', clearCart);
router.use('/removeFromWishlist', removeFromWishlist);
router.use('/create-payment-intent', paymentItem);
router.use('/create-payment-record', paymentRecordItem);
router.use('/getOrders', getOrderRoutes);
router.use('/getTransactions', getTransactionRoutes);
router.use('/updateTransactions', getUpdateTransactionRoutes);
// Add other routes here

module.exports = router;
