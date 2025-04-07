import { configureStore } from '@reduxjs/toolkit';
import  formReducer  from '../redux/slice';
export const store = configureStore({
  reducer: formReducer,
});
