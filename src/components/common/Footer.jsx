import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Heart, Music2 } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="font-display text-2xl italic text-brand-pink">Miwa</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting sweet memories with premium ingredients and a sprinkle of
            love in every bite. Your number one destination for cakes and
            treats.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://www.tiktok.com/@miwa_cakesndtreats?_r=1&_t=ZS-92dNVIjha09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-brand-rose hover:border-brand-rose transition-all text-white"
              title="Follow Miwa on TikTok"
            >
              <Music2 size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6">
            Quick Link
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link
                to="/treats"
                className="hover:text-brand-pink transition-colors"
              >
                Treats
              </Link>
            </li>
            <li>
              <Link
                to="/training"
                className="hover:text-brand-pink transition-colors"
              >
                Baking Courses
              </Link>
            </li>
            <li>
              <Link
                to="/termsandconditions"
                className="hover:text-brand-pink transition-colors"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacyandpolicy"
                className="hover:text-brand-pink transition-colors"
              >
                Privacy and Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6">
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-rose shrink-0" />
              <span>Ogbomosho, Oyo, Nigeria</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-rose shrink-0" />
              <span>+234 815 668 6247</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6">
            Opening Hours
          </h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li className="flex justify-between">
              <span>Mon - Sun:</span> <span>7 AM - 6 PM</span>
            </li>
            <li className="flex justify-between border-t border-gray-800 pt-2 mt-2">
              <span className="text-[10px] text-brand-pink italic">
                Production starts at sunrise!
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-[12px] text-gray-500 tracking-widest uppercase">
        <p className="flex items-center justify-center gap-1">
          Designed with{" "}
          <Heart size={12} className="text-brand-rose fill-brand-rose" /> for
          Miwa Cakes & Treats
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
