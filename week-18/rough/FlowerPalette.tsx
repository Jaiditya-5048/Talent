import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import './FlowerPalette.css';

function FlowerPalette() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'flower-palette',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <>
      <div className='fixed h-140 w-80 top-20 ml-2 flex flex-col gap-2 p-2 border-2 border-gray-300 bg-[#e4e4e44f] shadow-lg scroll-hidden overflow-y-auto'>
        <p className='bg-amber-50 self-center text-2xl'>Flower Palette</p>
        <div className='flex flex-wrap gap-5 justify-center m-3'>
          <p>Rose</p>
          <div className='flex flex-wrap gap-2 justify-center'>
            <img
              ref={setNodeRef}
              {...listeners}
              {...attributes}
              key={'rose_red'}
              className='size-30 border-2 bg-[#f0f6fb7a] border-gray-300  shadow-lg p-1 '
              src='../public/flowers/rose/rose_red.png'
              alt=''
            />
            <img
              key={'rose_white'}
              className='size-30 border-2 bg-[#f0f6fb7a] border-gray-300  shadow-lg p-1'
              src='../public/flowers/rose/rose_white.png'
              alt=''
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-5 justify-center m-3'>
          <p>Hydrangea</p>
          <div className='flex flex-wrap gap-2 justify-center'>
            <img
              key={'hydrangea_pink'}
              className='size-30 border-2 bg-[#f0f6fb7a] border-gray-300  shadow-lg p-1'
              src='../public/flowers/hydrangea/hydrangea_pink.png'
              alt=''
            />
            <img
              key={'hydrangea_purple'}
              className='size-30 border-2 bg-[#f0f6fb7a] border-gray-300  shadow-lg p-1'
              src='../public/flowers/hydrangea/hydrangea_purple.png'
              alt=''
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-5 justify-center m-3'>
          <p>Lily</p>
          <div className='flex flex-wrap gap-2 justify-center'>
            <img
              key={'lily_white'}
              className='size-30 border-2 bg-[#f0f6fb7a] border-gray-300  shadow-lg p-1'
              src='../public/flowers/lily/lily_purple.png'
              alt=''
            />
            <img
              key={'lily_yellow'}
              className='size-30 border-2 bg-[#f0f6fb7a] border-gray-300  shadow-lg p-1'
              src='../public/flowers/lily/lily_yellow.png'
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  );
}
