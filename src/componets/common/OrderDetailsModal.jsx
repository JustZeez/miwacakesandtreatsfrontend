// components/OrderDetailsModal.jsx
import React from 'react';
import { X, User, Mail, Phone, MapPin, Package, DollarSign, Calendar, FileImage } from 'lucide-react';

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <p className="text-gray-500">ID: {order.orderId}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {order.customerEmail}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {order.phone}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {order.whatsapp}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                    <p className="font-medium flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      {order.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Order Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold">₦{order.subtotal?.toLocaleString()}</span>
                  </div>
                  
                  {order.vat > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT:</span>
                      <span className="font-bold">₦{order.vat?.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <span className="text-gray-900 font-bold">Total:</span>
                    <span className="text-xl font-bold text-emerald-600">
                      ₦{order.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Order Items */}
              <div className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-xl border border-amber-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({order.cartItems?.length || 0})
                </h3>
                
                <div className="space-y-3">
                  {order.cartItems?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ₦{item.price?.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-bold">₦{(item.price * item.quantity)?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Proof */}
              <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <FileImage className="w-5 h-5" />
                  Payment Proof
                </h3>
                
                <div className="space-y-3">
                  <img 
                    src={order.paymentProofUrl} 
                    alt="Payment Proof" 
                    className="w-full h-auto rounded-lg border"
                    onClick={() => window.open(order.paymentProofUrl, '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                  <button 
                    onClick={() => window.open(order.paymentProofUrl, '_blank')}
                    className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                  >
                    View Full Image
                  </button>
                </div>
              </div>

              {/* Status Update */}
              <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Update Status</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status
                    </label>
                    <select 
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">✅ Confirmed</option>
                      <option value="preparing">👨‍🍳 Preparing</option>
                      <option value="on delivery">🚚 On Delivery</option>
                      <option value="delivered">🎉 Delivered</option>
                    </select>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Order placed: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => window.open(order.paymentProofUrl, '_blank')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;