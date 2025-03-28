import { useState } from "react";
import Login from "../components/login"
import Register from "../components/Register"
import '../styles/Sign_in_up.css'


const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className='auth-container'>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className='flip-card-inner'>
          {/* Sign In */}
          <div className='flip-card-front'>
            <Login onFlip={() => setIsFlipped(true)} />
          </div>
          {/* Sign Up */}
          <div className='flip-card-back'>
            <Register onFlip={() => setIsFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};