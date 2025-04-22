import Delete from '../modals/Delete';
import Form from '../modals/Form'
import Notice from '../components/Notice'
import {useNotice} from '../context/noticeContext'

function Landing() {
  const { modal } = useNotice();
  
  return (
    <>
      <div className=''>
        {modal === 'add' && (
          <div className='z-10 fixed mx-auto w-[100vw] h-lvh backdrop-blur-xs'>
            <Form />
          </div>
        )}
        {modal === 'delete' && (
          <div className='z-10 fixed mx-auto w-[100vw] h-lvh backdrop-blur-xs'>
            <Delete />
          </div>
        )}
  
        <Notice />
      </div>
    </>
  );
}

export default Landing
