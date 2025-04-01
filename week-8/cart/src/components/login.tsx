// import React from 'react'
import { useState } from 'react';

function Login() {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  function getInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    console.log(e);
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
    console.log(errors);
    console.log(value);

    const newErrors = { ...errors };

    switch (id) {
      case 'email':
        if (!value.trim()) {
          newErrors[id] = 'Email is required';
        } else {
          const emailRegex = /^[a-zA-Z0-9._%+-]{3,64}@[a-zA-Z0-9.-]{2,255}\.[a-zA-Z]{2,63}$/;
          newErrors[id] = emailRegex.test(value.trim()) ? '' : 'Invalid Email';
        }
        break;

      case 'password':
        if (!value.trim()) {
          newErrors[id] = 'Password is required';
        } else {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?])[A-Za-z\d!@#$%^&*(),.?]{8,64}$/;
          newErrors[id] = passwordRegex.test(value.trim()) ? '' : 'Invalid password';
        }
        break;
    }

    setErrors(newErrors);
  }
  return (
    <>
      <section className='text-gray-60 0 body-font'>
        <div className='container px-5 py-24 mx-auto flex justify-center items-center'>
          {/* <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'></div> */}
          <div className='flex flex-col max-w-[60%] bg-[#64686f3d] yellow-50 backdrop-saturate-100 backdrop-blur-md border border-white rounded-lg p-8'>
            <h1 className='text-[#f9ead3] text-2xl font-medium title-font mb-5 inline-block self-center'>
              Sign In
            </h1>
            <div className='relative mb-4'>
              <label htmlFor='email' className='leading-7 text-sm text-[#f9ead3]'>
                Email
              </label>
              <input
                value={values.email || ''}
                type='email'
                id='email'
                name='email'
                onChange={getInput}
                onBlur={getInput}
                className={`w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                 
                ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : values.email
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-[#03132c]'
                }`}
              />
              <p className='text-red-600 text-sm pt-1'>{errors.email}</p>
            </div>
            <div className='relative mb-4'>
              <label htmlFor='password' className='leading-7 text-sm text-[#f9ead3]'>
                Password
              </label>
              <input
                value={values.password || ''}
                type='password'
                id='password'
                name='password'
                onChange={getInput}
                onBlur={getInput}
                className={`w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                 
                ${
                  errors.password
                    ? 'border-red-500 focus:border-red-500'
                    : values.password
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-[#03132c]'
                }`}
              />
              <p className='text-red-600 text-sm pt-1'>{errors.password}</p>
            </div>
            <button
              className={`text-[#f9ead3] bg-[#03132c] cursor-pointer border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-[#03132cda] rounded text-lg
                   ${errors.email || errors.password ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={errors.email || errors.password ? true : false}
            >
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

export default Login;
