// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import { Navbar } from '../componets/common/Navbar'
// import { Footer } from '../componets/common/Footer'
// import Treats from '../pages/Treats'
// import Home from '../pages/Home'
// import Contact from '../pages/Contact'
// import Products from '../pages/Products'
// import ReviewsPage from '../pages/ReviewsPage'
// import Checkout from '../pages/Checkout'
// import OrderSuccess from '../pages/OrderSuccess'
// import PrivacyandPolicy from '../pages/PrivacyandPolicy'
// import TermsAndConditions from '../pages/TermsAndConditions'
// import { CartProvider } from '../context/CartContext'
// import CartDrawer from '../componets/cart/CartDrawer'
// import Training from '../pages/Training'
// import FloatingWhatsApp from '../componets/FloatingWhatsApp'
// import AdminDashboard from '../pages/AdminDashboard'
// import AdminLogin from '../pages/AdminLogin'
// import ProtectedRoute from '../componets/ProtectedRoute'
// export default function AppRoutes() {
//   return (
//     <CartProvider> 
//       <Navbar />
//       <CartDrawer /> 
//       <main className="min-h-screen">
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/treats' element={<Treats />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/product/:id' element={<Products />} />
//           <Route path='/reviews' element={<ReviewsPage />} />
//           <Route path='/checkout' element={<Checkout />} />
//           <Route path='/ordersuccess' element={<OrderSuccess />} />
//           <Route path='/termsandconditions' element={<TermsAndConditions />} />
//           <Route path='/privacyandpolicy' element={<PrivacyandPolicy />} />
//           <Route path='/training' element={<Training />} />
//           <Route path='/admin/login' element={<AdminLogin />} />
//           <ProtectedRoute><AdminDashboard /></ProtectedRoute>
//           <Route path='/admin' element={<AdminDashboard />} />
//         </Routes>
//       </main>
//       <FloatingWhatsApp/>
//       <Footer />
//     </CartProvider>
//   )
// }
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../componets/common/Navbar'
import { Footer } from '../componets/common/Footer'
import Treats from '../pages/Treats'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Products from '../pages/Products'
import ReviewsPage from '../pages/ReviewsPage'
import Checkout from '../pages/Checkout'
import OrderSuccess from '../pages/OrderSuccess'
import PrivacyandPolicy from '../pages/PrivacyandPolicy'
import TermsAndConditions from '../pages/TermsAndConditions'
import { CartProvider } from '../context/CartContext'
import CartDrawer from '../componets/cart/CartDrawer'
import Training from '../pages/Training'
import FloatingWhatsApp from '../componets/FloatingWhatsApp'
import AdminDashboard from '../pages/AdminDashboard'
import AdminLogin from '../pages/AdminLogin'
import ProtectedRoute from '../componets/ProtectedRoute'
import TrackOrder from '../pages/TrackOrder'

export default function AppRoutes() {
  return (
    <CartProvider> 
      <Navbar />
      <CartDrawer /> 
      <main className="min-h-screen">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/treats' element={<Treats />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:id' element={<Products />} />
          <Route path='/reviews' element={<ReviewsPage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/ordersuccess' element={<OrderSuccess />} />
          <Route path='/termsandconditions' element={<TermsAndConditions />} />
          <Route path='/privacyandpolicy' element={<PrivacyandPolicy />} />
          <Route path='/training' element={<Training />} />
          <Route path='/trackorder' element={<TrackOrder />} />
          
          {/* Admin Routes */}
          <Route path='/admin/login' element={<AdminLogin />} />
          
          {/* This is the CORRECT way to use ProtectedRoute */}
          <Route path='/admin' element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Remove this duplicate route - it's causing conflicts */}
          {/* <Route path='/admin' element={<AdminDashboard />} /> */}
        </Routes>
      </main>
      <FloatingWhatsApp/>
      <Footer />
    </CartProvider>
  )
}