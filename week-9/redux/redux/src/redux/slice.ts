import { createSlice, nanoid } from '@reduxjs/toolkit';
const initialState = {
  forms: [
    {
      id: nanoid(),
      name: '',
      email: '',
    },
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action) => {
      console.log(action.payload);
      state.forms.push(action.payload);
    },
    // getForm: (state, action) => {
    //   state.forms.fin
    // }
  },
});

export const { addForm } = formSlice.actions;
export default formSlice.reducer;
