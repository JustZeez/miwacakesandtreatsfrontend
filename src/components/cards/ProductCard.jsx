import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart } = useCart();

  const variants = product.variants || [];
  const hasVariants = variants.length > 0;

  useEffect(() => {
    if (!hasVariants) return;
    const speed = isHovered ? 1500 : 3000;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % variants.length);
    }, speed);
    return () => clearInterval(interval);
  }, [isHovered, hasVariants, variants.length]);

  const displayData = hasVariants ? variants[index] : product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const itemToOrder = {
      _id: hasVariants ? `${product.id}-${index}` : product.id.toString(),
      name: product.name,
      price: displayData.price,
      image: displayData.image,
      quantity: 1,
    };

    addToCart(itemToOrder);

    toast.success(`${product.name} added to cart! 🍰`, {
      position: "bottom-center",
      autoClose: 1500,
    });
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-pink flex flex-col group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIndex(0);
      }}
    >
      <Link
        to={`/product/${product.id}`}
        className="relative h-72 overflow-hidden block"
      >
        <img
          src={displayData.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
        />

        {hasVariants && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {variants.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === index ? "bg-white w-6" : "bg-white/40 w-1.5"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 p-3 rounded-full text-brand-rose shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
            <Eye size={20} />
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
          <span className="text-xs font-bold text-brand-dark">4.9</span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-display font-bold text-brand-dark leading-tight group-hover:text-brand-rose transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="text-right">
            <span className="text-brand-rose font-bold block text-lg transition-all duration-300">
              ₦{Number(displayData.price).toLocaleString()}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10 italic transition-opacity duration-300">
          {displayData.description}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-auto bg-brand-pink/50 hover:bg-brand-rose text-brand-rose hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to Order
        </button>
      </div>
    </div>
  );
}
