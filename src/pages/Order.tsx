import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import { Plus, Minus, Trash2, MapPin, Clock, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Order = () => {
  const { state, dispatch } = useOrder();
  const [step, setStep] = useState(1); // 1: Cart, 2: Details, 3: Payment, 4: Confirmation
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const handleOrderTypeChange = (type) => {
    dispatch({ type: 'SET_ORDER_TYPE', payload: type });
  };

  const handleCustomerInfo = (field, value) => {
    dispatch({ type: 'SET_CUSTOMER_INFO', payload: { [field]: value } });
  };

  const sendOTP = async () => {
    // Simulate OTP sending
    setOtpSent(true);
    // In real implementation, you would call your SMS service here
    console.log('Sending OTP to:', state.customerInfo.phone);
  };

  const verifyOTP = async () => {
    // Simulate OTP verification
    if (otp === '1234') { // Demo OTP
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      return true;
    }
    return false;
  };

  const placeOrder = async () => {
    const isVerified = await verifyOTP();
    if (isVerified) {
      setOrderPlaced(true);
      setStep(4);
      // In real implementation, you would send order to backend
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const deliveryFee = state.orderType === 'delivery' ? 3.50 : 0;
  const totalWithDelivery = state.total + deliveryFee;

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
          <Link
            to="/menu"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNumber ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-1 ${
                    step > stepNumber ? 'bg-red-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          /* Step 1: Order Review */
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Order</h2>
              
              <div className="space-y-4 mb-8">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-red-600 font-bold">€{item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded-md transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-gray-800 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded-md transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-1 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                  <span>Total:</span>
                  <span>€{state.total.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                >
                  Continue to Details
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          /* Step 2: Order Details */
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <button
                onClick={() => setStep(1)}
                className="flex items-center text-red-600 hover:text-red-700 mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Cart
              </button>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Details</h2>
              
              {/* Order Type Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleOrderTypeChange('pickup')}
                    className={`p-6 rounded-lg border-2 transition-colors ${
                      state.orderType === 'pickup'
                        ? 'border-red-600 bg-red-50 text-red-800'
                        : 'border-gray-300 hover:border-red-300'
                    }`}
                  >
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-bold">Pickup</h4>
                    <p className="text-sm text-gray-600">Ready in 2-3 hours</p>
                    <p className="text-sm font-bold text-green-600">Free</p>
                  </button>
                  
                  <button
                    onClick={() => handleOrderTypeChange('delivery')}
                    className={`p-6 rounded-lg border-2 transition-colors ${
                      state.orderType === 'delivery'
                        ? 'border-red-600 bg-red-50 text-red-800'
                        : 'border-gray-300 hover:border-red-300'
                    }`}
                  >
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-bold">Delivery</h4>
                    <p className="text-sm text-gray-600">Within 20km radius</p>
                    <p className="text-sm font-bold text-red-600">€3.50</p>
                  </button>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={state.customerInfo.name}
                      onChange={(e) => handleCustomerInfo('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={state.customerInfo.phone}
                      onChange={(e) => handleCustomerInfo('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your phone number"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">We'll send an OTP to verify your order</p>
                  </div>
                  
                  {state.orderType === 'delivery' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                      <textarea
                        value={state.customerInfo.address}
                        onChange={(e) => handleCustomerInfo('address', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="3"
                        placeholder="Enter your complete delivery address"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">Delivery within 20km of Munich city center</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>€{state.total.toFixed(2)}</span>
                  </div>
                  {state.orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>€{totalWithDelivery.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!state.customerInfo.name || !state.customerInfo.phone || 
                         (state.orderType === 'delivery' && !state.customerInfo.address)}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                Continue to Verification
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          /* Step 3: OTP Verification */
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <button
                onClick={() => setStep(2)}
                className="flex items-center text-red-600 hover:text-red-700 mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Details
              </button>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Verify Your Order</h2>
              
              <div className="text-center mb-8">
                <Phone className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-4">
                  We need to verify your phone number to confirm your order
                </p>
                <p className="text-sm text-gray-500">
                  Phone: {state.customerInfo.phone}
                </p>
              </div>

              {!otpSent ? (
                <button
                  onClick={sendOTP}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors mb-6"
                >
                  Send OTP
                </button>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP sent to your phone
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center text-2xl font-bold tracking-widest"
                    placeholder="1234"
                    maxLength="4"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Demo OTP: 1234 (In production, you'll receive a real OTP)
                  </p>
                  
                  <button
                    onClick={placeOrder}
                    disabled={otp.length !== 4}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors mt-4"
                  >
                    Verify & Place Order
                  </button>
                  
                  <button
                    onClick={() => setOtpSent(false)}
                    className="w-full text-red-600 hover:text-red-700 font-medium py-2 mt-2"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Final Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Order Type:</span>
                    <span className="capitalize font-medium">{state.orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Total:</span>
                    <span>€{state.total.toFixed(2)}</span>
                  </div>
                  {state.orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg text-red-600">
                    <span>Total Amount:</span>
                    <span>€{totalWithDelivery.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && orderPlaced && (
          /* Step 4: Order Confirmation */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your order. We've received your request and will prepare your delicious meal.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Order Details</h3>
                <div className="text-left space-y-2">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-bold">#EK{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span>{state.customerInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>{state.customerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{state.orderType}</span>
                  </div>
                  {state.orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Address:</span>
                      <span className="text-sm">{state.customerInfo.address}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold text-green-600">€{totalWithDelivery.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  {state.orderType === 'pickup' ? 'Pickup Information' : 'Delivery Information'}
                </h3>
                <p className="text-yellow-700">
                  {state.orderType === 'pickup' 
                    ? 'Your order will be ready for pickup in 2-3 hours. We\'ll call you when it\'s ready!'
                    : 'Your order will be delivered within 3-4 hours. Our delivery team will contact you before arrival.'
                  }
                </p>
                {state.orderType === 'pickup' && (
                  <p className="text-sm text-yellow-600 mt-2">
                    📍 Pickup Address: Marienplatz 15, 80331 München
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Link
                  to="/menu"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors mr-4"
                >
                  Order More
                </Link>
                <Link
                  to="/"
                  className="inline-block border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Order;