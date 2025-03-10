// import {User} from "./types"
// import { loadTable } from "./index";

const URL_MAIN:string = "http://localhost:3000/users/"
type apiMethods = 'GET'|'POST'|'DELETE'

async function callAPI(endpoint: string, method: apiMethods, body = null): Promise<unknown> {
   return await(await fetch(URL_MAIN, {
    method, 
    /// condtionaly add body here
   })).json()
}

// Funtion to get data from API
async function allDataFunc() {
    try {
        let response = await fetch(URL_MAIN);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
} 


// // function to delete user and update the database using DELETE
// export async function deleteUser(user_id: number, event: SubmitEvent): Promise<void> {
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


// // This function is used to replace data in database using API
// export async function putData(userData: User) {
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


// // This function is used to add new user to database using API
// export async function postData(userData: User) {
//     try {
//         const response = await fetch("http://localhost:3000/users", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData)
//         });

//         if (response.ok) {
//             const userForm = document.getElementById("addUserForm") as HTMLFormElement;
//             userForm.reset();                                                                       // Clear form
//             const userFormSubmitBtn = document.getElementById("submitBtn") as HTMLFormElement;
//             userFormSubmitBtn.disabled = true;                                                      // Disable submit button again
//             loadTable();                                                                            // Refresh table
//         } else {
//             console.error("Failed to add user:", response.status);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
