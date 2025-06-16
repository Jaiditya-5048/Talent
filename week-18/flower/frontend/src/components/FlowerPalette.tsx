import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import './FlowerPalette.css';

type Flower = { id: string; src: string; name: string };

const flowers: Flower[] = [
  { id: 'rose_red', src: '/flowers/rose/rose_red.png', name: 'Rose Red' },
  { id: 'rose_white', src: '/flowers/rose/rose_white.png', name: 'Rose White' },
  { id: 'hydrangea_pink', src: '/flowers/hydrangea/Hydrangea_pink.png', name: 'Hydrangea Pink' },
  {
    id: 'hydrangea_purple',
    src: '/flowers/hydrangea/Hydrangea_purple.png',
    name: 'Hydrangea Purple',
  },
  { id: 'lily_white', src: '/flowers/lily/lily_purple.png', name: 'Lily White' },
  { id: 'lily_yellow', src: '/flowers/lily/lily_yellow.png', name: 'Lily Yellow' },
];

function DraggableFlower({ flower }: { flower: Flower }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: flower.id,
    data: flower,
  });

  if (isDragging) return null;

  // Apply transform only if NOT dragging
  const style =
    !isDragging && transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      src={flower.src}
      alt={flower.id}
      className={`w-30 h-30 m-2 p-1 ${isDragging ? 'opacity-50' : ''}`}
      style={style} 
    />
  );
}

function FlowerPalette() {
  return (
    <>
      <div className='fixed h-140 w-80 top-20 ml-2 flex flex-col gap-2 p-2 border-2 border-gray-300 bg-[#e4e4e44f] shadow-lg scroll-hidden overflow-y-auto'>
        <p className=' self-center text-2xl mb-3'>Flower Palette</p>

        <div className='flex flex-wrap gap-3'>
          {flowers.map((f) => (
            <div className=' w-35 border-1 border-gray-300 flex flex-col items-center justify-cente shadow-md rounded-lg pt-2'>
              <p className='text-sm'>{f.name}</p>
              <DraggableFlower key={f.id} flower={f} />
              </div>
           
          ))}
        </div>
      </div>
    </>
  );
}

export default FlowerPalette;
