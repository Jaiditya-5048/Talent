// import React from 'react'
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartById, getSingleUser } from '../utils/api';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slice';
import { useCart } from './CartContext';
import { ApiCart } from '../utils/types';


function Login() {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDisabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const {addToCart} = useCart();
  const dispatch = useDispatch();
  

  function getInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [id]: value }));

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
    if (!newErrors.email && !newErrors.password && values.email && values.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }
  const navigate = useNavigate();
  const clickHandler = () => navigate('/signup');
  async function handleSignIn(e: MouseEvent) {
    e.preventDefault();
    const Apiresponse = await getSingleUser({ email: values.email, password: values.password });
    if(Apiresponse === null) return;
    if (Apiresponse?.length === 0) {
      setErrors({ email: 'Please check your Email', password: 'Please check your Password' });
      setDisabled(true)
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
      console.log(isActive);
    } else {
      const ApiResponseCart: ApiCart = await getCartById(values.email);
      // console.log(ApiResponseCart);
      
      const {cart} = ApiResponseCart
      console.log(cart);
      
      const loggedUser = {
        first_Name: Apiresponse[0].first_Name,
        last_Name: Apiresponse[0].last_Name,
        email: Apiresponse[0].email,
      };

      cart.forEach((product) => addToCart(product));
      dispatch(addUser(loggedUser));
  
      navigate('/')
     
    }
    
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
            {/* toast message */}
            <div className={isActive ? '' : 'hidden'} id='toast-error-register'>
              <div
                id='toast-message'
                className='relative flex items-center w-full  pt-3 mb-4 text-red-500  rounded-lg  z-10 '
                role='alert'
              >
                <div className='inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 rounded-lg'>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
                  </svg>
                  <span className='sr-only'>Error icon</span>
                </div>
                <div className='ms-3 text-sm font-normal'>Email or password is wrong!</div>
              </div>
            </div>
            <form>
              <div className='relative mb-4'>
                <label htmlFor='email' className='leading-7 text-sm text-[#f9ead3]'>
                  Email
                </label>
                <input
                  value={values.email || ''}
                  type='email'
                  id='email'
                  name='email'
                  autoComplete='email'
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
                  autoComplete='current-password'
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
                type='submit'
                disabled={isDisabled}
                className={`text-[#f9ead3] bg-[#03132c] w-full cursor-pointer border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-[#03132cda] rounded text-lg
                   ${isDisabled === true ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => handleSignIn(e)}
              >
                Sign In
              </button>
              <p className='text-xs text-[#f9ead3] mt-3 self-center'>
                Don'T have an account?{' '}
                <button type='button' onClick={clickHandler}>
                  <span className='text-[#03132c] underline cursor-pointer flip-btn'>Sign Up</span>
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
