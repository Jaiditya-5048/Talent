import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { NoticeApi } from '../util/types';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface NoticeCardProps {
  notice: NoticeApi;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
}

function NoticeCard({ notice, index, onDragStart, onDragEnter, onDragEnd }: NoticeCardProps) {
  const { openModal, setNotice, setEdit } = useNotice();

  function deleteBtn(notice: NoticeApi) {
    setNotice(notice);
    openModal('delete');
  }

  function editBtn(notice: NoticeApi) {
    setNotice(notice);
    openModal('add');
    setEdit(true);
  }

  function getDayAndMonth(dateStr: string): string {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const result = day + ', ' + month;

    return result;
  }

  // function clickHandlerPin(id: number | string) {
  //   const notice = notices.filter((notice) => notice._id === id);
  //   notice[0].pin = true;
  //   console.log(notice);
  // }

  return (
    <div
      className={`flex flex-col gap-2 justify-between border-[1px] border-[#ccc] rounded-xl shadow-xl  p-3 w-full bg-white cursor-move`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <p className='text-3xl mb-1 break-all'>{notice.title}</p>
          {/* <FontAwesomeIcon
                          icon={faThumbtack}
                          className='text-gray-500 hover:text-gray-800 cursor-pointer'
                          onClick={() => clickHandlerPin(notice._id)} mm
                        /> */}
          <div></div>
        </div>

        <p className='text-lg break-all'>{notice.description}</p>
      </div>
      <div className='flex justify-between mt-2 bottom-0'>
        <p className='text-gray-500'>
          {notice.createdAt ? (
            getDayAndMonth(notice.createdAt)
          ) : (
            <>
              <span>Date not available</span>
            </>
          )}
        </p>
        <div className='flex gap-3'>
          <button
            type='button'
            className='hover:text-yellow-900 text-yellow-400 cursor-pointer text-lg'
            onClick={() => editBtn(notice)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            type='button'
            className='hover:text-red-900 text-red-600 cursor-pointer text-lg'
            onClick={() => deleteBtn(notice)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;
