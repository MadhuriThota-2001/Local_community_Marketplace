import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerOnboard = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Watch selected payment method
  const watchPaymentMethod = watch('paymentMethod');

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userId = parseInt(localStorage.getItem('userId'));

      const payload = {
        userId,
        fullname: data.fullname,
        email: data.email,
        mobile: data.mobile,
        address: {
          doorNo: data.doorNo,
          street: data.street,
          landmark: data.landmark,
          city: data.city,
          pincode: data.pincode,
        },
        experience: data.experience,
        paymentMethod: data.paymentMethod,
        upiId: data.upiId || null,
        bankDetails: data.paymentMethod === 'BANK' ? {
          name: data.bankName,
          accountNumber: data.accountNumber,
          ifsc: data.ifsc,
          bankName: data.bankName,
        } : null,
      };

      // Send request to the API
      await axios.post('http://localhost:5000/api/seller/onboard', payload);
      navigate('/seller-landing')

      alert('Seller details submitted successfully!');
    } catch (error) {
      console.error('Error submitting seller details:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Seller Onboarding</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label className="form-label">Fullname</label>
          <input className="form-control" {...register('fullname', { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" {...register('email', { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input type="tel" className="form-control" {...register('mobile', { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <div className="mb-2">
            <label className="form-label">Door No, Street</label>
            <input className="form-control" {...register('doorNo', { required: true })} placeholder="Door No" />
            <input className="form-control mt-1" {...register('street', { required: true })} placeholder="Street" />
          </div>
          <div className="mb-2">
            <label className="form-label">Landmark</label>
            <input className="form-control" {...register('landmark')} placeholder="Landmark (Optional)" />
          </div>
          <div className="mb-2">
            <label className="form-label">City</label>
            <input className="form-control" {...register('city', { required: true })} />
          </div>
          <div className="mb-2">
            <label className="form-label">Pincode</label>
            <input className="form-control" {...register('pincode', { required: true })} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Experience in Selling</label>
          <input className="form-control" {...register('experience', { required: true })} />
        </div>

        <div className="mb-3">
          <label className="form-label">Accepted Payment Methods</label>
          <select className="form-select" {...register('paymentMethod', { required: true })}>
            <option value="UPI">UPI</option>
            <option value="BANK">Bank Account</option>
          </select>
        </div>

        {watchPaymentMethod === 'UPI' && (
          <div className="mb-3">
            <label className="form-label">UPI ID</label>
            <input className="form-control" {...register('upiId', { required: true })} placeholder="Enter UPI ID" />
          </div>
        )}

        {watchPaymentMethod === 'BANK' && (
          <>
            <div className="mb-3">
              <label className="form-label">Account Holder Name</label>
              <input className="form-control" {...register('bankName', { required: true })} placeholder="Account Holder Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input className="form-control" {...register('accountNumber', { required: true })} placeholder="Account Number" />
            </div>
            <div className="mb-3">
              <label className="form-label">IFSC Code</label>
              <input className="form-control" {...register('ifsc', { required: true })} placeholder="IFSC Code" />
            </div>
            <div className="mb-3">
              <label className="form-label">Bank Name</label>
              <input className="form-control" {...register('bankName', { required: true })} placeholder="Bank Name" />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default SellerOnboard;
