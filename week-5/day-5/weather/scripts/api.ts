async function getWeatherData(
  latitude: number,
  longitude: number,
): Promise<WeatherAPIResponse | undefined> {
  const appid = 'ac0060d9268737b9a39758878ad38c54';
  const units = 'metric';
  const exclude = 'minutely';

  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      appid: appid,
      units: units,
      exclude: exclude,
    });

    let response = await fetch('https://api.openweathermap.org/data/3.0/onecall?' + params);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    // return {};
  }
}

//api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}

async function getCoordinates(name: string): Promise<GeoAPIResponse | undefined> {
  const appid = 'ac0060d9268737b9a39758878ad38c54';

  try {
    const params = new URLSearchParams({ 
      limit: '1',
      appid: appid,
    });

    let response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + name + "&" + params);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    // return ;
  }
}

async function getCityName(
  latitude: latitude,
  longitude: longitude,
): Promise<ReverseGeoAPIResponse | []> {
  const appid = 'ac0060d9268737b9a39758878ad38c54';
  const limit = '1';

  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      limit: limit,
      appid: appid,
    });

    let response = await fetch('http://api.openweathermap.org/geo/1.0/reverse?' + params);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}

async function getDateAndTime(
  latitude: latitude,
  longitude: longitude,
): Promise<WorldTimeAPIResponse | undefined> {


  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
    });

     let response = await fetch('https://api.api-ninjas.com/v1/worldtime?' + params, {
       headers: {
         'X-Api-Key': '/8Nnl2f5zM8wsfzvzF8RbA==vwveDTwyOi55OXIU',
       },
     });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    ;
  }
}

async function getWhishlistAPI(user_id:string) : Promise< ApiWhishlist | null> {
    try {
      
      let response = await fetch(
        `http://localhost:3000/whishlist/${user_id}`,
      ); 
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  
}


// Function to send whishlist data
async function postWishlist(whishlist: ApiWhishlist) {
  try {
    const response = await fetch('http://localhost:3000/whishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(whishlist),
    });
    if (response.ok) {
      console.log('User whishlist updated successfully'); // Clear form
    } else {
      console.error('Failed to update whishlist', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//Function to replace whishlist data
async function replaceWishlist(user_id: string, whishlist: ApiWhishlist): Promise<void> {
  try {
    // const params = new URLSearchParams({
    //   user_id: user_id,
    // });
    const response = await fetch(`http://localhost:3000/whishlist/${user_id}` , {
      method: 'PUT', // Use PUT to replace the entire object
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(whishlist),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedObject = await response.json();
    // return updatedObject;
  } catch (error) {
    console.error('Error replacing object:', error);
    throw error;
  }
}

// This function is used to add new user to database using API
async function postData(userData: UserData) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const userForm = document.getElementById('register-addUserForm') as HTMLFormElement;
      userForm.reset();
      console.log('User registered successfully'); // Clear form
    } else {
      console.error('Failed to add user:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// function to get a single user
async function getSingleUser(email: string, password: string | null = null) : Promise<UserData[] | null> {
  try {
    let params = {};
    if (password !== null) {
      params = { email, password };
    } else {
      params = { email };
    }

    let response = await fetch('http://localhost:3000/users' + '?' + new URLSearchParams(params)); //new URLSearchParams(params) ;; params is an object and URLSearchParams is a function that converts the object into valid URL query parameters
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
    
  }
}


// function to delete user and update the database using DELETE
// async function deleteUser(user_id: number, event: SubmitEvent): Promise<void> {
//     if (event) event.preventDefault(); // Prevent default only if event exists
//     console.log(user_id)
//     debugger
//     try {
//         let response = await fetch(URL_MAIN + user_id, { method: "DELETE" });
//         if (response.ok) {
//             console.log(`User with ID ${user_id} deleted successfully.`);
//             loadTable();                                                    // Refresh the table after deletion
//         } else {
//             console.error(`Failed to delete user: ${response.status}`);
//         }
//     } catch (error) {
//         console.error("Error deleting user:", error);
//     }
// }

// This function is used to replace data in database using API
// async function putData(userData: User) {
//     try {
//         const response = await fetch(`${URL}/${userData.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData)
//         });

//         if (response.ok) {
//             console.log("Updated user successfully!");
//             const userForm = document.getElementById("addUserForm") as HTMLFormElement;
//             userForm.reset();                                                                       // Clear form
//             const userFormSubmitBtn = document.getElementById("submitBtn") as HTMLFormElement;
//             userFormSubmitBtn.disabled = true;                                                      // Disable submit button again
//             loadTable();                                                                            // Refresh table
//         } else {
//             console.error("Failed to update user:", response.status);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }


// http://api.openweathermap.org/geo/1.0/direct?q=chandigarh&limit=5&appid=ac0060d9268737b9a39758878ad38c54

// async function getWeatherData(latitude: number, longitude: number) {
//   const appid = 'ac0060d9268737b9a39758878ad38c54';

//   try {
//       const params = new URLSearchParams({
//         lat: latitude.toString(),
//         lon: longitude.toString(),
//         appid: appid,
//       });

//     let response = await fetch(
//       'https://api.openweathermap.org/data/2.5/weather?' + params,
//     );
//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return [];
//   }
// }

// async function getWeatherData(latitude: number, longitude: number) {
//   const appid = 'ac0060d9268737b9a39758878ad38c54';
//   const units = 'metric';

//   try {
//     const params = new URLSearchParams({
//       lat: latitude.toString(),
//       lon: longitude.toString(),
//       appid: appid,
//       units: units,
//     });

//     let response = await fetch('https://api.openweathermap.org/data/2.5/weather?' + params);
//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return [];
//   }
// }
