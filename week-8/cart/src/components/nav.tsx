// import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useCart } from './CartContext';


import Log from './Log';

export default function Nav() {
  const {cart ,} = useCart();
  const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div>
      <header className='text-gray-600 body-font bg-amber-300 fixed z-10 w-full'>
        <div className='container mx-auto flex flex-wrap px-5 py-1 flex-col md:flex-row items-center'>
          <div className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <Link to={`/`}>
              <img className='w-25 h-15 ml-2 ' src='/assets/logo.png' alt='logo' />
            </Link>
          </div>

          <div className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            
              <Link to='/cart' className='mr-5 hover:text-gray-900'>
                {/* <FontAwesomeIcon icon={faCartShopping} className='text-2xl mr-4 absolute' />
              <span className='sr-only'>Notifications</span>
              <div className=' relative inline-flex items-center justify-center text-xs -top-5 left-5 font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900'>
                20
              </div> */}
                <svg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' className=''>
                  {/* Filled Cart Body */}
                  <path d='M16 16h4l6 24h24l6-16H22z' fill='#4a5565' />

                  {/* Wheels */}
                  <circle cx='26' cy='48' r='4' fill='#4a5565' />
                  <circle cx='46' cy='48' r='4' fill='#4a5565' />

                  {/* <!-- Number inside the cart --> */}
                  <text
                    x='38'
                    y='37'
                    text-anchor='middle'
                    font-size='12'
                    font-family='Arial'
                    fill='white'
                    font-weight='bold'
                  >
                    {totalProducts}
                  </text>
                </svg>
              </Link>
          
            {/* profile drop-down */}
            <Menu>
              <MenuButton className=' hover:text-gray-900 cursor-pointer'>
                <FontAwesomeIcon icon={faUser} className='text-3xl mr-8 mt-1' />
              </MenuButton>

              <MenuItems
                transition
                anchor='bottom end'
                className='w-30 bg-[#4a5565] mt-4 cursor-pointer z-10 origin-top-right rounded-xl border border-white/5  p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
              >
                <Log />
              </MenuItems>
            </Menu>
          </div>
          {/* <button className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>
            Button
            <svg
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              className='w-4 h-4 ml-1'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </button> */}
        </div>
      </header>
    </div>
  );
}
