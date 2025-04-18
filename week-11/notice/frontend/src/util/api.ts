import { noticeData } from "./types";
import axios from 'axios';


export async function addNoticeApi(noticeData: noticeData) {
  try {
    const response = await axios.post('http://localhost:8080/', noticeData);
    console.log(response)
    console.log(response.data);
    return response;
  } catch (error: any) {
    console.error('Failed to add notice:', error.response?.data || error.message);
    return error.response
  }
}

export async function deleteNoticeApi(id: string | number) {
  try {
    const response = await axios.delete(`http://localhost:8080/${id}`);
    console.log(response);
    return response;
  } catch (error: any) {
    console.error('Failed to delete notice:', error.response?.data || error.message);
    return error.response;
  }
}

export async function getNoticesApi() {
  try {
    const response = await axios.get('http://localhost:8080/');
    // console.log(response);
    return response;
  } catch (error: any) {
    console.error('Failed to fetch notices:', error.response?.data || error.message);
    return error.response;
  }
}
