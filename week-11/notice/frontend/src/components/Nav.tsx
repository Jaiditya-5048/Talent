import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Nav() {
  const [dropdown, setDropdown] = useState<boolean>(false);
  function handleDropDown (){
    if(dropdown){
      setDropdown(false)
    } else {setDropdown(true)}
  }
  return (
    <>
      <div className='flex justify-between pl-5 pr-5 mt-5 fixed-top w-[99dvw]'>
        <div></div>
        {/* <img src='../../public/img/notice.webp' alt='logo' className='h-14' /> */}
        <div className='flex gap-5 relative '>
          <button
            id='dropdownDefaultButton'
            // data-dropdown-toggle='dropdown'
            onClick={() => {
              handleDropDown();
            }}
            className='text-black w-30 hover:bg-black hover:text-white border-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer'
            type='button'
          >
            Category
            <svg
              className='w-2.5 h-2.5 ms-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>

          <div
            id='dropdown'
            className={`${dropdown ? '' : 'hidden'} absolute top-12 w-30 bg-black text-white shadow-xs shadow-black p-2 rounded-xl cursor-pointer `}
          >
            <ul className='flex flex-col gap-3 items-center'>
              <li className='border-b-2 border-black hover:border-white hover:border-b-2'>MERN</li>
              <li className='border-b-2 border-black hover:border-white hover:border-b-2'>MEAN</li>
              <li className='border-b-2 border-black hover:border-white hover:border-b-2'>
                PYTHON
              </li>
            </ul>
          </div>

          <button type='button'>
            <FontAwesomeIcon
              icon={faGear}
              className='text-2xl cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-180'
            />
          </button>
        </div>
      </div>
    </>
  );
}
