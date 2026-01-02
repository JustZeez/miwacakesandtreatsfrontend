import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { ArrowLeft, ShoppingCart, CheckCircle, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Products() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/10">
        <div className="text-center">
          <h2 className="text-2xl font-display text-brand-dark mb-4">
            Treat not found!
          </h2>
          <Link
            to="/treats"
            className="text-brand-rose hover:underline font-bold"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  const hasVariants = product.variants && product.variants.length > 0;
  const currentData = hasVariants ? product.variants[selectedVariant] : product;

  const displayPrice =
    Number(currentData?.price) || Number(product?.price) || 0;

  const handleAddToOrder = () => {
    const variantLabel = hasVariants ? ` - Option ${selectedVariant + 1}` : "";

    const itemToOrder = {
      _id: hasVariants
        ? `${product.id}-${selectedVariant}`
        : product.id.toString(),
      name: `${product.name}${variantLabel}`,
      price: displayPrice,
      image: currentData?.image || product?.image,
      category: product.category,
      quantity: 1,
    };

    addToCart(itemToOrder);

    toast.success(`${itemToOrder.name} added to your basket! 🍰`, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link
          to="/treats"
          className="flex items-center gap-2 text-brand-rose mb-8 hover:underline font-bold w-fit transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={20} /> Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-brand-pink/20 h-[400px] md:h-[550px] bg-brand-cream/5">
              <img
                src={currentData?.image || product?.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
            </div>

            {hasVariants && (
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(idx)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedVariant === idx
                        ? "border-brand-rose scale-110 shadow-lg ring-4 ring-brand-rose/10"
                        : "border-brand-pink/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={variant.image}
                      className="w-full h-full object-cover"
                      alt={`${product.name} variant ${idx}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 lg:pl-6">
            <div>
              <div className="inline-block px-4 py-1 bg-brand-rose/10 rounded-full text-brand-rose font-bold text-xs uppercase tracking-widest mb-4">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-display text-brand-dark leading-tight">
                {product.name}
              </h1>

              <p className="text-4xl font-bold text-brand-rose mt-6 flex items-baseline gap-2">
                <span className="text-2xl font-sans font-medium">₦</span>
                {displayPrice.toLocaleString()}
              </p>
            </div>

            <div className="bg-brand-cream/10 p-6 rounded-[32px] border border-brand-pink/10">
              <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {currentData?.description || product?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-2">
              <div className="flex items-center gap-3 text-sm font-medium text-brand-dark/80">
                <span className="p-2 bg-brand-rose/10 rounded-lg text-brand-rose">
                  <CheckCircle size={18} />
                </span>
                Handcrafted Fresh
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-brand-dark/80">
                <span className="p-2 bg-brand-rose/10 rounded-lg text-brand-rose">
                  <Truck size={18} />
                </span>
                Priority Delivery
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToOrder}
                className="flex-[2] bg-brand-rose text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand-rose/20 active:scale-95 text-lg"
              >
                <ShoppingCart size={22} /> Add to Order
              </button>

              <Link
                to="/contact"
                className="flex-1 border-2 border-brand-rose text-brand-rose py-5 rounded-2xl font-bold text-center hover:bg-brand-rose hover:text-white transition-all active:scale-95"
              >
                Customize
              </Link>
            </div>

            <p className="text-center text-gray-400 text-sm italic">
              Orders placed now are processed within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
