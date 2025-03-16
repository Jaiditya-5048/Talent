"use strict";
class FormValidator {
    constructor(formId, submitBtnId) {
        this.errors = {};
        this.formId = formId;
        this.submitBtnId = submitBtnId;
        this.attachEventListeners();
    }
    attachEventListeners() {
        const form = document.getElementById(this.formId);
        if (!form)
            return;
        form.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }
    validateField(input) {
        var _a;
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
                const password = (_a = document.getElementById('password')) === null || _a === void 0 ? void 0 : _a.value;
                this.errors[id] = value === password ? '' : 'Passwords do not match.';
                break;
        }
        this.displayErrors();
        this.toggleSubmitButton();
    }
    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    displayErrors() {
        Object.keys(this.errors).forEach((key) => {
            const errorDiv = document.getElementById(`${key}-error`);
            if (errorDiv) {
                errorDiv.textContent = this.errors[key];
            }
        });
    }
    toggleSubmitButton() {
        const submitBtn = document.getElementById(this.submitBtnId);
        if (!submitBtn)
            return;
        const hasErrors = Object.values(this.errors).some((error) => error !== '');
        submitBtn.disabled = hasErrors;
    }
}
