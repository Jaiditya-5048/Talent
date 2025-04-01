import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing_page';
import ProductPage from './pages/ProductPage';
// import CartPage from './pages/CartPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nav from './components/nav';
import { CartProvider } from './components/CartContext';

const AppRoutes: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          {/* <Route path='/cart' element={<CartPage />} /> */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default AppRoutes;

// // import LandingPage  from './pages/landing_page';
// import './App.css';
// // import Auth from './pages/Auth';
// // import Sign_in_up from './pages/Sign_in_up';
// import ProductPage from './pages/ProductPage';
// import { CartProvider } from './components/CartContext';

// function App() {

//   return (
//     <>
//       {/* <Auth /> */}
//       {/* <Sign_in_up /> */}
//       <CartProvider>
//         <ProductPage />
//       </CartProvider>
//     </>
//   );
// }

// export default App;
