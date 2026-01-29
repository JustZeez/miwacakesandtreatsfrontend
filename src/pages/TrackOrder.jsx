import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Package } from "lucide-react";
import { toast } from "react-toastify";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      toast.error("Please enter your Order ID");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your Phone Number");
      return;
    }

    setLoading(true);

    const encodedOrderId = encodeURIComponent(orderId.trim());
    const encodedPhone = encodeURIComponent(phone.trim());

    navigate(`/tracking/${encodedOrderId}/${encodedPhone}`);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your Order ID and Phone Number to track your treats
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-100">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., 1225-290126-AZEEZ-69"
                  className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Package className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., 09020244367"
                  className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Track Order
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                <span className="font-bold">Note:</span> Both fields are
                required to track your order. Use the exact Order ID and Phone
                Number provided during checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Example Order ID format:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              1225-290126-AZEEZ-69
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;  
