window.onload = function () {
  document.getElementById('loginbtn')?.addEventListener('click', triggerLogin);
  document.getElementById('registerbtn')?.addEventListener('click', ()=> {
    triggerRegister()
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

document.getElementById('form-register-btn')?.addEventListener('click', registerFormBtn);

function registerFormBtn(event: Event) {
  event.preventDefault();
  const fName: string = (document.getElementById('first-name') as HTMLInputElement).value;
  const lName: string = (document.getElementById('last-name') as HTMLInputElement).value;
  const email: string = (document.getElementById('email-register') as HTMLInputElement).value;
  const password: string = (document.getElementById('password-register') as HTMLInputElement).value;
  const confirmPassword: string = (document.getElementById('confirm-password-register') as HTMLInputElement).value;

  if(password !== confirmPassword) {
    alert("Passwords do not match")
  }


  const userData : UserData = {
    name: {
      fName,
      lName
    },
    email,
    password
  };
}

