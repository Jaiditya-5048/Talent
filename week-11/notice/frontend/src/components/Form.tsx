import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { useEffect, useState } from 'react';
import { noticeData } from '../util/types';
import { addNoticeApi, getNoticesApi } from '../util/api';

function Form() {
  const { saveNotices } = useNotice();
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
  const [submitBtnState, setSubmitBtnState] = useState<boolean>(false);
  const { closeModal } = useNotice();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addNoticeApi(value);
    await refreshFunc();
    console.log(response);

    if (response.status !== 201) {
      setErrors(response.data.errors);
      console.log(response.data.errors);
    } else {
      closeModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    const hasErrors = Object.values(errors).some((err) => err !== '');
    const hasEmptyFields = Object.values(value).some((val) => !val.trim());
    setSubmitBtnState(hasErrors || hasEmptyFields);
  }, [errors, value]);

  return (
    <div className='w-[40vw] m-auto backdrop-blur-xs mt-40 p-10 bg-gray-900 rounded-sm'>
      <div className='flex justify-between mb-5'>
        <p className='text-4xl'>Add Notice</p>
        <button type='button' onClick={closeModal}>
          <FontAwesomeIcon icon={faCircleXmark} className='hover:text-red-600' />
        </button>
      </div>

      <form className='flex flex-col gap-5' onSubmit={submitHandler}>
        <div className='flex flex-col gap-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            className='h-8 border-2 border-amber-50'
            value={value.title}
            onChange={handleChange}
          />
          <p className='text-red-800 text-sm'>{errors.title || ''}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            className='h-8 border-2 border-amber-50'
            value={value.description}
            onChange={handleChange}
          />
          <p className='text-red-800 text-sm'>{errors.description || ''}</p>
        </div>

        <button
          type='submit'
          className='h-8 border-1 mt-4 hover:bg-white hover:text-[#242424]'
          disabled={submitBtnState}
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default Form;
