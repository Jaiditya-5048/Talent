import { noticeData, NoticeApi } from './types';
// import axios from 'axios';
import { api } from './base_controller';

export async function addNoticeApi(noticeData: noticeData) {
  try {
    const response = await api.post('notice', noticeData);    
    return response;
  } catch (error: any) {    // eslint-disable-line
    console.error('Failed to add notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function editNoticeApi(noticeData: NoticeApi) {
  try {
    const response = await api.patch(`notice/${noticeData._id}`, noticeData);
    // console.log(response);
    // console.log(response.data);
    return response;
  } catch (error: any) {    // eslint-disable-line
    console.error('Failed to add notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function deleteNoticeApi(id: string | number) {
  try {
    const response = await api.delete(`notice/${id}`);
    return response;
  } catch (error: any) {    // eslint-disable-line
    console.error('Failed to delete notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function getNoticesApi() {
  try {
    const response = await api.get('notices');
    // console.log(response);
    return response;
  } catch (error: any) { // eslint-disable-line
    console.error('Failed to fetch notices:', error.response?.data || error.message);
    return error.response;
  }
}

export async function getNoticesByCategoryApi(categoryId: string) {
  try {
    const response = await api.get(`notices/category/${categoryId}`);
    return response;
  } catch (error: any) {  // eslint-disable-line
    console.error('Failed to fetch notices by category:', error.response?.data || error.message);
    return error.response;
  }
}


///////////////////////////////////////////////////////////////////////////////////

export async function addCategoryApi(category: {category: string}) {
  try {
    const response = await api.post('category', category);
    console.log(response);
    console.log(response.data);
    return response;
  } catch (error: any) { // eslint-disable-line
    console.error('Failed to add category:', error.response?.data || error.message);
    return error.response;
  }
}

export async function getCategoriesApi() {
  try {
    const response = await api.get('category');
    // console.log(response);
    // console.log(response.data);
    return response;
  } catch (error: any) { // eslint-disable-line
    console.error('Failed to fetch categories:', error.response?.data || error.message);
    return error.response;
  }
}

export async function deleteCategoryApi(id: string) {
  try {
    const response = await api.delete(`category/${id}`);
    console.log(response);
    console.log(response.data);
    return response;
  } catch (error: any) {  // eslint-disable-line
    console.error('Failed to delete category:', error.response?.data || error.message);
    return error.response;
  }
}
