import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@src/apis/ApiConstant';

const createAxiosInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: API_BASE_URL,
        withCredentials: true, // Enable cookies for authentication
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const axiosInstance = createAxiosInstance();

export const requestBuilder = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error; // This line is unreachable but satisfies TypeScript's return checking
        }
    },
    post: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error; // This line is unreachable but satisfies TypeScript's return checking
        }
    },
};

const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Request failed';
        console.error('Axios Error:', errorMessage);
        throw new Error(errorMessage);
    }
    console.error('Unexpected Error:', error);
    throw new Error('An unexpected error occurred');
};

 