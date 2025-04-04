import { createSlice } from '@reduxjs/toolkit';
// import { UserData } from '../utils/types';

const initialState = {
  user: {},
};

const user_slice = createSlice({
  name: 'userdata',
  initialState: {
    ...initialState,
  },
  reducers: {
    addUser: (state, action) => {
      const loggedUser = {
        // id: action.payload.id,
        first_Name: action.payload.first_Name,
        last_Name: action.payload.last_Name,
        email: action.payload.email,
      };
      state.user = loggedUser;
    },
    removeUser: (state) => {
      state.user = {};
    },
    
  },
});

export const { addUser, removeUser } = user_slice.actions;
export default user_slice.reducer;