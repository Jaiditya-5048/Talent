import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { deleteNoticeApi, getNoticesApi } from '../util/api';

function Delete() {
  const { closeModal, notice, setFlashy, setNotices } = useNotice();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteNoticeApi(notice._id);    
    const response = await getNoticesApi();
    setNotices(response.data.data);
    // await refreshFunc();
    const flash = { message: 'Notice Deleted successfully!', type: 'success' };
    setFlashy(flash);
    closeModal();
  };
  return (
    <>
      <div className='lg:w-[30vw] sm:w-[90vw] md:w-[50vw] m-auto backdrop-blur-xs mt-40 p-6 pt-4 bg-white text-black rounded-sm border-2'>
        <div className='flex justify-between mb-10'>
          <p className='text-4xl'>Delete Notice</p>
          <button type='button' onClick={() => closeModal()}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='hover:text-red-600 cursor-pointer text-xl'
            />
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='text-xl'>Confirm to delete Notice</p>
          <button
            type='button'
            className='self-end border-1 cursor-pointer h-8 w-20 hover:shadow-xs hover:outline-none hover:border-0 hover:shadow-black  bg-black text-white rounded'
            onClick={(e) => handleDelete(e)}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Delete;
