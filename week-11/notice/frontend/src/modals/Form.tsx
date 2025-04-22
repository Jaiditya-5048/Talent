import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { useEffect, useState } from 'react';
import { noticeData } from '../util/types';
import { addNoticeApi, getNoticesApi } from '../util/api';

function Form() {
  const { saveNotices, setFlashy } = useNotice();
  const [value, setValue] = useState<noticeData>({
    title: '',
    description: '',
  });
  const refreshFunc = async () => {
    const response = await getNoticesApi();
    saveNotices(response.data.data);
    console.log(response.data.data);
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [submitBtnState, setSubmitBtnState] = useState<boolean>(false);
  const { closeModal } = useNotice();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(value).some((val) => !val.trim());
    if (hasEmptyFields === true) {
      setErrors({
        title: 'Title is required',
        description: 'Description is required',
      });
    } else {
      const addPin = {...value, pin: false}
      console.log(addPin);
      debugger
      
      const response = await addNoticeApi(addPin);
      await refreshFunc();
      // console.log(response);

      if (response.status !== 201) {
        setErrors(response.data.errors);
        // console.log(response.data.errors);
      } else {
        const flash = { message: 'Notice added successfully!', type: 'success' };
        setFlashy(flash);
        closeModal();
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

  // useEffect(() => {
  //   const hasErrors = Object.values(errors).some((err) => err !== '');
  //   const hasEmptyFields = Object.values(value).some((val) => !val.trim());
  //   setSubmitBtnState(hasErrors || hasEmptyFields);
  // }, [errors, value]);

  return (
    <>
      <div className='lg:w-[30vw] sm:w-[90vw] md:w-[50vw] w-[90vw] m-auto backdrop-blur-xs mt-40 p-10 text-black bg-white border-2 rounded-sm'>
        <div className='flex justify-between mb-5'>
          <p className='text-4xl'>Add Notice</p>
          <button type='button' onClick={closeModal}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='hover:text-red-600 cursor-pointer text-xl'
            />
          </button>
        </div>

        <form className='flex flex-col gap-5' onSubmit={submitHandler}>
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
            ADD
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
