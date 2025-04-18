import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNotice } from '../context/noticeContext';
import { useEffect } from 'react';
import { getNoticesApi } from '../util/api';

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
  const { openModal, setDeleteId, notices, saveNotices } = useNotice();
  //  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const refreshFunc = async () => {
      const response = await getNoticesApi();
      saveNotices(response.data.data);
      console.log(response.data.data);
    };
    refreshFunc();
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
  return (
    <>
      <div className='flex flex-col gap-3 mx-auto mt-5'>
        <div className='flex flex-col gap-3 mx-auto mb-5'>
          <p className='text-7xl'>NOTICE BOARD</p>
          <button
            type='button'
            className='text-xl h-10 hover:bg-white hover:text-[#242424] rounded border-1 mt-3'
            onClick={() => openModal('add')}
          >
            <FontAwesomeIcon icon={faCirclePlus} className='mr-5' />
            ADD task
          </button>
        </div>

        <div className='flex flex-wrap gap-5 justify-center'>
          {notices.map((notice) => {
            return (
              <div
                key={notice._id}
                className='flex flex-col gap-2 border-2 p-3 w-full sm:w-[48%] md:w-[31%] lg:w-[23%]'
              >
                <p className='text-3xl mb-1'>{notice.title}</p>
                <p className='text-lg'>{notice.description}</p>
                <div className='flex justify-between mt-2'>
                  <p>{getDayAndMonth(notice.createdAt)}</p>
                  <button
                    type='button'
                    className='hover:text-red-600'
                    onClick={() => deleteBtn(notice._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notice;
