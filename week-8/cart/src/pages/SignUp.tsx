import Register from "../components/Register";
import { useEffect } from 'react';
import '../styles/Sign_in_up.css';


function SignUp() {
      useEffect(() => {
        document.documentElement.className = 'html-bg';
        return () => {
          document.documentElement.className = ''; // Reset when leaving the page
        };
      }, []);
  return (
    <div>
      <Register />
    </div>
  )
}

export default SignUp
