"use strict";
var _a, _b;
window.onload = function () {
    var _a, _b;
    (_a = document.getElementById('loginbtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', triggerLogin);
    (_b = document.getElementById('registerbtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        triggerRegister();
        new FormValidator('register-form', 'form-register-btn');
    });
};
// Vlaidation class for login
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('login-form', 'form-login-btn');
});
function triggerLogin() {
    const domInstance = new Dom();
    domInstance.removeClass('loginbtn', 'text-[#5c90c6] bg-white');
    domInstance.addClass('loginbtn', 'text-white bg-[#5c90c6]');
    domInstance.removeClass('registerbtn', 'text-white bg-[#5c90c6]');
    domInstance.addClass('registerbtn', 'text-[#5c90c6] bg-white');
    domInstance.addClass('register-form', 'hidden');
    domInstance.removeClass('login-form', 'hidden');
}
function triggerRegister() {
    const domInstance = new Dom();
    domInstance.removeClass('registerbtn', 'text-[#5c90c6] bg-white');
    domInstance.addClass('registerbtn', 'text-white bg-[#5c90c6]');
    domInstance.removeClass('loginbtn', 'text-white bg-[#5c90c6]');
    domInstance.addClass('loginbtn', 'text-[#5c90c6] bg-white');
    domInstance.addClass('login-form', 'hidden');
    domInstance.removeClass('register-form', 'hidden');
}
//Login-form
(_a = document.getElementById('form-login-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', loginUser);
async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    const userData = await getSingleUser(email, password);
    if (userData.length === 0) {
        console.log('Wrong email or password');
        alert('Wrong email or password');
    }
    else {
        console.log('user logged in successfully');
        console.log('user: ', userData);
    }
}
// Register-form
(_b = document.getElementById('form-register-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', registerUser);
function registerUser(event) {
    event.preventDefault();
    const fName = document.getElementById('first-name').value.trim();
    const lName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email-register').value.trim();
    const password = document.getElementById('password-register').value.trim();
    const userData = {
        id: Date.now() + Math.random(),
        name: {
            fName: fName.charAt(0).toUpperCase() + fName.slice(1),
            lName: lName.charAt(0).toUpperCase() + lName.slice(1),
        },
        email,
        password,
    };
    console.log(userData);
    postData(userData);
}
