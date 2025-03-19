import React, { useState } from 'react';
import { listItem } from './Wrapper';
type PropTypes = {
  addItemToList: (item: listItem) => void;
};
function AddItemForm(props: PropTypes) {
  const { addItemToList } = props;
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: Math.floor(Math.random() * 1000),
      description: input,
      isCompleted: false,
    };
    addItemToList(item);
    setInput('');
  };
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        value={input}
        type='text'
        placeholder='Add a task'
        className='todo-input'
        onChange={(e) => handleOnInputChange(e)}
      />
      <button className='todo-btn' type='submit'>
        Add
      </button>
    </form>
  );
  ;
}

export default AddItemForm;
