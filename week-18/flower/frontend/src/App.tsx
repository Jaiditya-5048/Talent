import './App.css'
import FlowePalette from './components/FlowePalette'
import FlowerBoard from './components/FlowerBoard'
import { DndContext } from '@dnd-kit/core';

function App() {

  return (
    <>
      {/* <div className='h-screen w-screen bg-[#f0f6fb]'>
        <div className=''>
          <div></div>

          <div className='ml-100'></div>
        </div>
      </div> */}
      <DndContext>
      <FlowePalette />
      <FlowerBoard />
      </DndContext>
    </>
  );
}

export default App
