import React, { useState } from 'react';
import { InputField } from '@src/components/inputs/InputField';
import type { GlobalInputFieldType } from '@src/components/inputs/GlobalInput';
import { validateFieldError } from '@src/helper/validations/custom';
import { ValidateInputValue } from '@src/helper/common';
import { KeyPairInterface } from '@src/redux/interfaces';
import Link from 'next/link';
import { APP_ROUTE } from '@src/constants';
import { AuthResendOTP } from './AuthResendOtp';
import { CustomSelectChangeEvent, SelectField } from './SelectInput';
 
type AuthFormInputProps = {
    title: string;
    subtitle: string;
    cardTitle: string;
    state: KeyPairInterface;
    setState: React.Dispatch<React.SetStateAction<KeyPairInterface>>;
    fields: GlobalInputFieldType[];
    onSubmit: () => void;
    onResend?: () => Promise<boolean>;
    buttonTitle: string;
    loginLink?: boolean;
    signUpLink?: boolean;
    forgotPasswordLink?: boolean;
    acceptTerms?: boolean;
    rememberMe?: boolean;
};
 
export const AuthFormInput: React.FC<AuthFormInputProps> = ({
    title,
    subtitle,
    cardTitle,
    setState,
    fields,
    state,
    onSubmit,
    onResend,
    buttonTitle,
    loginLink = false,
    signUpLink = false,
    forgotPasswordLink = false,
    acceptTerms = false,
    rememberMe = false,
}) => {
    const [error, setError] = useState<KeyPairInterface>({});
    const [accepted, setAccepted] = useState<boolean>(false);
 
    const handleInputChangeEvent = (
        e: React.ChangeEvent<HTMLInputElement | CustomSelectChangeEvent>
    ) => {
        const { error, key, value, changable } = ValidateInputValue(e);
        if (changable) {
            setState((prev) => ({ ...prev, [key]: value }));
        }
        setError((prev) => ({ ...prev, [key]: error }));
    };
 
    const handleKeyDownEvent = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | CustomSelectChangeEvent>
    ) => {
        if (e.key.toLowerCase() === 'enter') {
            e.preventDefault();
            handleSubmit();
        }
    };
 
    const handleSubmit = () => {
        const isValid = validate();
        if (isValid) {
            onSubmit();
        }
    };
 
    const handleAccepted = () => {
        setAccepted((prev) => !prev);
        setError((prev) => ({ ...prev, accepted: '' }));
    };
 
    const validate = () => {
        let isValid = true;
 
        fields.forEach((field) => {
            const value = state[field.name] ?? '';
            const validationError = validateFieldError({ ...field, value });
 
            if (validationError?.errorMsg) {
                setError((prev) => ({ ...prev, [field.name]: validationError.errorMsg }));
                isValid = false;
            }
 
            if (field.name === 'confirm_password' && state['password'] !== value) {
                setError((prev) => ({
                    ...prev,
                    [field.name]: 'Confirm Password does not match.',
                }));
                isValid = false;
            }
        });
 
        if (acceptTerms && !accepted) {
            setError((prev) => ({
                ...prev,
                accepted: 'Please accept the terms of use and privacy policy.',
            }));
            isValid = false;
        }
 
        return isValid;
    };
 
    return (
        <div className="min-h-[calc(100vh-70px)] bg-white bg-gradient-to-br flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[28%] 2xl:w-[25%]">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {title}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
                </div>
 
                {/* Card */}
                <div className="bg-white shadow-xl rounded-lg border border-gray-200 max-w-md w-full mx-auto">
                    <div className="px-6 py-4 border-gray-200 text-center">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
                            {cardTitle}
                        </h3>
                    </div>
                    <div className="p-6">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="space-y-6"
                        >
                            {fields.map((field) => {
                                const InputComponent =
                                    field.type == 'select' ? SelectField : InputField;
                                return (
                                    <InputComponent
                                        key={field.name}
                                        placeholder={
                                            field.placeholder ??
                                            (field.type === 'date'
                                                ? field.label
                                                : `Enter ${field.label}`)
                                        }
                                        value={state[field.name]}
                                        error={error[field.name]}
                                        onChangeInput={handleInputChangeEvent}
                                        onKeyDown={handleKeyDownEvent}
                                        {...field}
                                    />
                                );
                            })}
 
                            {onResend && <AuthResendOTP onResend={onResend} />}
 
                            {acceptTerms && (
                                <div className="text-md text-gray-700 space-y-1">
                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            id="accept"
                                            checked={accepted}
                                            onChange={handleAccepted}
                                            className="mt-1"
                                        />
                                        <label htmlFor="accept">
                                            I accept the{' '}
                                            <Link
                                                href={APP_ROUTE.TERMS_AND_CONDITION}
                                                target="_blank"
                                                className="text-[#3BCFCB] underline"
                                            >
                                                terms of use
                                            </Link>{' '}
                                            and the{' '}
                                            <Link
                                                href={APP_ROUTE.PRIVACY_POLICY}
                                                target="_blank"
                                                className="text-[#3BCFCB] underline"
                                            >
                                                privacy policy
                                            </Link>
                                            .
                                        </label>
                                    </div>
                                    {error.accepted && (
                                        <p className="text-red-500 text-xs">{error.accepted}</p>
                                    )}
                                </div>
                            )}
 
                            {rememberMe && (
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="rememberMe" className="mt-1" />
                                    <label htmlFor="rememberMe" className="text-md text-gray-700">
                                        Remember Me
                                    </label>
                                </div>
                            )}
 
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full mt-4 bg-[#008B8B] text-white cursor-pointer border-0 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70"
                            >
                                {buttonTitle}
                            </button>
                        </form>
 
                        {loginLink && (
                            <p className="text-center mt-4 text-md text-black">
                                Already have an account?{' '}
                                <Link href={APP_ROUTE.LOGIN} className="text-[#3BCFCB] underline">
                                    Sign In
                                </Link>
                            </p>
                        )}
 
                        {signUpLink && (
                            <p className="text-center mt-4 text-md text-black">
                                Don’t have an account?{' '}
                                <Link
                                    href={APP_ROUTE.REGISTER}
                                    className="text-[#3BCFCB] underline"
                                >
                                    Sign Up Now
                                </Link>
                            </p>
                        )}
 
                        {forgotPasswordLink && (
                            <div className="text-center mt-4 text-md text-black">
                                <Link
                                    href={APP_ROUTE.FORGOT_PASSWORD}
                                    className="text-blue-600 underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
 