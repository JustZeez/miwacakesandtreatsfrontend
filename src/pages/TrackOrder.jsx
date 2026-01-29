import React, { useState } from "react";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Loader,
  AlertCircle,
} from "lucide-react";
import { orderAPI } from "../data/api";
import { toast } from "react-toastify";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const statusConfig = {
    pending: {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-100 text-amber-800",
      label: "Pending",
      description: "Order received, waiting for confirmation",
    },
    confirmed: {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-100 text-blue-800",
      label: "Confirmed",
      description: "Order confirmed, preparing your treats",
    },
    preparing: {
      icon: <Package className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100 text-purple-800",
      label: "Preparing",
      description: "Your treats are being prepared with love",
    },
    "on delivery": {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      color: "bg-green-100 text-green-800",
      label: "On Delivery",
      description: "Your order is on its way to you",
    },
    delivered: {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-100 text-emerald-800",
      label: "Delivered",
      description: "Order delivered successfully",
    },
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    if (!orderId.trim() || !phone.trim()) {
      toast.error("Please enter Order ID and Phone Number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await orderAPI.trackOrder(orderId, phone);

      if (response.data) {
        setOrder(response.data);
        toast.success("Order found!");
      } else {
        setError("Order not found. Please check your details.");
        setOrder(null);
      }
    } catch (error) {
      console.error("Tracking error:", error);
      setError(
        error.response?.data?.message ||
          "Order not found. Please check your details.",
      );
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  if (order?.status === "delivered") {
    return (
      <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-200">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-emerald-700 mb-4">
              Order Delivered Successfully! 🎉
            </h1>
            <p className="text-gray-600 mb-8">
              Your order has been delivered and is no longer available for
              tracking. Thank you for choosing Miwa Cakes!
            </p>
            <button
              onClick={() => {
                setOrder(null);
                setOrderId("");
                setPhone("");
              }}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
            >
              Track Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your Order ID and Phone Number to track your treats
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-100 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your Order ID (e.g., ORD-ABC123)"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter the phone number used for order"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">{error}</p>
              <p className="text-sm text-red-600 mt-1">
                Please check your Order ID and Phone Number and try again
              </p>
            </div>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="text-gray-500">ID: {order.orderId}</p>
              </div>
              <div
                className={`px-4 py-2 rounded-full font-bold ${statusConfig[order.status]?.color}`}
              >
                {statusConfig[order.status]?.label}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-bold text-lg text-gray-900 mb-6">
                Order Progress
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {[
                  "pending",
                  "confirmed",
                  "preparing",
                  "on delivery",
                  "delivered",
                ].map((status, index) => {
                  const isCompleted = getStatusIndex(order.status) >= index;
                  const isCurrent = order.status === status;

                  return (
                    <div
                      key={status}
                      className="relative flex items-start mb-8"
                    >
                      <div
                        className={`z-10 w-16 h-16 rounded-full flex items-center justify-center ${isCompleted ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-200"}`}
                      >
                        {isCompleted ? (
                          statusConfig[status]?.icon
                        ) : (
                          <div className="w-6 h-6"></div>
                        )}
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4
                            className={`font-bold text-lg ${isCompleted ? "text-gray-900" : "text-gray-400"}`}
                          >
                            {statusConfig[status]?.label}
                          </h4>
                          {isCurrent && (
                            <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p
                          className={`${isCompleted ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {statusConfig[status]?.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{order.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold">
                      ₦{order.subtotal?.toLocaleString()}
                    </span>
                  </div>
                  {order.vat > 0 && (
                    <div className="flex justify-between">
                      <span>VAT:</span>
                      <span className="font-bold">
                        ₦{order.vat?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-300 flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="text-xl font-bold text-pink-600">
                      ₦{order.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.cartItems?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} × {item.name}
                        </span>
                        <span>
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Need help? Contact us on WhatsApp:{" "}
                <span className="font-bold text-pink-600">
                  +234 123 456 7890
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusIndex = (status) => {
  const statusOrder = [
    "pending",
    "confirmed",
    "preparing",
    "on delivery",
    "delivered",
  ];
  return statusOrder.indexOf(status);
};

export default TrackOrder;
