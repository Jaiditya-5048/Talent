import React from "react";

const Sup = ({ onFlip }) => {
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Register</button>
      <p>
        Already have an account?{" "}
        <button className="flip-btn" onClick={onFlip}>Sign In</button>
      </p>
    </div>
  );
};

export default Sup;