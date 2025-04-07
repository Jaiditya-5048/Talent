import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteData } from '../utils/api';

interface DeleteProps {
  id: string;
  onTaskAdded: () => void;
}

function Delete({ id, onTaskAdded }: DeleteProps) {
  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await deleteData(id);
    onTaskAdded();
  }
  return (
    <div className='ms-auto'>
      <button onClick={(e) => handleDelete(e)} className='btn'>
        <FontAwesomeIcon icon={faTrash} className='' />
      </button>
    </div>
  );
}

export default Delete;
