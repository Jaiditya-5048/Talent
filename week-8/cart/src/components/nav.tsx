// import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function Nav() {
  return (
    <div>
      <header className='text-gray-600 body-font bg-amber-300 fixed z-10 w-full'>
        <div className='container mx-auto flex flex-wrap px-5 py-1 flex-col md:flex-row items-center'>
          <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
            <img className='w-25 h-15 ml-2 ' src='/assets/logo.png' alt='logo' />
          </a>
          <div className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            {/* <a className='mr-5 hover:text-gray-900'>First Link</a>
            <a className='mr-5 hover:text-gray-900'>Second Link</a>*/}
            <Link to="/cart" className='mr-5 hover:text-gray-900'>
              <FontAwesomeIcon icon={faCartShopping} className='text-2xl mr-4' />
            </Link>
            {/* profile drop-down */}
            <Menu>
              <MenuButton className=' hover:text-gray-900'>
                <FontAwesomeIcon icon={faUser} className='text-2xl mr-8' />
              </MenuButton>
              
              <MenuItems
                transition
                anchor='bottom end'
                className='w-30 bg-[#4a5565] z-10 origin-top-right rounded-xl border border-white/5  p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
              >
                <MenuItem>
                  <p className='group inline-flex items-center bg-[#4a5565] text-white gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-900'>
                    user name
                  </p>
                </MenuItem>
                <MenuItem>
                  <button className='group flex items-center bg-[#4a5565] text-white gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-900'>
                    Sign Out
                  </button>
                </MenuItem>
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
