// import React from 'react';

const Sin = ({ onFlip }) => {
  return (
    <div className='form-container'>
      <h2>Sign In</h2>
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      <button>Login</button>
      <p>
        Don't have an account?{' '}
        <button className='flip-btn' onClick={onFlip}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Sin;
