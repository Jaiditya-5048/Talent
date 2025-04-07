import { useEffect, useState } from 'react';
import { ListItem } from '../utils/type';
import Add from './addForm';
import { getData } from '../utils/api';
import Delete from './Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


function Wrapper() {
  const [tasks, setTasks] = useState<ListItem[]>([]);
  const [editingTask, setEditingTask] = useState<ListItem | null>(null);


  const fetchData = async () => {
    const tasks = await getData();
    if (tasks) setTasks(tasks);
  };

  const handleEdit = (task: ListItem) => {
    setEditingTask(task);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id='todo-wrapper'>
      <p className='h1 mb-3 text-white'>Add your Tasks</p>
      <Add onTaskAdded={fetchData} editingTask={editingTask} setEditingTask={setEditingTask} />
      {tasks.map((item: ListItem) => (
        <div className='todo-item' key={item.id}>
          <p>{item.description}</p>
          <div className='d-flex'>
            <Delete id={item.id} onTaskAdded={fetchData} />
            <div>
              <button className='btn' onClick={() => handleEdit(item)}>
                <FontAwesomeIcon icon={faPenToSquare} className='' />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wrapper;
