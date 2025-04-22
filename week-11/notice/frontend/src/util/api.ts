import { noticeData } from './types';
// import axios from 'axios';
import { api } from './base_controller';

export async function addNoticeApi(noticeData: noticeData) {
  try {
    const response = await api.post('notice', noticeData);
    console.log(response);
    console.log(response.data);
    return response;
  } catch (error: any) {
    console.error('Failed to add notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function deleteNoticeApi(id: string | number) {
  try {
    const response = await api.delete(`notice/${id}`);
    console.log(response);
    return response;
  } catch (error: any) {
    console.error('Failed to delete notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function getNoticesApi() {
  try {
    const response = await api.get('notice');
    // console.log(response);
    return response;
  } catch (error: any) {
    console.error('Failed to fetch notices:', error.response?.data || error.message);
    return error.response;
  }
}

// import { api } from '../base_controller';
// import { User_Login } from '../../types/types';

// // FUNCTION TO REGISTER A NEW USER
// export const login_user = async (userData: User_Login) => {
//   try {
//     const response = await api.post('/users/login/', userData);
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };

// export default api;