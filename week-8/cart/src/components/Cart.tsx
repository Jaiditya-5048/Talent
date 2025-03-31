import React from 'react';
import { useCart } from './CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className='fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4'>
      <h2 className='text-lg font-bold'>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className='flex justify-between items-center border-b py-2'>
            <img src={item.images[0]} alt={item.title} className='w-10 h-10' />
            <div className='flex-1 ml-2'>
              <p className='text-sm'>{item.title}</p>
              <p className='text-sm font-bold'>${item.price}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className='text-red-500 text-sm'>
              ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
