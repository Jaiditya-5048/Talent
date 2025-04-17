import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail, postCartData, postData } from '../utils/api';
import { UserData } from '../utils/types';

function Register() {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDisabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [apiError, setApiError] = useState('');

  function getInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    // console.log(e);
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
    // console.log(errors);
    // console.log(value);

    const newErrors = { ...errors };

    switch (id) {
      case 'first_name':
        if (!value.trim()) {
          newErrors[id] = 'First Name is required';
        } else {
          const nameRegex = /^[a-zA-Z\s]{2,15}$/;
          newErrors[id] = nameRegex.test(value.trim()) ? '' : 'Invalid First Name';
        }
        break;

      case 'last_name':
        if (!value.trim()) {
          newErrors[id] = 'Last Name is required';
        } else {
          const nameRegex = /^[a-zA-Z\s]{2,15}$/;
          newErrors[id] = nameRegex.test(value.trim()) ? '' : 'Invalid Last Name';
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors[id] = 'Email is required';
        } else {
          const emailRegex = /^[a-zA-Z0-9._%+-]{3,64}@[a-zA-Z0-9.-]{2,255}\.[a-zA-Z]{2,63}$/;
          newErrors[id] = emailRegex.test(value.trim()) ? '' : 'Invalid Email';
        }
        break;

      case 'new_password':
        if (!value.trim()) {
          newErrors[id] = 'Password is required';
        } else {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?])[A-Za-z\d!@#$%^&*(),.?]{8,64}$/;
          newErrors[id] = passwordRegex.test(value.trim()) ? '' : 'Invalid password';
        }
        break;

      case 'confirm_password':
        if (value.trim() !== values.new_password) {
          newErrors[id] = 'Passwords does not match';
        } else {
          newErrors[id] = '';
        }
        break;
    }

    setErrors(newErrors);
    if (
      !newErrors.first_name &&
      !newErrors.last_name &&
      !newErrors.email &&
      !newErrors.new_password &&
      !newErrors.confirm_password &&
      values.first_name &&
      values.last_name &&
      values.email &&
      values.new_password &&
      values.confirm_password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }
  const navigate = useNavigate();
  async function handleSignUp(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const userData: UserData = {
      firstName: values.first_name.charAt(0).toUpperCase() + values.first_name.slice(1),
      lastName: values.last_name.charAt(0).toUpperCase() + values.last_name.slice(1),
      email: values.email,
      password: values.new_password,
    };
    const emailCheck = await checkEmail(values.email);
    console.log(emailCheck);
    
    
    if(emailCheck === null) {console.log('error fetching data');
    } else {
    if (emailCheck[0].status === 409 ) {
      setApiError(emailCheck[1].message);
      setErrors({ email: 'Please enter a new Email' });
      setDisabled(true);
      setIsActive(true);
      // console.log("before time out: ", isActive);

      setTimeout(() => {
        setIsActive(false);
      }, 3000);
      // console.log(isActive);
    } else {
      const cartData = {
        id: userData.email,
        cart: [],
      };
      const response = await postData(userData);
      console.log(userData);

      console.log(response);

      postCartData(cartData);
      setValues({});

      navigate('/signin');
    }
}
  }
    
    const clickHandler = () => navigate('/signin');
  // console.log(errors);
  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto flex justify-center items-center'>
          {/* <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'></div> */}
          <div className='flex flex-col max-w-[60%] bg-[#64686f3d]  yellow-50 backdrop-saturate-100 backdrop-blur-sm border border-white rounded-lg p-8'>
            <h1 className='text-[#f9ead3] text-2xl font-medium title-font mb-5 inline-block self-center'>
              Create Account
            </h1>
            <form onSubmit={handleSignUp} id='sign_up'>
              {/* name div */}
              <div className='flex gap-4'>
                {/* first name div */}
                <div className='flex flex-col mb-4'>
                  <label htmlFor='first_name' className='leading-7 text-sm text-[#f9ead3]'>
                    First Name
                  </label>
                  <input
                    onChange={getInput}
                    onBlur={getInput}
                    value={values.first_name || ''}
                    type='text'
                    id='first_name'
                    name='first_name'
                    autoComplete='given-name'
                    className={`w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                    
                ${
                  errors.first_name
                    ? 'border-red-500 focus:border-red-500'
                    : values.first_name
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-[#03132c]'
                }`}
                  />
                  <p className='text-red-600 text-sm pt-1'>{errors.first_name}</p>
                </div>
                {/* last name div */}
                <div className='flex flex-col mb-4'>
                  <label htmlFor='last_name' className='leading-7 text-sm text-[#f9ead3]'>
                    Last Name
                  </label>
                  <input
                    onChange={getInput}
                    onBlur={getInput}
                    value={values.last_name || ''}
                    type='text'
                    id='last_name'
                    name='last_name'
                    autoComplete='family-name'
                    className={`w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                    
                ${
                  errors.last_name
                    ? 'border-red-500 focus:border-red-500'
                    : values.last_name
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:border-[#03132c]'
                }`}
                  />
                  <p className='text-red-600 text-sm pt-1'>{errors.last_name}</p>
                </div>
              </div>
              {/* email div */}
              <div className='relative mb-4'>
                <label htmlFor='email' className='leading-7 text-sm text-[#f9ead3]'>
                  Email
                </label>
                <input
                  onChange={getInput}
                  onBlur={getInput}
                  value={values.email || ''}
                  type='email'
                  id='email'
                  name='email'
                  autoComplete='email'
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
                    <div className='ms-3 text-sm font-normal'>
                      {apiError}
                    </div>
                  </div>
                </div>
              </div>
              {/* password div */}
              <div className='flex gap-4'>
                {/* new-password div */}
                <div className='flex flex-col mb-4'>
                  <label htmlFor='new_password' className='leading-7 text-sm text-[#f9ead3]'>
                    New Password
                  </label>
                  <input
                    onChange={getInput}
                    onBlur={getInput}
                    value={values.new_password || ''}
                    type='password'
                    id='new_password'
                    name='new_password'
                    autoComplete='new-password'
                    className={`w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                    
                    ${
                      errors.new_password
                        ? 'border-red-500 focus:border-red-500'
                        : values.new_password
                          ? 'border-green-500 focus:border-green-500'
                          : 'border-gray-300 focus:border-[#03132c]'
                    }`}
                  />
                  <p className='text-red-600 text-sm pt-1'>{errors.new_password}</p>
                </div>
                {/* confirm password div */}
                <div className='flex flex-col mb-4'>
                  <label htmlFor='confirm_password' className='leading-7 text-sm text-[#f9ead3]'>
                    Confirm Password
                  </label>
                  <input
                    onChange={getInput}
                    onBlur={getInput}
                    value={values.confirm_password || ''}
                    type='password'
                    id='confirm_password'
                    name='confirm_password'
                    autoComplete='new-password'
                    className={`w-full bg-transparent rounded border border-gray-300  focus:border-[#03132c] text-base outline-none text-[#f9ead3] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out 
                    
                    ${
                      errors.confirm_password
                        ? 'border-red-500 focus:border-red-500'
                        : values.confirm_password
                          ? 'border-green-500 focus:border-green-500'
                          : 'border-gray-300 focus:border-[#03132c]'
                    }`}
                  />
                  <p className='text-red-600 text-sm pt-1'>{errors.confirm_password}</p>
                </div>
              </div>

              <button
                disabled={isDisabled}
                className={`text-[#f9ead3] bg-[#03132c] cursor-pointer border-0 py-2 px-8 mt-2 w-full focus:outline-none hover:bg-[#03132cda] rounded text-lg
                ${isDisabled === true ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Sign Up
              </button>
            </form>
            <p className='text-xs text-[#f9ead3] mt-3 self-center'>
              Already have an account?{' '}
              <button type='button' onClick={clickHandler}>
                <span className='text-[#03132c] underline cursor-pointer flip-btn'> Sign In</span>
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
