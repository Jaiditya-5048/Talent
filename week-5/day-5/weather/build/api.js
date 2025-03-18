"use strict";
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
// This function is used to add new user to database using API
async function postData(userData) {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            const userForm = document.getElementById('register-addUserForm');
            userForm.reset();
            console.log('User registered successfully'); // Clear form
        }
        else {
            console.error('Failed to add user:', response.status);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
// function to get a single user
async function getSingleUser(email, password = null) {
    try {
        let params = {};
        if (password !== null) {
            params = { email, password };
        }
        else {
            params = { email };
        }
        let response = await fetch('http://localhost:3000/users' + '?' + new URLSearchParams(params)); //new URLSearchParams(params) ;; params is an object and URLSearchParams is a function that converts the object into valid URL query parameters
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}
// async function verifyUser(event:Event) {
//     event.preventDefault();
//     const email = document.getElementById("email").value.trim() as HTMLInputElement;
//     const password = document.getElementById("password").value.trim();
//     try {
//         const userData = await getSingleUser(email);
//         // console.log("Fetched User Data:", userData)
//         if (userData.length === 1) {
//             // console.log("User email found:", userData);
//             document.getElementById("emailError").textContent = ""
//             $("#passwordGroup").css("display", "block");
//             verifyUserPassword(email, password)
//         } else {
//             document.getElementById("emailError").textContent = "No user found";
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//     }
