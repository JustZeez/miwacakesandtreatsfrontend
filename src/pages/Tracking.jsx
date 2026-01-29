import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../data/api';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBox, FaShoppingCart, FaCheckCircle, FaClock, FaTruck, FaHome } from 'react-icons/fa';

const TrackingResult = () => {
  const { orderId, phone } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.trackOrder(orderId, phone);
      setOrder(response.data);
      setError('');
    } catch (err) {
      setError('Order not found. Please check your Order ID and Phone Number.');
      console.error('Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'preparing':
        return <FaBox className="text-yellow-500 text-2xl" />;
      case 'delivered':
        return <FaTruck className="text-blue-500 text-2xl" />;
      default:
        return <FaClock className="text-gray-500 text-2xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-solid mx-auto"></div>
          <p className="mt-4 text-gray-600">Tracking your order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to find your order details.'}</p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/track')}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition duration-300"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-pink-500 text-pink-500 py-3 rounded-xl font-semibold hover:bg-pink-50 transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Your Order Details
          </h1>
          <p className="text-gray-600">Order ID: <span className="font-semibold">{order.orderId}</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Order Summary */}
          <div className="md:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaBox className="text-pink-500" />
                  Order Status
                </h2>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
              
              {/* Status Timeline */}
              <div className="relative pt-8">
                <div className="absolute left-0 top-0 w-full h-1 bg-gray-200"></div>
                
                <div className="flex justify-between">
                  {['pending', 'confirmed', 'preparing', 'delivered'].map((step, index) => (
                    <div key={step} className="flex flex-col items-center relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 mb-2 ${
                        index <= getStatusIndex(order.status) 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {getStatusIcon(step)}
                      </div>
                      <span className="text-xs font-medium text-gray-600 capitalize">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaShoppingCart className="text-pink-500" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center">
                        <FaBox className="text-pink-500 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₦{item.price?.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total: ₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-pink-600">
                    ₦{order.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Info */}
          <div className="space-y-6">
            {/* Customer Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-pink-500" />
                Customer Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-800">{order.customerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaPhone className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-semibold text-gray-800">{order.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold text-gray-800">{order.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-semibold text-gray-800">{order.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBox className="text-pink-500" />
                Order Information
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">{order.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Type:</span>
                  <span className="font-semibold capitalize">{order.deliveryType}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-lg p-6">
              <h3 className="text-white font-bold text-lg mb-4">Need Help?</h3>
              <p className="text-white text-sm mb-6">
                Questions about your order? Our support team is here to help!
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-pink-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition duration-300">
                  Contact Support
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full border border-white text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for status timeline
const getStatusIndex = (status) => {
  const statuses = ['pending', 'confirmed', 'preparing', 'delivered'];
  return statuses.indexOf(status?.toLowerCase()) || 0;
};

export default TrackingResult;