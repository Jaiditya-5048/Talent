"use strict";
var _a;
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
(_a = document.getElementById('form-register-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', registerFormBtn);
function registerFormBtn(event) {
    event.preventDefault();
    const fName = document.getElementById('first-name').value;
    const lName = document.getElementById('last-name').value;
    const email = document.getElementById('email-register').value;
    const password = document.getElementById('password-register').value;
    const confirmPassword = document.getElementById('confirm-password-register').value;
    if (password !== confirmPassword) {
        alert("Passwords do not match");
    }
    const userData = {
        name: {
            fName,
            lName
        },
        email,
        password
    };
}
