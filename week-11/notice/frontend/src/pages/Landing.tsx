import Delete from '../modals/Delete';
import Form from '../modals/Form';
import Notice from '../components/Notice';
import { useNotice } from '../context/noticeContext';
import { DndContext } from '@dnd-kit/core';

function Landing() {
  const { modal } = useNotice();

  return (
    <>
      <div className='mb-5'>
        {modal === 'add' && (
          <div className='z-10 fixed mx-auto w-[100vw] top-0 h-lvh backdrop-blur-xs'>
            <Form />
          </div>
        )}
        {modal === 'delete' && (
          <div className='z-10 fixed mx-auto w-[100vw] top-0 h-lvh backdrop-blur-xs'>
            <Delete />
          </div>
        )}
        <DndContext>
          <Notice />
        </DndContext>
      </div>
    </>
  );
}

export default Landing;
