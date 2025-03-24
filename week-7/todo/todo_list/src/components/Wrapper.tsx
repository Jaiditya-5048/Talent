// import { useState } from "react";

type listItem = {
  id: number;
  description: string;
  isCompleted: boolean;
};

const list: listItem[] = [
  { id: 1, description: 'Buy groceries', isCompleted: false },
  { id: 2, description: 'Finish React project', isCompleted: true },
  { id: 3, description: 'Read a book', isCompleted: false },
  { id: 4, description: 'Exercise for 30 minutes', isCompleted: false },
  { id: 5, description: 'Call Mom', isCompleted: true },
];

function getFromLocal() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : []; // Ensures an empty array if tasks are not found
}

function Wrapper() {
  // const [listItems, setListItems] = useState<listItem[]>([])

  const tasks: listItem[] = getFromLocal();

  return (
    <div id='todo-wrapper'>
      <h1>Add your Tasks</h1>
      <input type='text' name='task' id='task-input-bar' />
      {list.map((item: listItem) => (
        <div className='todo-item' key={item.id}>
          <p> {item.description}</p>
        </div>
      ))} 
    </div>
  );
}

export default Wrapper;
