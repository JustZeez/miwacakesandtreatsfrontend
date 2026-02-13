import React, { useState } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/cards/ProductCard";
import { Link } from "react-router-dom";
import { Package, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

export default function Treats() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-brand-cream/20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-brand-rose mb-4">
          Our Menu
        </h1>
        <p className="text-brand-dark/70 max-w-2xl mx-auto">
          Freshly baked treats, chilled drinks, and luxury cakes crafted for
          your special moments.
        </p>
      </div>

      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md py-4 rounded-2xl shadow-sm mb-12">
        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition ml-1"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-brand-rose" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-1 mx-12 px-2"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((cat, index) => (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0
                    ${
                      activeCategory === cat
                        ? "bg-brand-rose border-brand-rose text-white shadow-lg scale-105"
                        : "border-brand-rose/20 text-brand-rose hover:border-brand-rose bg-white"
                    }`}
                >
                  {cat}
                </button>

                {index < categories.length - 1 && (
                  <div className="flex items-center">
                    <div className="w-px h-6 bg-gradient-to-b from-transparent via-brand-rose/30 to-transparent mx-1"></div>
                  </div>
                )}
              </React.Fragment>
            ))}

            <div className="flex items-center mx-2">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"></div>
            </div>

            <Link
              to="/coming-soon"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white bg-amber-50 hover:scale-105 hover:shadow-lg"
            >
              <Package className="w-4 h-4" />
              Out of Stock
            </Link>
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition mr-1"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-brand-rose" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 font-display italic">
            No treats found in this category yet...
          </p>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
