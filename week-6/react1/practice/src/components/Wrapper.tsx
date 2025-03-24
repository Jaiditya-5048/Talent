import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddItemForm from './AddItemForm';
export type listItem = {
  id: number;
  description: string;
  isCompleted: boolean;
};
const keyName = 'listItems';
function Wrapper() {
  const [listItems, setListItems] = useState<listItem[]>([]);

  useEffect(() => {
    const readTodoItems = async () => {
      const localData = JSON.parse(
        localStorage.getItem(keyName) || '[]',
      ); /**await(await fetch('https://jsonplaceholder.typicode.com/todos')).json()*/
      setListItems(localData);
    };
    readTodoItems();
    // const listItems = loadItemsFromLocalstorage()
  }, []);
  const updateDB = (items: listItem[]) => {
    localStorage.setItem(keyName, JSON.stringify(items));
  };
  const handleAddItemToList = (item: listItem) => {
    const newListItems = [...listItems, item];
    setListItems(newListItems);
    updateDB(newListItems);
  };

  return (
    <div className='todo-wrapper'>
      <h1> Add Your Tasks</h1>
      <AddItemForm addItemToList={handleAddItemToList} />
      {listItems.map((item: listItem, index: number) => (
        <div className='todo-item' key={index}>
          <p className={`${item.isCompleted ? 'completed' : 'un-completed'}`}>{item.description}</p>
          <div className='action-buttons'>
            {/* <FontAwesomeIcon icon={faPenToSquare} /> */}
            {/* <FontAwesomeIcon icon={faTrash} /> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wrapper;
