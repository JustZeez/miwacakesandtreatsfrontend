import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Banknote,
  Upload,
  ClipboardCheck,
  ArrowRight,
  Loader2,
  Copy,
} from "lucide-react";
import { toast } from "react-toastify";
import { orderAPI } from "../data/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart, total } = useCart();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    address: "",
    paymentProof: null,
  });

  const copyAccountNumber = () => {
    const accountNumber = "0280243025";
    navigator.clipboard.writeText(accountNumber);
    toast.success("Account Number copied to clipboard!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, paymentProof: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!termsAgreed)
      return toast.error("Please agree to the Terms & Conditions");
    if (cart.length === 0) return toast.error("Your cart is empty!");
    if (!formData.paymentProof)
      return toast.error("Please upload payment receipt");

    setLoading(true);

    const data = new FormData();
    data.append("customerName", formData.fullName);
    data.append("customerEmail", formData.email);
    data.append("phone", formData.whatsapp);
    data.append("whatsapp", formData.whatsapp);
    data.append("address", formData.address);
    data.append("paymentProof", formData.paymentProof);

    data.append("cartItems", JSON.stringify(cart));
    data.append("totalAmount", total);

    try {
      const response = await orderAPI.createOrder(data);

      if (response.data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/ordersuccess", {
          state: {
            orderId: response.data.order.orderId,
            customerName: formData.fullName,
          },
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.error || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-brand-cream/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-brand-dark text-white p-8 rounded-[40px] shadow-xl">
              <div className="flex items-center gap-3 mb-6 text-brand-rose">
                <Banknote size={28} />
                <h2 className="text-2xl font-display text-white">
                  Payment Information
                </h2>
              </div>

              <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-6">
                <p className="text-sm opacity-70 mb-1">Bank Name</p>
                <p className="font-bold text-lg mb-4">Wema Bank</p>

                <p className="text-sm opacity-70 mb-1">Account Number</p>
                <div
                  className="flex items-center justify-between bg-black/20 p-3 rounded-xl mb-4 group border border-white/5 hover:border-brand-rose transition-colors cursor-pointer"
                  onClick={copyAccountNumber}
                >
                  <p className="font-mono text-2xl font-bold text-brand-rose tracking-wider">
                    0280243025
                  </p>
                  <button
                    type="button"
                    className="text-white opacity-50 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy size={20} />
                  </button>
                </div>

                <p className="text-sm opacity-70 mb-1">Account Name</p>
                <p className="font-bold uppercase">
                  Agunbiade Oluwatumininu Glory
                </p>
              </div>

              <div className="p-4 bg-brand-rose/10 rounded-2xl border border-brand-rose/20 mb-6">
                <p className="text-brand-rose font-bold text-center text-xl">
                  Total to Pay: ₦{(total || 0).toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 text-sm opacity-80 leading-relaxed">
                <p className="flex gap-2 font-bold text-brand-rose italic">
                  ⚠️ Important: Payment validates order.
                </p>
                <p className="flex gap-2">
                  <span>1.</span> Transfer total amount to the account above.
                </p>
                <p className="flex gap-2">
                  <span>2.</span> Take a screenshot of your receipt.
                </p>
                <p className="flex gap-2">
                  <span>3.</span> Upload proof below to get your Order ID.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-brand-pink/20">
            <div className="flex items-center gap-3 mb-8">
              <span className="p-3 bg-brand-rose/10 rounded-2xl text-brand-rose">
                <ClipboardCheck size={28} />
              </span>
              <h2 className="text-2xl font-display text-brand-dark">
                Order Details
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-5 py-4 rounded-2xl border border-brand-pink/20 focus:outline-none focus:border-brand-rose bg-brand-cream/5 text-brand-dark"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-4 rounded-2xl border border-brand-pink/20 focus:outline-none focus:border-brand-rose bg-brand-cream/5 text-brand-dark"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="WhatsApp Number"
                required
                className="w-full px-5 py-4 rounded-2xl border border-brand-pink/20 focus:outline-none focus:border-brand-rose bg-brand-cream/5 text-brand-dark"
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
              />

              <textarea
                placeholder="Delivery Address"
                required
                rows="3"
                className="w-full px-5 py-4 rounded-2xl border border-brand-pink/20 focus:outline-none focus:border-brand-rose bg-brand-cream/5 text-brand-dark"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              ></textarea>

              <div className="relative group">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-pink/40 rounded-2xl cursor-pointer hover:bg-brand-pink/5 transition-all">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="h-full w-full object-contain p-2 rounded-2xl"
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-brand-rose mb-2" />
                      <span className="text-sm font-medium text-gray-500 text-center px-4">
                        Upload Payment Receipt
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    required
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="flex items-start gap-3 px-2 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-5 h-5 accent-brand-rose rounded"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-tight"
                >
                  I agree to the{" "}
                  <Link
                    to="/termsandconditions"
                    className="text-brand-rose font-bold underline"
                  >
                    Terms & Conditions
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !termsAgreed}
                className="w-full bg-brand-rose text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-lg text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Submit Order <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
