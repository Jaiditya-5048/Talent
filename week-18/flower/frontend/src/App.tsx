import './App.css';
import FlowerPalette from './components/FlowerPalette';
import FlowerBoard from './components/FlowerBoard';
import { DndContext, DragOverlay, type DragEndEvent } from '@dnd-kit/core';
import { useRef, useState } from 'react';
import type { DroppedFlower } from './utils/types';

function App() {
  const [dropped, setDropped] = useState<DroppedFlower[]>([]);
  const [activeFlower, setActiveFlower] = useState<any>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveFlower(null);

    if (over?.id === 'flower-board' && active.data.current) {
      const boardRect = boardRef.current?.getBoundingClientRect();
      const activeRect = active.rect.current?.translated;

      if (boardRect && activeRect) {
        const { id, src } = active.data.current;

        const x = activeRect.left - boardRect.left;
        const y = activeRect.top - boardRect.top;

        const flowerSize = 50; // w-30 h-30 = 90px

        const withinXBounds = x >= 0 && x + flowerSize <= boardRect.width;
        const withinYBounds = y >= 0 && y + flowerSize <= boardRect.height;

        if (withinXBounds && withinYBounds) {
          setDropped((prev) => [...prev, { id, src, x, y }]);
        } else {
          console.log('Drop canceled: flower would overflow the board.');
        }
      }
    }
  };
  const handleDelete = (index: number) => {
    setDropped((prev) => prev.filter((_, i) => i !== index));
  };
  
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={(event) => {
        setActiveFlower(event.active.data.current);
      }}
    >
      <FlowerPalette />
      <FlowerBoard droppedFlowers={dropped} boardRef={boardRef} onDelete={handleDelete} />

      <DragOverlay dropAnimation={null}>
        {activeFlower ? (
          <img
            src={activeFlower.src}
            alt={activeFlower.id}
            className='!w-30 h-30 pointer-events-none'
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
