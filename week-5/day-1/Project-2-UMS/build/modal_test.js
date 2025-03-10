"use strict";
// Define Types
// type Name = {
//     firstName: string;
//     lastName: string;
// };
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// type Address = {
//     houseNumber: string;
//     area: string;
//     city: string;
//     pin: number;
// };
// enum Roles {
//     ADMIN = "Admin",
//     EMPLOYEE = "Employee",
//     CUSTOMER = "Customer"
// }
// class User {
//     id: number;
//     name: Name;
//     email: string;
//     password: string;
//     address: Address;
//     phone: number;
//     company: string;
//     website: string;
//     role: Roles;
//     constructor(
//         id: number,
//         name: Name,
//         email: string,
//         password: string,
//         address: Address,
//         phone: number,
//         company: string,
//         website: string,
//         role: Roles
//     ) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.address = address;
//         this.phone = phone;
//         this.company = company;
//         this.website = website;
//         this.role = role;
//     }
// }
// Class for Managing User Form Operations
class UserForm {
    constructor() {
        this.userId = null; // Determines Add/Edit action
        const modalElement = document.getElementById("addEmployeeModal");
        this.modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
        });
        this.setupFormSubmitHandler();
    }
    // **Populate Form for Editing**
    editUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield getSingleUser(id);
            if (!userData) {
                console.error("User not found!");
                return;
            }
            this.userId = id; // Store user ID (null means "Add", non-null means "Edit")
            // Populate form fields
            document.getElementById("firstName").value = userData.name.firstName;
            document.getElementById("lastName").value = userData.name.lastName;
            document.getElementById("email").value = userData.email;
            document.getElementById("houseNumber").value = userData.address.houseNumber;
            document.getElementById("area").value = userData.address.area;
            document.getElementById("city").value = userData.address.city;
            document.getElementById("pin").value = String(userData.address.pin);
            document.getElementById("phone").value = String(userData.phone);
            document.getElementById("role").value = userData.role;
            document.getElementById("company").value = userData.company;
            document.getElementById("website").value = userData.website;
            // Update modal UI
            document.getElementById("modalHeader").innerText = "Edit Employee Data";
            document.getElementById("submitBtn").value = "EDIT";
            this.modal.show(); // Show modal
        });
    }
    // **Extract User Data from Form**
    getUserFromForm() {
        var _a;
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const name = {
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1)
        };
        const houseNumber = document.getElementById("houseNumber").value.trim();
        const area = document.getElementById("area").value.trim();
        const city = document.getElementById("city").value.trim();
        const pin = parseInt(document.getElementById("pin").value.trim(), 10);
        const address = { houseNumber, area, city, pin };
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const phone = parseInt(document.getElementById("phone").value.trim(), 10);
        const company = document.getElementById("company").value.trim();
        const website = document.getElementById("website").value.trim();
        const roleValue = document.getElementById("roles").value.trim();
        const role = Object.values(Roles).includes(roleValue) ? roleValue : Roles.CUSTOMER;
        return new User((_a = this.userId) !== null && _a !== void 0 ? _a : Date.now() + Math.random(), // If `userId` is null, create a new ID
        name, email, password, address, phone, company, website, role);
    }
    // **Handle Form Submission (Add or Edit)**
    handleSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const userData = this.getUserFromForm();
            if (this.userId === null) {
                // Add new user
                yield postData(userData);
            }
            else {
                // Edit existing user
                yield putData(userData);
                this.userId = null; // Reset userId after edit
            }
            this.modal.hide(); // Close the modal
        });
    }
    // **Setup Event Listener for Form Submission**
    setupFormSubmitHandler() {
        const form = document.getElementById("addUserForm");
        form.addEventListener("submit", (event) => this.handleSubmit(event));
    }
}
// **Instantiate the UserForm class**
const usrForm = new UserForm();
