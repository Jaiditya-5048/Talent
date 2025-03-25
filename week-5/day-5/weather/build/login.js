"use strict";
window.onload = function () {
    loginLoad();
};
function loginLoad() {
    const loggedInUser = JSON.parse(localStorage.getItem('logginUser') || 'null');
    if (loggedInUser === null) {
        document.getElementById('loginbtn')?.addEventListener('click', triggerLogin);
        document.getElementById('registerbtn')?.addEventListener('click', () => {
            triggerRegister();
            new FormValidator('register-form', 'form-register-btn');
        });
    }
    else {
        window.open('../public/dashboard_flex.html', '_self');
    }
}
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
document.getElementById('form-login-btn')?.addEventListener('click', loginUser);
async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    const userData = await getSingleUser({ email: email, password: password });
    if (userData === null) {
        console.log("error fetching data");
    }
    else {
        if (Object.keys(userData).length === 0) {
            showToast('toast-error-login');
        }
        else {
            const loggedInUser = { user_id: userData[0].id, fName: userData[0].name.fName, loginFlag: true };
            localStorage.setItem('logginUser', JSON.stringify(loggedInUser));
            console.log('user logged in successfully');
            console.log('user: ', loggedInUser);
            window.open('../public/dashboard_flex.html', '_self');
            const loginForm = document.getElementById('login-form');
            loginForm.reset();
        }
    }
}
// Register-form
document.getElementById('form-register-btn')?.addEventListener('click', registerUser);
async function registerUser(event) {
    event.preventDefault();
    const fName = document.getElementById('first-name').value.trim();
    const lName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email-register').value.trim();
    const password = document.getElementById('password-register').value.trim();
    const userData = await getSingleUser({ email: email });
    if (userData === null) {
        console.log('error fetching data');
    }
    else {
        if (userData.length !== 0) {
            showToast('toast-error-register');
        }
        else {
            const userData = {
                id: Math.floor(Date.now() + Math.random()),
                name: {
                    fName: fName.charAt(0).toUpperCase() + fName.slice(1),
                    lName: lName.charAt(0).toUpperCase() + lName.slice(1),
                },
                email,
                password,
            };
            const userWishlist = {
                id: (userData.id).toString(),
                fav_locations: [],
            };
            console.log(userData);
            postData(userData);
            postWishlist(userWishlist);
        }
    }
}
