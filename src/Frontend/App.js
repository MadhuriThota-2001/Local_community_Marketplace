import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import Login from '../Frontend/Pages/Login';
import Contact from './Pages/Contact';
import Help from './Pages/Help';
import LandingPage from './Pages/LandingPage';
import CartPage from './Pages/CartPage';
import WishlistPage from './Pages/Wishlist';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/EditProfilePage';
import { useSelector } from 'react-redux';
import SellerOnboard from './Pages/SellerOnboard';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import SellerLanding from './Pages/SellerLandingPage';
import SellPage from './Pages/SellPage';
import AddressPage from './Pages/AddressPage';
import CheckoutForm from './Pages/PaymentPage';
import SuccessPage from './Pages/SuccessPage';
import OrdersPage from './Pages/OrdersPage';
import Transactions from './Pages/TransactionsPage';

function App() {
  const user = useSelector((state) => state.user.user);
  const stripePromise = loadStripe('pk_test_51QKQSgJ8xF3yaB99WKrvVYeGDEzr4WrB6hOYnEiA1tXNynHkk8uncNcaXwv0l7PlrW9z3bvP2KOkIOnai1JGyIne003gj0HaCZ');

  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <>
        {
          user? (
            <>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            } />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/seller-onboard" element={<SellerOnboard />} />
            <Route path="/seller-landing" element={<SellerLanding />} />
            <Route path="/add-product" element={<SellPage />} />
            <Route path="/choose-address" element={<AddressPage />} />
            <Route path="/success-page" element={<SuccessPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/transactions" element={<Transactions />} />
            </>
          ) : (
            <Route path="/login" element={<Login />}></Route>
          )
        }
        </>
      </Routes>
    </Router>
  );
}

export default App;
