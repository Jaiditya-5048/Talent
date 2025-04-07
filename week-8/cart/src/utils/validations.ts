// class FormValodator {

// }
const value = 'jai';
const error = {};

switch (id) {
  case 'email':
    if (!value.trim()) {
      error[id] = 'Email is requiered';
      break;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]{3,64}@[a-zA-Z0-9.-]{2,255}\.[a-zA-Z]{2,63}$/;
      if (emailRegex.test(value.trim()) === false) {
        error[id] = 'Invalid Email';
        break;
      } else error[id] = '';
    }
}
