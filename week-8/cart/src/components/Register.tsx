// import React from 'react'


function Register() {
  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto flex justify-center items-center'>
          {/* <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'></div> */}
          <div className='flex flex-col max-w-[60%] bg-[#64686f3d] yellow-50 backdrop-saturate-100 backdrop-blur-sm border border-white rounded-lg p-8'>
            <h1 className='text-[#f9ead3] text-2xl font-medium title-font mb-5 inline-block self-center'>
              Create Account
            </h1>
            {/* name div */}
            <div className='flex gap-4'>
              {/* first name div */}
              <div className='flex flex-col mb-4'>
                <label htmlFor='first-name' className='leading-7 text-sm text-[#f9ead3]'>
                  First Name
                </label>
                <input
                  type='text'
                  id='first-name'
                  name='first-name'
                  autoComplete='given-name'
                  className='w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              {/* last name div */}
              <div className='flex flex-col mb-4'>
                <label htmlFor='last-name' className='leading-7 text-sm text-[#f9ead3]'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='last-name'
                  name='last-name'
                  autoComplete='family-name'
                  className='w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
            </div>
            {/* email div */}
            <div className='relative mb-4'>
              <label htmlFor='email' className='leading-7 text-sm text-[#f9ead3]'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                autoComplete='email'
                className='w-full rounded border bg-transparent border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            {/* password div */}
            <div className='flex gap-4'>
              {/* new-password div */}
              <div className='flex flex-col mb-4'>
                <label htmlFor='new-password' className='leading-7 text-sm text-[#f9ead3]'>
                  New Password
                </label>
                <input
                  type='password'
                  id='new-password'
                  name='new-password'
                  autoComplete='new-password'
                  className='w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              {/* confirm password div */}
              <div className='flex flex-col mb-4'>
                <label htmlFor='confirm-password' className='leading-7 text-sm text-[#f9ead3]'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  name='confirm-password'
                  autoComplete='new-password'
                  className='w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
            </div>

            <button className='text-[#f9ead3] bg-[#03132c] cursor-pointer border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-[#03132cda] rounded text-lg'>
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
