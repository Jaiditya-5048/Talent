
import { useEffect, useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Login from '../components/login';
import Register from '../components/Register';
import '../styles/Auth.css'


function FlipCard() {
  const [flipped, setFlipped] = useState(false);
     useEffect(() => {
        document.documentElement.className = 'html-bg';
        return () => {
          document.documentElement.className = ''; // Reset when leaving the page
        };
      }, []);

  return (
    <Flipper flipKey={flipped}>
      <div className='cursor-pointer' onClick={() => setFlipped(!flipped)}>
        <Flipped flipId='card'>
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ${flipped ? 'rotate-y-360' : ''}`}
          >
            {!flipped ? (
              <Login />
            ) : (
              <Register />
            )}
          </div>
        </Flipped>
      </div>
    </Flipper>
  );
}

export default FlipCard;




























// import { useState } from "react";
// import Sup from "../components/Sup";
// import Sin from "../components/Sin";


// const Auth = () => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   return (
//     <div className='auth-container'>
//       <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
//         <div className='flip-card-inner'>
//           {/* Sign In */}
//           <div className='flip-card-front'>
//             <Sin onFlip={() => setIsFlipped(true)} />
//           </div>
//           {/* Sign Up */}
//           <div className='flip-card-back'>
//             <Sup onFlip={() => setIsFlipped(false)} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;