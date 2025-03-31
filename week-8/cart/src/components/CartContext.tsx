import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define product type
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

// Define cart context type
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
