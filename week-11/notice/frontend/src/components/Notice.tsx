import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faThumbtack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNotice } from '../context/noticeContext';
import { useCallback, useEffect, useState } from 'react';
import { getNoticesApi } from '../util/api';
import FlashMessage from './FlashMessage';

// const data = [
//   {
//     id: 1,
//     title: 'test 1',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 2,
//     title: 'test 2',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 3,
//     title: 'test 3',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 4,
//     title: 'test 4',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 5,
//     title: 'test 5',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 6,
//     title: 'test 6',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 7,
//     title: 'test 7',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 8,
//     title: 'test 8',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 9,
//     title: 'test 9',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
//   {
//     id: 10,
//     title: 'test 10',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
//   },
// ];

function Notice() {
  const { openModal, setDeleteId, notices, saveNotices, setFlashy, flashy } = useNotice();
   const [checkNotice, setCheckNotice] = useState<boolean>(false);

  const fetchNotices = useCallback(async () => {
    try {
      const response = await getNoticesApi();
      if (response.status !== 200) {
        setCheckNotice(true);
      } else {
        setCheckNotice(false);
      }
      
      
      saveNotices(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  }, [saveNotices]);

  useEffect(() => {
    fetchNotices();
  }, []);

  function deleteBtn(id: string | number) {
    setDeleteId(id);
    openModal('delete');
  }

  function getDayAndMonth(dateStr: string): string {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const result = day + ', ' + month;

    return result;
  }

  function clickHandlerPin (id: number | string) {
    const notice = notices.filter((notice) => notice._id === id);
    notice[0].pin = true
    console.log(notice);
    
    
  }
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
          {checkNotice == true ? (
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
                    <FontAwesomeIcon
                      icon={faThumbtack}
                      className='text-gray-500 hover:text-gray-800 cursor-pointer'
                      onClick={() => clickHandlerPin(notice._id)}
                    />
                  </div>

                  <p className='text-lg break-all'>{notice.description}</p>
                </div>
                <div className='flex justify-between mt-2 bottom-0'>
                  <p className='text-gray-500'>{getDayAndMonth(notice.createdAt)}</p>
                  <button
                    type='button'
                    className='hover:text-red-900 text-red-600 cursor-pointer text-lg'
                    onClick={() => deleteBtn(notice._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
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
