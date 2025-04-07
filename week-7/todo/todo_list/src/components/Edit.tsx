import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Edit() {
  return (
    <div className='ms-auto'>
      <button className='btn'>
        <FontAwesomeIcon icon={faPenToSquare} className='' />
      </button>
    </div>
  );
}

export default Edit;
