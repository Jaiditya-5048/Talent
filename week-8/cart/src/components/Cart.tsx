import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCart } from './CartContext';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../utils/types';

const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, removeFromCart, addQuantity, subtractQuantity } = useCart();

  // Recalculate total price whenever the cart changes
  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  function handleAdd(item: Product) {
    addQuantity(item);
  }

  function handleSubtract(item: Product) {
    subtractQuantity(item);
  }

  return (
    <div className='w-dvw h-lvh flex justify-center text-black'>
      <div className='w-full shadow-lg p-4 mb'>
        <h2 className='text-3xl font-bold'>🛒 Cart</h2>

        <div className='flex flex-col'>
          <div className='grid grid-cols-5 mt-5 border-b p-3'>
            <div>
              <p className='pl-3'>Item</p>
            </div>
            <div>
              <p className='pl-3'>Price</p>
            </div>
            <div>
              <p className='pl-9'>Quantity</p>
            </div>
            <div>
              <p className='pl-1'>Total</p>
            </div>
            <div></div>
          </div>

          {cart.length === 0 ? (
            <div className='col-span-5 h-30 flex items-center justify-center'>
              <p className='text-4xl'>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className='grid grid-cols-5 border-b p-5 '>
                <div className='flex justify-between items-center'>
                  <img src={item.images[0]} alt={item.title} className='w-10 h-10' />
                  <div className='flex-1 ml-2'>
                    <p className='text-sm'>{item.title}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <p className='text-sm font-bold'>${item.price}</p>
                </div>
                <div>
                  <form className='max-w-xs mx-auto'>
                    <div className='relative flex items-center max-w-[8rem]'>
                      <button
                        onClick={() => handleSubtract(item)}
                        type='button'
                        id='decrement-button'
                        data-input-counter-decrement='quantity-input'
                        className='bg-gray-100 hover:bg-gray-500 rounded-s-lg p-3 h-11 focus:outline-none'
                      >
                        <svg
                          className='w-3 h-3 text-gray-900'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 2'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M1 1h16'
                          />
                        </svg>
                      </button>
                      <input
                        type='text'
                        value={item.quantity}
                        id='quantity-input'
                        data-input-counter
                        aria-describedby='helper-text-explanation'
                        className='bg-gray-100 h-11 text-center text-gray-900 text-sm focus:outline-0 block w-full py-2.5'
                        placeholder=''
                        disabled
                      />
                      <button
                        onClick={() => handleAdd(item)} 
                        type='button'
                        id='increment-button'
                        data-input-counter-increment='quantity-input'
                        className='bg-gray-100 hover:bg-gray-500  rounded-e-lg p-3 h-11  focus:outline-none'
                      >
                        <svg
                          className='w-3 h-3 text-gray-900 '
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 18'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 1v16M1 9h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
                <div className='flex items-center'>
                  <p className='text-sm font-bold'>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-500 text-sm hover:text-red-900'
                  >
                    <FontAwesomeIcon icon={faTrash} className='text-2xl mr-8' />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Conditionally render the total price only if there are items in the cart */}
          {cart.length > 0 && (
            <div className='grid grid-cols-5 mt-5 border-b p-3'>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <p className='pl-1'>${totalPrice.toFixed(2)}</p>
              </div>
              <div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
