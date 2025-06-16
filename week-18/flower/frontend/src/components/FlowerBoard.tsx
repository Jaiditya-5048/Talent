import { useDroppable } from '@dnd-kit/core';
import type { DroppedFlower } from '../utils/types';
import { type ForwardedRef } from 'react';

type FlowerBoardProps = {
  droppedFlowers: DroppedFlower[];
  boardRef: ForwardedRef<HTMLDivElement>;
  onDelete: (index: number) => void; // new prop
};

function FlowerBoard({ droppedFlowers, boardRef, onDelete }: FlowerBoardProps) {
  const { setNodeRef } = useDroppable({ id: 'flower-board' });

  return (
    <div className='flex justify-center items-center h-screen bg-green-50'>
      <div className='relative w-2/4 h-3/5 border-2 border-gray-300 bg-green-800'>
        <div
          ref={(node) => {
            setNodeRef(node);
            if (typeof boardRef === 'function') boardRef(node);
            else if (boardRef) boardRef.current = node;
          }}
          className='relative w-full h-3/4 bg-white'
        >
          {droppedFlowers.map((f, i) => (
            <div key={`${f.id}-${i}`} className='absolute group' style={{ top: f.y, left: f.x }}>
              <img src={f.src} alt={f.id} className='w-30 h-30 pointer-events-none' />
    
              <button
                onClick={() => onDelete(i)}
                className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity'
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowerBoard;
