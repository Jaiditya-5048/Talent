import { ApiCart, ApiResponseProductData, UserData } from './types';

export const ProductUrl: string = 'https://dummyjson.com/products';

export async function getProductData(): Promise<ApiResponseProductData | null> {
  try {
    const response = await fetch(`${ProductUrl}`);
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
    const response = await fetch('http://localhost:8080/user', {
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

export async function checkEmail(email: string) {
  try {
    const response = await fetch('http://localhost:8080/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return [response, data];
    }
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

// This function is used to replace data in database using API
export async function updateCartData(email: string, apiCart: ApiCart) {
  try {
    const response = await fetch(`http://localhost:3000/cart/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiCart),
    });

    if (response.ok) {
      console.log('Updated user successfully!');
      // const userForm = document.getElementById("addUserForm") as HTMLFormElement;
    } else {
      console.error('Failed to update user:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to post CartData
export async function postCartData(CartData: ApiCart) {
  try {
    const response = await fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(CartData),
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

export async function getCartById(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/cart/${id}`);

    if (!response.ok) {
      throw new Error(`Cart not found: ${response.status}`);
    }

    const data = await response.json();
   
    return data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}