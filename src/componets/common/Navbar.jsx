import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, GraduationCap, Star, Cake, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const cartCount = cart.length;

  const navLinks = [
    { name: "Home", path: "/", icon: <Cake size={18} /> },
    { name: "Treats", path: "/treats", icon: <Cake size={18} /> },
    { name: "Training", path: "/training", icon: <GraduationCap size={18} /> },
    { name: "Reviews", path: "/reviews", icon: <Star size={18} /> },
    { name: "Orders", path: "/admin/login", icon: <Star size={18} /> },
    { name: "Track Order", path: "/trackorder", icon: <Package size={18} /> },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-brand-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-bold text-brand-rose italic">
              Miwa
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">
              Cakes & Treats
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-brand-dark hover:text-brand-rose font-medium transition-colors duration-300 text-sm tracking-wide"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-brand-pink rounded-full text-brand-rose hover:scale-110 transition-transform focus:outline-none"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-rose focus:outline-none"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold w-2.5 h-2.5 rounded-full border-2 border-white"></span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-pink/30 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-4 text-brand-dark border-b border-brand-pink/10 last:border-0"
                >
                  <span className="text-brand-rose/60">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
