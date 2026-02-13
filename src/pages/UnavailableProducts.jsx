import React, { useState, useEffect } from "react";
import { Package, Clock, Trash2, X } from "lucide-react";
import { orderAPI, adminAPI } from "../data/api";
import { toast } from "react-toastify";

const UnavailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await orderAPI.getProducts();

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error("Could not load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
    setDeletePassword("");
  };

  const handleDeleteConfirm = async () => {
    if (!deletePassword.trim()) {
      toast.error("Please enter the admin password");
      return;
    }

    setDeleteLoading(true);

    const originalToken = localStorage.getItem("adminToken");
    localStorage.setItem("adminToken", deletePassword);

    try {
      await adminAPI.deleteProduct(deleteProductId);
      toast.success("Product deleted successfully");

      setProducts((prev) => prev.filter((p) => p._id !== deleteProductId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete product. Check password.",
      );
    } finally {
      if (originalToken) {
        localStorage.setItem("adminToken", originalToken);
      } else {
        localStorage.removeItem("adminToken");
      }
      setDeleteLoading(false);
      setDeletePassword("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <Clock className="w-8 h-8 text-pink-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Coming Soon</h1>
          <p className="text-gray-600 text-lg">
            Check out these delicious treats that will be available soon!
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products yet
            </h3>
            <p className="text-gray-500">New treats will be added here soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition relative"
              >
                <button
                  onClick={() => handleDeleteClick(product._id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  title="Delete product (admin only)"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>

                <div className="h-56 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-pink-600">
                      ₦{product.price?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-800 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Not Available Right Now</span>
                  </div>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    Check back soon for availability!
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowDeleteModal(false)}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Admin Verification
              </h3>
              <p className="text-gray-600 mb-6">
                Enter the admin password to delete this product.
              </p>

              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-4"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                  className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition disabled:opacity-50"
                >
                  {deleteLoading ? "Deleting..." : "Delete Product"}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnavailableProducts;
