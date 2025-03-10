"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const api_1 = require("./api");
const URL_MAIN = "http://localhost:3000/users/";
let btnChange;
let userId;
// Handle form submission
// document.getElementById("addUserForm").addEventListener("submit", 
function submitForm(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault(); // Prevent default form submission
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const name = {
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1)
        };
        const houseNumber = (document.getElementById("houseNumber").value.trim());
        const area = document.getElementById("area").value.trim();
        const city = document.getElementById("city").value.trim();
        const pin = parseInt(document.getElementById("pin").value.trim(), 10);
        const address = {
            houseNumber: houseNumber,
            area: area,
            city: city,
            pin: pin
        };
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const phone = parseInt(document.getElementById("phone").value.trim(), 10);
        const company = document.getElementById("company").value.trim();
        const website = document.getElementById("website").value.trim();
        const roleValue = document.getElementById("roles").value.trim();
        const role = Object.values(types_1.Roles).includes(roleValue) ? roleValue : types_1.Roles.CUSTOMER;
        // const userData : User;
        if (btnChange === true) { //Add user
            const userData = {
                id: Date.now() + Math.random(),
                name,
                email,
                password,
                address,
                phone,
                company,
                website,
                role
            };
            (0, api_1.postData)(userData);
            btnChange = null;
        }
        else {
            if (userId === null) {
                console.log("error");
            }
            else {
                const userData = {
                    id: userId,
                    name,
                    email,
                    password,
                    address,
                    phone,
                    company,
                    website,
                    role
                };
                (0, api_1.putData)(userData);
                // debugger
                userId = null;
                // debugger
                let btnChange = null;
            }
        }
        ;
    });
}
