// import React, { useState } from "react";
// import { products, categories } from "../data/products";
// import ProductCard from "../componets/cards/ProductCard";

// export default function Treats() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProducts =
//     activeCategory === "All"
//       ? products
//       : products.filter((item) => item.category === activeCategory);

//   return (
//     <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-brand-cream/20">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-display text-brand-rose mb-4">
//           Our Menu
//         </h1>
//         <p className="text-brand-dark/70 max-w-2xl mx-auto">
//           Freshly baked treats, chilled drinks, and luxury cakes crafted for
//           your special moments.
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-20 z-40 bg-white/50 backdrop-blur-md py-4 rounded-full px-2">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium
//               ${
//                 activeCategory === cat
//                   ? "bg-brand-rose border-brand-rose text-white shadow-lg scale-105"
//                   : "border-brand-rose/20 text-brand-rose hover:border-brand-rose bg-white"
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <div className="text-center py-20">
//           <p className="text-xl text-gray-400 font-display italic">
//             No treats found in this category yet...
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../componets/cards/ProductCard";
import { Link } from "react-router-dom";
import { PackageX } from "lucide-react"; // Add this import

export default function Treats() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  // Add "Out of Stock" to the categories for display
  const displayCategories = [...categories, "Out of Stock"];

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

      <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-20 z-40 bg-white/50 backdrop-blur-md py-4 rounded-full px-2">
        {displayCategories.map((cat) => {
          // Special handling for "Out of Stock" category
          if (cat === "Out of Stock") {
            return (
              <Link
                key="out-of-stock"
                to="/coming-soon"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium border-amber-500/30 text-amber-600 hover:border-amber-500 bg-white hover:bg-amber-50 hover:scale-105"
              >
                <PackageX className="w-4 h-4" />
                {cat}
              </Link>
            );
          }

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium
                ${
                  activeCategory === cat
                    ? "bg-brand-rose border-brand-rose text-white shadow-lg scale-105"
                    : "border-brand-rose/20 text-brand-rose hover:border-brand-rose bg-white"
                }`}
            >
              {cat}
            </button>
          );
        })}
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
    </div>
  );
}