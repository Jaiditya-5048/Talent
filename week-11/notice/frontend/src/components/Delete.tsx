import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { deleteNoticeApi, getNoticesApi } from '../util/api';

function Delete() {
  const { closeModal, deleteId, saveNotices } = useNotice();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteNoticeApi(deleteId);
    await refreshFunc();
    closeModal();
  };
  const refreshFunc = async () => {
    const response = await getNoticesApi();
    saveNotices(response.data.data);
    console.log(response.data.data);
  };
  return (
    <>
      <div className='w-[30vw] m-auto backdrop-blur-xs mt-40 p-10 bg-gray-900 rounded-sm'>
        <div className='flex justify-between mb-10'>
          <p className='text-4xl'>Delete Notice</p>
          <button type='button' onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faCircleXmark} className='hover:text-red-600 cursor-pointer' />
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='text-xl'>Confirm to delete Notice</p>
          <button
            type='button'
            className='self-end border-1 cursor-pointer h-8 w-20 hover:text-gray-900 hover:bg-white'
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
