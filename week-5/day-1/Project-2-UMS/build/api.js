"use strict";
// import {User} from "./types"
// import { loadTable } from "./index";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const URL_MAIN = "http://localhost:3000/users/";
function callAPI(endpoint_1, method_1) {
    return __awaiter(this, arguments, void 0, function* (endpoint, method, body = null) {
        return yield (yield fetch(URL_MAIN, {
            method,
            /// condtionaly add body here
        })).json();
    });
}
// Funtion to get data from API
function allDataFunc() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(URL_MAIN);
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            return yield response.json();
        }
        catch (error) {
            console.error("Error fetching user data:", error);
            return [];
        }
    });
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
