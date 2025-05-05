import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getCategoriesApi, getNoticesByCategoryApi } from '../util/api';
import { useNotice } from '../context/noticeContext';
// import { catagoryApiResponse, Notice } from '../util/types';

export default function Nav() {
  const { setCategories, categories, setNotices, category, setCategory } = useNotice();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  //useEffrect to fetch categories on load
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategoriesApi();

        setCategories(response.data.data);
        setCategory("General")
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    }
    fetchCategories();
  }, [setCategories]);

  async function handleCategoryClick(id: string, category: string) {
    const NoticeApiData = await getNoticesByCategoryApi(id);
    // console.log('NoticeApiData:', NoticeApiData.data.data);
    
    setDropdown(false);
    if (NoticeApiData.data.data.length <= 0) {      
      setNotices([]);
      setCategory(category);
      return;
    }
    if (NoticeApiData.data.data.length > 0) {
      console.log('NoticeApiData:', NoticeApiData.data.data);
      
      setNotices(NoticeApiData.data.data);
      setCategory(category);
    } else {
      setNotices([]);
      setCategory(category);
    }
  }

  //useEffect to handle scroll event and change the background color of the button of the drop down on the nav bar
   useEffect(() => {
     
     const handleScroll = () => {
      
       if (window.scrollY > 50) {
         setIsScrolled(true);
       } else {
         setIsScrolled(false);
       }
     };     
     window.addEventListener('scroll', handleScroll);    
   }, []);
   
  return (
    <>
      <div className={`flex justify-between pl-5 pr-5 mt-5 fixed w-[99dvw] `}>
        <div></div>
        {/* <img src='../../public/img/notice.webp' alt='logo' className='h-14' /> */}
        <div className='flex gap-5 relative '>
          <button
            id='dropdownDefaultButton'
            // data-dropdown-toggle='dropdown'
            onClick={() => {
              setDropdown(!dropdown);
            }}
            className={`text-black w-30 hover:bg-black hover:text-white border-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer
              ${isScrolled ? 'bg-black text-white hover:border-2 hover:border-gray-600' : 'bg-white'}`}
            type='button'
          >
            {/* {category} */}
            {category.length > 0 ? category : 'Category'}
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
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className='border-b-2 border-black hover:border-white hover:border-b-2'
                  onClick={() => handleCategoryClick(cat._id, cat.category)}
                >
                  <div className='flex justify-between w-auto min-w-20 gap-2'>
                    <div>{cat.category}</div>
                    <div>
                      <span className='text-red-600'> ({cat.counter})</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button type='button' className='hidden'>
            <FontAwesomeIcon
              icon={faGear}
              className='text-2xl cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-180 '
            />
          </button>
        </div>
      </div>
    </>
  );
}
