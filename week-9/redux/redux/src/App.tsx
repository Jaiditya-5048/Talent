import React, { useRef } from 'react';
import { addForm } from './redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { nanoid } from '@reduxjs/toolkit';

function App() {
  const dispatch = useDispatch();
  const forms = useSelector((state: any) => state.forms); // Get forms data from Redux state
  const nameInp = useRef<HTMLInputElement>(null);
  const emailInp = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInp.current?.value || !emailInp.current?.value) return;
    const obj = {
      id: nanoid(),
      name: nameInp.current.value,
      email: emailInp.current.value,
    };

    dispatch(addForm(obj));
    nameInp.current.value = '';
    emailInp.current.value = '';
  };

  return (
    <>
      <div>
        {forms.map((d: { id: string; name: string; email: string }) => (
          <div key={d.id}>
            <div>{d.name}</div>
            <div>{d.email}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='name' ref={nameInp} />
        <input type='text' placeholder='email' ref={emailInp} />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default App;
