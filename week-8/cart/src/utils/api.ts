import { ApiResponseProductData, UserData } from './types';


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

// Function to post UserData
export async function postData(userData: UserData) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
    console.log('User registered successfully');
    } else {
      console.error('Failed to add user:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// function to get a single user
export async function getSingleUser(
  params: { email: string; password?: string } | { id: string },
): Promise<UserData[] | null> {
  try {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();

    const response = await fetch(`http://localhost:3000/users?${queryParams}`);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}