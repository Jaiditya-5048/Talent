import Login from "../components/login"
import { useEffect } from 'react';
import '../styles/Sign_in_up.css'


function SignIn() {
    useEffect(() => {
      document.documentElement.className = 'html-bg';
      return () => {
        document.documentElement.className = ''; // Reset when leaving the page
      };
    }, []);
  return (
    <div>
      <Login />
    </div>
  )
}

export default SignIn
