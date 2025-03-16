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
        this.errors[id] = value.trim() ? '' : 'First name is required.';
        break;
      case 'last-name':
        this.errors[id] = value.trim() ? '' : 'Last name is required.';
        break;
      case 'email-login':
        this.errors[id] = this.validateEmail(value) ? '' : 'Enter a valid email.';
        break;
      case 'email-register':
        this.errors[id] = this.validateEmail(value) ? '' : 'Enter a valid email.';
        break;
      case 'password-login':
        this.errors[id] = value.length >= 6 ? '' : 'Password must be at least 6 characters.';
        break;
      case 'password-register':
        this.errors[id] = value.length >= 6 ? '' : 'Password must be at least 6 characters.';
        break;
      case 'confirm-password-register':
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        this.errors[id] = value === password ? '' : 'Passwords do not match.';
        break;
    }

    this.displayErrors();
    this.toggleSubmitButton();
  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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


