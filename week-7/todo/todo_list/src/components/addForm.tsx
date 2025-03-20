type listItem = {
  id: number;
  description: string;
  isCompleted: boolean;
};

function saveToLocal(tasks: listItem) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function Add() {
  const [input, setInput] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: Math.floor(Math.random() * 100),
      description: input,
    };
    saveToLocal(input);
    setInput('');
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const liveInupt = event.target.value;
    setInput(liveInupt);
  };
  return (
    <form onSubmit={Add}>
      <input type='text' id='task-input' value={input} onChange={handleOnInput} />
      <button className='add-btn' type='submit'>
        ADD
      </button>
    </form>
  );
}

export default add;

// import React, { useState } from 'react';
// import { listItem } from './Wrapper';
// type PropTypes = {
//   addItemToList: (item: listItem) => void;
// };
// function AddItemForm(props: PropTypes) {
//   const { addItemToList } = props;
//   // const [input, setInput] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     console.log(e.target);

//     const form = e.target as HTMLFormElement
//     const inputElement = form[0] as HTMLInputElement
//     const input = inputElement.value
//     e.preventDefault();
//     const item = {
//       id: Math.floor(Math.random() * 1000),
//       description: input,
//       isCompleted: false,
//     };
//     addItemToList(item);
//     inputElement.value = "";

//   };
//   // const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const inputValue = event.target.value;
//   //   setInput(inputValue);
//   // };
//   return (
//     <form className='todo-form' onSubmit={handleSubmit}>
//       <input
//         // value={input}
//         type='text'
//         placeholder='Add a task'
//         className='todo-input'
//         id="input"
//         // onChange={(e) => handleOnInputChange(e)}
//       />
//       <button className='todo-btn' type='submit'>
//         Add
//       </button>
//     </form>
//   );
// }

// export default AddItemForm;
