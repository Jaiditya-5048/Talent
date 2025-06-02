import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotice } from '../context/noticeContext';
import { useEffect, useRef, useState } from 'react';
import { getCategoriesApi, getNoticesByCategoryApi, updateOrderApi } from '../util/api';
import FlashMessage from './FlashMessage';
import NoticeCard from './NoticeCard';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { categoryApiResponse } from '../util/types';

function Notice() {   
  const {
    openModal,
    notices,
    setFlashy,
    flashy,
    setNotices,
    setCategory,
    setCategoryId,
    categoryId,
    } = useNotice();
  const [checkNotice, setCheckNotice] = useState<boolean>(false);

  useEffect(() => {
    async function fetchNotices() {
      try {
        
        const catResponse = await getCategoriesApi()
        // console.log(catResponse);
        const GeneralCat:categoryApiResponse = catResponse.data.data.find((cat: categoryApiResponse) => cat.category === 'General');
        setCategory('General');
        setCategoryId(GeneralCat._id);
        
        const response = await getNoticesByCategoryApi(GeneralCat._id);
        // console.log(response);
        if (response.status !== 200) {
          setCheckNotice(true);
        } else {
          setCheckNotice(false);
        }
        setNotices(response.data.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    }
    fetchNotices();
  }, [setNotices]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDrop = async () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) return;
    

    // setNotices(updated);
    console.log(notices);
    
    console.log({
      oldIndex: from + 1,
      newIndex: to + 1,
      activeNoticeId: notices[from]._id,
      overNoticeId: notices[to]._id,
      categoryId,
    });
    

    try {
      await updateOrderApi({
        oldIndex: from + 1,
        newIndex: to + 1,
        activeNoticeId: notices[from]._id,
        overNoticeId: notices[to]._id,
        categoryId,
      });
    } catch (err) {
      console.error('Failed to update order:', err);
    }

    dragItem.current = null;
    dragOverItem.current = null;
    const response = await getNoticesByCategoryApi(categoryId);
    // console.log(response);
    if (response.status !== 200) {
      setCheckNotice(true);
    } else {
      setCheckNotice(false);
    }
    setNotices(response.data.data);
  };

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
            onClick={() => {
              openModal('add');
              setCategoryId('680f0c5d80e550f6b26a92f6');
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} className='mr-5' />
            ADD task
          </button>
        </div>
        {/* flex flex-wrap gap-5 justify-center */}
        <div>
          {checkNotice == true || notices.length === 0 ? (
            <div className=' mt-10 flex justify-center'>
              <p className='text-2xl text-gray-500'>No notices available</p>
            </div>
          ) : (
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5'>
              {notices.map((notice, index) => (
                <NoticeCard
                  key={notice._id}
                  notice={notice}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleDrop}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notice;
