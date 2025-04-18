import Delete from '../components/Delete';
import Form from '../components/Form'
import Notice from '../components/Notice'
import {useNotice} from '../context/noticeContext'

function Landing() {
  const { modal, openModal, closeModal } = useNotice();
  
  return (
    <>
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
    </>
  );
}

export default Landing
