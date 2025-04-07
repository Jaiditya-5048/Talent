import { useEffect, useState } from 'react';
import { postData, updateData } from '../utils/api';
import { AddProps, ListItem } from '../utils/type';

function Add({ onTaskAdded, editingTask, setEditingTask }: AddProps) {
  const [input, setInput] = useState('');
  const [isEmpty, setEmpty] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setInput(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" ) {
      setEmpty(true);
      setTimeout(() => setEmpty(false), 300);
    } else {
      if (editingTask) {
        const updatedTask = {
          ...editingTask,
          description: input,
        };
        await updateData(updatedTask); // <-- defined in your API utils
        setEditingTask(null);
      } else {
        const task: ListItem = {
          id: Math.floor(Math.random() * 100).toString(),
          description: input,
          isCompleted: false,
        };
        await postData(task);
      }

      setInput('');
      onTaskAdded();
    }
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmission}>
      <div className={isEmpty ? 'input-group mb-3 shake' : 'input-group mb-3'}>
        <input
          type='text'
          className='form-control border-3'
          placeholder='Enter a task'
          value={input}
          onChange={handleOnInput}
        />
        <button className='btn btn-outline-secondary' type='submit'>
          {editingTask ? 'Update' : 'ADD'}
        </button>
      </div>
    </form>
  );
}

export default Add;
