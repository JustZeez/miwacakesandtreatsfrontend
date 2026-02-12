import React from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  ShoppingCart,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "preparing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "pending":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "on delivery":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "confirmed":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">
                Order #{order.orderId || order.id}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Customer Info & Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information Card */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-pink-600" />
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">
                          {order.customerName || order.customer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-gray-900">
                          {order.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">
                          {order.email || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-gray-900">
                          {order.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(order.createdAt || order.time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Payment:</span>
                        <span
                          className={`font-medium ${
                            order.paymentStatus === "paid"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {order.paymentStatus?.toUpperCase() || "PENDING"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Card - FIXED TO SHOW PRODUCTS */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-pink-600" />
                    Order Items ({order.cartItems?.length || order.items?.length || 0})
                  </h4>
                  
                  <div className="space-y-4">
                    {(order.cartItems || order.items || []).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="w-8 h-8 text-pink-500" />
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              {item.name}
                            </h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-gray-600">
                                Qty: {item.quantity}
                              </span>
                              <span className="text-sm text-gray-600">
                                ₦{item.price?.toLocaleString()}
                              </span>
                              {item.size && (
                                <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full">
                                  {item.size}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900">
                            ₦{(item.price * item.quantity)?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₦{order.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Status & Payment Proof */}
              <div className="space-y-6">
                {/* Order Status Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-pink-600" />
                    Order Status
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status?.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Update Status
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                      >
                        <option value="pending">🟡 Pending</option>
                        <option value="confirmed">🟣 Confirmed</option>
                        <option value="preparing">🟠 Preparing</option>
                        <option value="on delivery">🔵 On Delivery</option>
                        <option value="delivered">🟢 Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Proof Card */}
                {order.paymentProof && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-pink-600" />
                      Payment Proof
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <img
                          src={order.paymentProof}
                          alt="Payment Proof"
                          className="w-full h-48 object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(order.paymentProof, "_blank")}
                        />
                      </div>
                      <button
                        onClick={() => window.open(order.paymentProof, "_blank")}
                        className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
                      >
                        View Full Image
                      </button>
                    </div>
                  </div>
                )}

                {/* Delivery Info Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-pink-600" />
                    Delivery Details
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {order.deliveryType || "Standard"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="font-medium text-gray-900">
                        ₦{order.deliveryFee?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated:</span>
                      <span className="font-medium text-gray-900">
                        {order.estimatedDelivery || "1-3 business days"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;