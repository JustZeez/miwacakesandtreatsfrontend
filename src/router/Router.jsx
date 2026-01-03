// import React from 'react'
// import {  Route, Routes } from 'react-router-dom'
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

// export default function Router() {
//   return (
//     <CartProvider> 
//         <Navbar />
//         <CartDrawer /> 
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
//         </Routes>
//         <Footer />
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

export default function Router() {
  return (
    <CartProvider> 
      <Navbar />
      <CartDrawer /> 
      {/* Ensure all logic that uses routing hooks stays inside the BrowserRouter context provided in main.jsx */}
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
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}