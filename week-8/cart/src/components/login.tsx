// import React from 'react'
import { ChangeEvent, useState } from "react";
import { UserData } from "../utils/types";

const userData : UserData = {
  
}

function Login() {
  const [value, setValue]=useState('');
  function getInput(e: InputEvent){
    setValue(e.value);
  }
  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto flex justify-center items-center'>
          {/* <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'></div> */}
          <div className='flex flex-col max-w-[60%] bg-[#64686f3d] yellow-50 backdrop-saturate-100 backdrop-blur-sm border border-white rounded-lg p-8'>
            <h1 className='text-[#f9ead3] text-2xl font-medium title-font mb-5 inline-block self-center'>
              Sign In
            </h1>
            <div className='relative mb-4'>
              <label htmlFor='full-name' className='leading-7 text-sm text-[#f9ead3]'>
                Full Name
              </label>
              <input
                type='text'
                id='full-name'
                name='full-name'
                className='w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <label htmlFor='email' className='leading-7 text-sm text-[#f9ead3]'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full rounded border bg-transparent border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <button className='text-[#f9ead3] bg-[#03132c] cursor-pointer border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-[#03132cda] rounded text-lg'>
              Sign In
            </button>
            <p className='text-xs text-[#f9ead3] mt-3 self-center'>
              Don'T have an account?{' '}
              <span className='text-[#03132c] underline cursor-pointer'>Sign Up</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login
