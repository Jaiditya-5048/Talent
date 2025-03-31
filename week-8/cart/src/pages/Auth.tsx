import { useState } from "react";
import Sup from "../components/Sup";
import Sin from "../components/Sin";
import '../styles/Auth.css'


const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className='auth-container'>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className='flip-card-inner'>
          {/* Sign In */}
          <div className='flip-card-front'>
            <Sin onFlip={() => setIsFlipped(true)} />
          </div>
          {/* Sign Up */}
          <div className='flip-card-back'>
            <Sup onFlip={() => setIsFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;