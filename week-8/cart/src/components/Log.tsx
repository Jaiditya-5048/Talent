import { Link, useNavigate } from 'react-router-dom';
import { MenuItem} from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../utils/types';
import { useState, useEffect } from 'react';
import { removeUser } from '../redux/slice';
import { useCart } from './CartContext';
import { updateCartData } from '../utils/api';

function Log() {
  const [log, setLog] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: { user: UserData }) => state.user);
  useEffect(() => {
    setLog(Object.keys(userData).length !== 0);
  }, [userData]);

  function handlerSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    syncData()
    dispatch(removeUser());
    navigate('/signin');
  }

  

  async function syncData() {
    const apiCart = {
      email: userData.email,
      cart: cart,
    };
    await updateCartData(userData.email, apiCart);

  }
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      syncData(); // Trigger cart sync on tab close/refresh
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, cart]);
  return (
    <>
      {log === false ? (
        <MenuItem>
          <Link to={'/signin'}>
            <button className='group w-[100%] flex items-center cursor-pointer bg-[#4a5565] text-white gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-900'>
              Sign In
            </button>
          </Link>
        </MenuItem>
      ) : (
        <>
          <MenuItem>
            <p className='group w-[100%] inline-flex items-center bg-[#4a5565] text-white gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-900'>
              {userData.first_Name + ' ' + userData.last_Name}
            </p>
          </MenuItem>
          <MenuItem>
            <button
              onClick={(e) => handlerSignOut(e)}
              className='group flex w-[100%] items-center cursor-pointer bg-[#4a5565] text-white gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-900'
            >
              Sign Out
            </button>
          </MenuItem>
        </>
      )}
    </>
  );
}

export default Log;
