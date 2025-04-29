import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'; //faThumbtack
import { useNotice } from '../context/noticeContext';
import { useEffect, useState } from 'react';
import { getNoticesApi } from '../util/api';
import FlashMessage from './FlashMessage';
import type { Notice } from '../util/types';

function Notice() {
  const { openModal, setNotice, notices, setFlashy, flashy, setNotices, setEdit } = useNotice();
  const [checkNotice, setCheckNotice] = useState<boolean>(false);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await getNoticesApi();
        if (response.status !== 200) {
          setCheckNotice(true);
        } else {
          setCheckNotice(false);
        }

        setNotices(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    }
    fetchNotices();
  }, [setNotices]);

  function deleteBtn(notice: Notice) {
    setNotice(notice);
    openModal('delete');
  }

  function editBtn(notice: Notice) {
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
    <>
      {flashy !== null ? (
        <FlashMessage
          message={flashy.message}
          type={flashy.type ?? 'error'}
          onClose={() => setFlashy(null)}
        />
      ) : (
        <div></div>
      )}
      <div className='flex flex-col gap-3 mx-auto mt-5'>
        <div className='flex flex-col gap-3 mx-auto mb-5'>
          <p className='text-7xl'>NOTICE BOARD</p>
          <button
            type='button'
            className='text-xl h-11 hover:shadow-xs hover:outline-none hover:border-0 hover:shadow-black  bg-black text-white cursor-pointer rounded border-1 mt-3'
            onClick={() => openModal('add')}
          >
            <FontAwesomeIcon icon={faCirclePlus} className='mr-5' />
            ADD task
          </button>
        </div>

        <div className='flex flex-wrap gap-5 justify-center'>
          {checkNotice == true || notices.length === 0 ? (
            <div className='text-2xl text-gray-500 mt-10'>No notices available</div>
          ) : (
            notices.map((notice) => (
              <div
                key={notice._id}
                className='flex flex-col gap-2 justify-between border-2 p-3 w-full sm:w-[48%] md:w-[31%] lg:w-[23%]'
              >
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <p className='text-3xl mb-1 break-all'>{notice.title}</p>
                    {/* <FontAwesomeIcon
                      icon={faThumbtack}
                      className='text-gray-500 hover:text-gray-800 cursor-pointer'
                      onClick={() => clickHandlerPin(notice._id)}
                    /> */}
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Notice;
