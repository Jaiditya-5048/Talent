import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import LandingPage from './pages/landing_page';
import ProductPage from './pages/ProductPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Cart_page from './pages/Cart_page';

const AppRoutes: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/Cart' element={<Cart_page />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default AppRoutes;