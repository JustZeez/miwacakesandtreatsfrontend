import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import Treats from "../pages/Treats";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import ReviewsPage from "../pages/ReviewsPage";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import PrivacyandPolicy from "../pages/PrivacyandPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/cart/CartDrawer";
import Training from "../pages/Training";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import TrackOrder from "../pages/TrackOrder";
import TrackingResult from "../pages/Tracking";
import AddProduct from "../pages/AddProduct";
import UnavailableProducts from "../pages/UnavailableProducts";

export default function AppRoutes() {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treats" element={<Treats />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacyandpolicy" element={<PrivacyandPolicy />} />
          <Route path="/training" element={<Training />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/tracking/:orderId/:phone" element={<TrackingResult />} />
          <Route path="/coming-soon" element={<UnavailableProducts />} />
          <Route path="/unavailable" element={<UnavailableProducts />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
          <Route path="/admin/addproduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>}/>
        </Routes>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </CartProvider>
  );
}
