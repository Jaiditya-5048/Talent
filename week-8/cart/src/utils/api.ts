import { ApiResponseProductData } from './types';


export const ProductUrl: string = 'https://dummyjson.com/products'; 

export async function getProductData() : Promise<ApiResponseProductData | null> {
  try {
    const response = await fetch(`${ProductUrl}`)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
  
}