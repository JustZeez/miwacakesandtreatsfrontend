import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { cart, removeFromCart, subtotal, vat, total, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-brand-pink/20">
          <h2 className="text-xl font-display font-bold flex items-center gap-2 text-brand-dark">
            <ShoppingBag className="text-brand-rose" /> Your Basket
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-brand-pink rounded-full transition-colors"
          >
            <X size={24} className="text-brand-dark" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-brand-pink rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-brand-rose opacity-50" />
              </div>
              <p className="text-gray-500 font-medium">
                Your cart is empty.
                <br />
                Add some treats! 🎂
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-brand-rose font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b border-brand-pink/10 pb-6 last:border-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-brand-pink/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-brand-dark leading-tight">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors pl-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-brand-rose font-bold mt-1">
                      ₦{item.price.toLocaleString()}
                      {item.quantity > 1 && (
                        <span className="text-gray-400 text-sm font-normal ml-2">
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


{cart.length > 0 && (
  <div className="p-6 border-t border-brand-pink/20 bg-gray-50 space-y-4">
    {/* Add VAT display */}
    <div className="space-y-2">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal:</span>
        <span>₦{subtotal.toLocaleString()}</span>
      </div>
      
      {vat > 0 && (
        <>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">VAT (orders above ₦10,000):</span>
            <span>₦{vat.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-400 italic">
            ₦50 VAT applied to orders above ₦10,000
          </div>
        </>
      )}
      
      <div className="flex justify-between text-lg font-bold text-brand-dark pt-2 border-t border-brand-pink/20">
        <span>Total Amount:</span>
        <span className="text-brand-rose text-2xl">
          ₦{total.toLocaleString()}
        </span>
      </div>
    </div>

    <button
      onClick={() => {
        setIsCartOpen(false);
        navigate("/checkout");
      }}
      className="w-full bg-brand-rose text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg active:scale-[0.98]"
    >
      Proceed to Checkout <ArrowRight size={20} />
    </button>

    <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
      Freshly made by Miwa Cakes & Treats
    </p>
  </div>
)}
      </div>
    </div>
  );
}
