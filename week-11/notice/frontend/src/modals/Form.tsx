import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { useEffect, useState } from 'react';
// import { noticeData } from '../util/types';
import {
  addCategoryApi,
  addNoticeApi,
  editNoticeApi,
  getCategoriesApi,
  getNoticesApi,
} from '../util/api';

function Form() {
  const { setFlashy, setNotices, edit, notice, categories, setCategories } = useNotice();
  const [value, setValue] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categoryLocal, setCategoryLocal] = useState('');
  const [categoryId, setCategoryId] = useState('');
  // const [categoryValue, setCategoryValue] = useState<{ [key: string]: string }>({});
  const [categoryValue, setCategoryValue] = useState('');
  const [categoryError, setCategoryErrors] = useState<{ [key: string]: string }>({});
  // const [submitBtnState, setSubmitBtnState] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [categoryFlag, setCategoryFlag] = useState<boolean>(false);
  const { closeModal, setCategory } = useNotice();

  function handleDropDown() {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(hasEmptyFields);
    setErrors({});
    if (value.title.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        title: 'Title is required',
      }));
    }

    if (value.description.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        description: 'Description is required',
      }));
    }

    const hasEmptyFields = Object.values(value).some((val) => !val.trim());
    if (hasEmptyFields !== true) {
      if (edit) {
        const noticeData = { ...value, _id: notice._id, pin: notice.pin, categories: [categoryId] };

        const response = await editNoticeApi(noticeData); //add api !!!!!!!!!!!!
        if (response.status !== 200) {
          setErrors(response.data.errors);
        } else {
          const flash = { message: 'Notice edited successfully!', type: 'success' };
          setFlashy(flash);
          const response = await getNoticesApi();
          setNotices(response.data.data);
          setCategory('Category');
          const responseCat = await getCategoriesApi();
          setCategories(responseCat.data.data);
          closeModal();
        }
      } else {
        const addValues = { ...value, pin: false, categories: [categoryId] }; //adding pin field with default vale false to the notice object
        const response = await addNoticeApi(addValues);
        if (response.status !== 201) {
          setErrors(response.data.errors);
        } else {
          const flash = { message: 'Notice added successfully!', type: 'success' };
          setFlashy(flash);
          const response = await getNoticesApi();
          setNotices(response.data.data);
          setCategory('Category');
          const responseCat = await getCategoriesApi();
          setCategories(responseCat.data.data);
          closeModal();
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: inputValue } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: inputValue.trim() ? '' : 'Cannot be empty',
    }));
  };

  function handleChangeCategory(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value: inputValue } = e.target;

    setCategoryValue(inputValue);
    // setCategoryValue((prev) => ({
    //   ...prev,
    //   [name]: inputValue,
    // }));

    setCategoryErrors((prevErrors) => ({
      ...prevErrors,
      [name]: inputValue.trim() ? '' : 'Cannot be empty',
    }));
  }

  async function handleClickAddCategory(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!categoryValue.trim()) return;
    console.log(categoryValue);

    await addCategoryApi({ category: categoryValue });
    setCategoryFlag(false);
    const response = await getCategoriesApi();
    setCategories(response.data.data);
    const flash = { message: 'Category added successfully!', type: 'success' };
    setFlashy(flash);
  }

  async function handleCategoryClick(id: string, category: string) {
    setCategoryLocal(category);
    setDropdown(false);
    setCategoryId(id);
  }

  useEffect(() => {
    if (edit === true) {
      setValue({
        title: notice.title,
        description: notice.description,
      });

      if(notice.categories.length > 1) {
        const filterCategory = notice.categories.filter((cat) => cat._id !== '680f0c5d80e550f6b26a92f6');
        setCategoryId(filterCategory[0]._id);
        setCategoryLocal(filterCategory[0].category);
      } else {
        setCategoryId(notice.categories[0]._id)
        setCategoryLocal(notice.categories[0].category)
      }
    }
  }, [edit]);

  return (
    <>
      <div className='lg:w-[30vw] sm:w-[90vw] md:w-[50vw] w-[90vw] mt-10 m-auto backdrop-blur-xs p-10 text-black bg-white border-2 rounded-sm'>
        <div className='flex justify-between mb-5'>
          {edit === true ? (
            <p className='text-4xl'>Edit Notice</p>
          ) : (
            <p className='text-4xl'>Add Notice</p>
          )}

          <button type='button' onClick={closeModal}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='hover:text-red-600 cursor-pointer text-xl'
            />
          </button>
        </div>

        <form className='flex flex-col gap-5' onSubmit={submitHandler}>
          {categoryFlag ? (
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <div className='flex flex-col gap-2 w-[70%]'>
                  <label htmlFor='category'>Category</label>
                  <input
                    value={categoryValue}
                    type='text'
                    name='category'
                    id='category'
                    className='h-10 w-[100%] border-2 border-black p-2'
                    onChange={(e) => handleChangeCategory(e)}
                  />
                </div>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    className=' bg-blue-600 text-white size-10 self-end p-2 rounded-sm cursor-pointer hover:shadow-sm hover:shadow-black'
                    onClick={(e) => handleClickAddCategory(e)}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} className='text-white' />
                  </button>
                  <button
                    type='button'
                    className=' bg-red-600 text-white size-10 self-end p-2 rounded-sm cursor-pointer hover:shadow-sm hover:shadow-black'
                    onClick={() => setCategoryFlag(false)}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} className='text-white ' />
                  </button>
                </div>
              </div>
              <p className='text-red-600 text-sm'>{categoryError.category || ''}</p>
            </div>
          ) : (
            <div className='flex self-end gap-2'>
              <div className='flex gap-5 relative self-end'>
                <button
                  id='dropdownDefaultButton'
                  // data-dropdown-toggle='dropdown'
                  onClick={() => {
                    handleDropDown();
                  }}
                  className='text-black w-30 mt-7 hover:bg-black hover:text-white border-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer'
                  type='button'
                >
                  {categoryLocal ? categoryLocal : 'Category'}
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
                  className={`${dropdown ? '' : 'hidden'} absolute top-19 border-white w-30 bg-black text-white shadow-xs shadow-black p-2 rounded-2xl cursor-pointer `}
                >
                  <ul className='flex flex-col gap-3 items-center'>
                    {categories.map((cat) => (
                      <li
                        key={cat._id}
                        className='border-b-2 border-black hover:border-white hover:border-b-2'
                        onClick={() => handleCategoryClick(cat._id, cat.category)}
                      >
                        {cat.category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type='button'
                className='bg-black size-11 mt-7 rounded-lg cursor-pointer'
                onClick={() => setCategoryFlag(true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} className='text-white hover:text-xl' />
              </button>
            </div>
          )}

          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              className='h-10 border-2 border-black pl-2 pr-2 '
              value={value.title}
              onChange={handleChange}
              maxLength={50}
            />
            <p className='text-red-600 text-sm'>{errors.title || ''}</p>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              className='h-30 border-2 border-black p-2'
              value={value.description}
              onChange={handleChange}
              maxLength={300}
            />
            <p className='text-red-600 text-sm'>{errors.description || ''}</p>
          </div>

          <button
            type='submit'
            className='h-10 border-1 mt-4 hover:shadow-xs hover:outline-none hover:border-0 hover:shadow-black  bg-black text-white cursor-pointer rounded'
          >
            {edit ? 'UPDATE' : 'ADD'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
