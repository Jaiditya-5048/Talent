import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../utils/types';
// Define product type

// Define cart context type
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  addQuantity: (Product: Product) => void;
  subtractQuantity: (Product: Product) => void;
  
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

 
  const addToCart = (product: Product) => {
    // Clone the product to avoid mutating original reference
    const productWithQuantity = {
      ...product,
      quantity: product.quantity ?? 1, // if undefined or null, set to 1
    };

    setCart((prevCart) => [...prevCart, productWithQuantity]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const subtractQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item))
        // Remove items with quantity 0
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, addQuantity, subtractQuantity }}
    >
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
