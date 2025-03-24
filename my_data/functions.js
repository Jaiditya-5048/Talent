



// Date and Time function this is a typeScript function which accepts params in unix timestap and give custom date and time with reagards to local time
function formatDateTime(timestamp: number, timezoneOffset: number): { time: string; date: string } {
  const localDate = new Date((timestamp + timezoneOffset) * 1000);

  return {
    time: localDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    date: localDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}


// This function is used to convert any UTC unix timestamp into a date and time using the offset without reagrds to local time
function UTCformat(timestamp: number, offset: number) {
  const date = new Date((timestamp + offset) * 1000);
  const fullDateTime = date.toUTCString();
  const dateTimeArr = fullDateTime.split(" ");
  const fulltime = dateTimeArr[4];
  const timeArr = fulltime.split(":");
  const timePeriod = (hour = timeArr[0]) => (Number(hour) >= 12 ? 'PM' : 'AM');
  const formatHours = (hour = timeArr[0]) =>
    Number(hour) > 12 ? (Number(hour) - 12).toString() : hour;
  return {
    date: {
      weekday: dateTimeArr[0],
      day: dateTimeArr[1],
      month: dateTimeArr[2],
      year: dateTimeArr[3],
      time_code: dateTimeArr[4]
    },
    time: {
      hours: formatHours(),
      minutes: timeArr[1],
      second: timeArr[2],
      timePeriod: timePeriod(),
    }
  }
}


// This is a form valication class used to add validation to a form, it takes form form id and sbmit-btn id as params, 
// ***imp!*** the id of input fields should be same as the switch cases names

class FormValidator {
  private errors: Record<string, string> = {};
  private formId: string;
  private submitBtnId: string;

  constructor(formId: string, submitBtnId: string) {
    this.formId = formId;
    this.submitBtnId = submitBtnId;
    this.attachEventListeners();
  }

  private attachEventListeners() {
    const form = document.getElementById(this.formId) as HTMLFormElement;
    if (!form) return;

    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => this.validateField(input));
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  private validateField(input: HTMLInputElement) {
    const { id, value } = input;

    switch (id) {
      case 'first-name':
        if (!value.trim()) {
          this.errors[id] = 'First name is required.';
          break;
        }
        if (this.validateName(value.trim()) === false) {
          this.errors[id] = 'Invalid Name';
          break;
        }
        this.errors[id] = '';
        break;

      case 'last-name':
        if (!value.trim()) {
          this.errors[id] = 'Last name is required.';
          break;
        }
        if (this.validateName(value.trim()) === false) {
          this.errors[id] = 'Invalid Name';
          break;
        }
        this.errors[id] = '';
        break;

      case 'email-login':
        if (!value.trim()) {
          this.errors[id] = 'Email is required.';
          break;
        }
        if (this.validateEmail(value.trim()) === false) {
          this.errors[id] = 'Invalid Email format (e.g., example@example.com)';
          break;
        }
        this.errors[id] = '';
        break;

      case 'email-register':
        if (!value.trim()) {
          this.errors[id] = 'Email is required.';
          break;
        }
        if (this.validateEmail(value.trim()) === false) {
          this.errors[id] = 'Invalid Email format (e.g., example@example.com)';
          break;
        }
        this.errors[id] = '';
        break;

      //'Password must be between 8 and 64 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%^&*()).'
      case 'password-login':
        if (!value.trim()) {
          this.errors[id] = 'Password is required';
          break;
        }
        if (this.validatePassword(value.trim()) === false) {
          this.errors[id] = 'Invalid password';
          break;
        }
        this.errors[id] = '';
        break;

      case 'password-register':
        if (!value.trim()) {
          this.errors[id] = 'Password is required';
          break;
        }
        if (this.validatePassword(value.trim()) === false) {
          this.errors[id] = 'Invalid password';
          break;
        }
        this.errors[id] = '';
        break;

      case 'confirm-password-register':
        const password = (document.getElementById('password-register') as HTMLInputElement)?.value;
        this.errors[id] = value === password ? '' : 'Passwords do not match.';
        break;
    }

    this.displayErrors();
    this.toggleSubmitButton();
  }

  private validateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s]{2,15}$/;
    return nameRegex.test(name);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]{3,64}@[a-zA-Z0-9.-]{2,255}\.[a-zA-Z]{2,63}$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?])[A-Za-z\d!@#$%^&*(),.?]{8,64}$/;
    return passwordRegex.test(password);
  }

  private displayErrors() {
    Object.keys(this.errors).forEach((key) => {
      const errorDiv = document.getElementById(`${key}-error`);
      if (errorDiv) {
        errorDiv.textContent = this.errors[key];
      }
    });
  }

  private toggleSubmitButton() {
    const submitBtn = document.getElementById(this.submitBtnId) as HTMLButtonElement;
    if (!submitBtn) return;

    const hasErrors = Object.values(this.errors).some((error) => error !== '');
    submitBtn.disabled = hasErrors;
  }
}