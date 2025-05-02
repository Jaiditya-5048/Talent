import Delete from '../modals/Delete';
import Form from '../modals/Form';
import Notice from '../components/Notice';
import { useNotice } from '../context/noticeContext';
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { arraySwap } from '@dnd-kit/sortable';
// import type { NoticeApi } from '../util/types';l
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { NoticeApi } from '../util/types';

function Landing() {
  const { modal, notices, setNotices, setDraggbleId } = useNotice();
  console.log('before:', notices);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggbleId(null);
    const { active, over } = event;
    // console.log(
    //   "active:", active.id,
    //   "over:", over
    // );

    if (!over || active.id === over.id) return;
    const oldIndex = notices.findIndex((n) => n._id === active.id);
    const newIndex = notices.findIndex((n) => n._id === over.id);
    const sortedArray = (notices: NoticeApi[]) => arraySwap(notices, oldIndex, newIndex);
    setNotices((prevNotices) => sortedArray(prevNotices));

    console.log(oldIndex, newIndex);
  };
  console.log('after:', notices);

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
        <DndContext
          modifiers={[restrictToWindowEdges]}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragStart={(e) => setDraggbleId((e.active.id).toString())}          
          onDragCancel={() => setDraggbleId(null)}
        >
          <Notice />
        </DndContext>
      </div>
    </>
  );
}

export default Landing;
