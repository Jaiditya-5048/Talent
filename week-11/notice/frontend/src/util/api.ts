import { noticeData, Notice } from './types';
// import axios from 'axios';
import { api } from './base_controller';

export async function addNoticeApi(noticeData: noticeData) {
  try {
    const response = await api.post('notice', noticeData);
    console.log(response);
    console.log(response.data);
    return response;
  } catch (error: any) {   // eslint-disable-line
    console.error('Failed to add notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function editNoticeApi(noticeData: Notice) {
  try {
    const response = await api.patch(`notice/${noticeData._id}`, noticeData);
    // console.log(response);
    // console.log(response.data);
    return response;
  } catch (error: any) { // eslint-disable-line
    console.error('Failed to add notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function deleteNoticeApi(id: string | number) {
  try {
    const response = await api.delete(`notice/${id}`);
    console.log(response);
    return response;
  } catch (error: any) { // eslint-disable-line
    console.error('Failed to delete notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function getNoticesApi() {
  try {
    const response = await api.get('notices');
    // console.log(response);
    return response;
  } catch (error: any) {   // eslint-disable-line
    console.error('Failed to fetch notices:', error.response?.data || error.message);
    return error.response;
  }
}