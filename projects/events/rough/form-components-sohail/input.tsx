import React, { useState, JSX } from 'react';
import { Info, Visibility, VisibilityOff } from '@mui/icons-material';
import { Tooltip } from 'antd';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-number-input';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-number-input/style.css';

interface CustomDateEvent<T> {
    value: T;
    name: string;
    type: string;
    dataset?: {
        [key: string]: unknown | undefined; // Index signature for optional key-value pairs
    };
}

export type CustomSelectDateEvent = CustomDateEvent<string>;

type InputFieldProps = {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string | number;
    onChangeInput: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | CustomSelectDateEvent>
    ) => void;
    style?: React.CSSProperties;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onKeyDown?: (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | CustomSelectDateEvent>
    ) => void;
    maxLength?: number;
    minLength?: number;
    error?: string;
    disabled?: boolean;
    dataType?: string;
    strict?: boolean;
    tooltipTitle?: string;
    required?: boolean;
    minDate?: string | null;
    maxDate?: string | null;
    onEmptyNull?: boolean;
    trim?: boolean;
    className?: string;
    dateFormat?: string;
    customLabelButton?: React.ReactNode;
    customNode?: React.ReactNode;
    rows?: number; // Only for textarea
    min?: number;
    max?: number;
};

export const InputField = ({
    label,
    name,
    type,
    placeholder,
    value,
    onChangeInput,
    style,
    onKeyDown,
    error,
    dataType,
    strict,
    required = false,
    disabled = false,
    onEmptyNull = false,
    trim = false,
    className = '',
    onBlur,
    tooltipTitle,
    customLabelButton,
    customNode,
    minDate,
    maxDate,
    rows = 4,
}: InputFieldProps): JSX.Element => {
    const isPasswordField = type === 'password';
    const isTextArea = type === 'textarea';
    const [showPassword, setShowPassword] = useState(false);

    const passwordType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

    // Safely convert Date to yyyy-mm-dd string
    const dateString = (date: Date): string => {
        if (!(date instanceof Date) || isNaN(date.getTime())) return '';
        const year = date.getFullYear().toString().padStart(4, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateInput = (date: Date | null) => {
        if (disabled) return;
        const target = {
            name: name,
            value: date ? (type == 'date' ? dateString(date) : date.toISOString()) : '',
            type: type,
            dataset: {
                type: dataType || type,
                strict: strict,
                label: label ?? '',
                minDate: minDate ?? '',
                maxDate: maxDate ?? '',
                required: required,
                empty: onEmptyNull,
            },
        } as CustomSelectDateEvent;
        const event = {
            target: target,
        } as React.ChangeEvent<CustomSelectDateEvent>;
        onChangeInput(event);
    };

    // Properly infer the selected Date value for DatePicker
    const getDateValue = (value: string | number | Date | null | undefined): Date | null => {
        if (!value) return null;
        try {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date;
        } catch {
            return null;
        }
    };

    const handlePhoneInput = (value?: string) => {
        if (disabled) return;
        const target = {
            name: name,
            value: value,
            type: type,
            dataset: {
                type: dataType || type,
                strict: strict,
                label: label ?? '',
                required: required,
                empty: onEmptyNull,
            },
        } as CustomSelectDateEvent;
        const event = {
            target: target,
        } as React.ChangeEvent<CustomSelectDateEvent>;
        onChangeInput(event);
    };

    const inputClassName = `w-full px-4 py-2 pr-10 border rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 ${
        error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-300'
    } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}`;

    const sharedProps = {
        placeholder,
        name,
        'data-type': dataType || type,
        'data-strict': strict,
        'data-empty': onEmptyNull,
        'data-label': label,
        'data-required': required,
        'data-trim': trim,
        value: value ?? '',
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            !disabled && onChangeInput(e),
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            !disabled && onKeyDown?.(e),
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => onBlur?.(e),
        disabled,
        autoComplete: 'off',
        className: inputClassName,
    };

    return (
        <div className={`mb-2 relative ${className}`} style={style}>
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                    {tooltipTitle && (
                        <Tooltip placement="top" title={tooltipTitle} trigger="hover">
                            <Info fontSize="small" className="ml-1 inline cursor-pointer" />
                        </Tooltip>
                    )}
                </label>
                {customNode}
                {customLabelButton}
            </div>

            <div className="relative">
                {['mobilenumber'].includes(type) ? (
                    <PhoneInput
                        name={name}
                        onChange={handlePhoneInput}
                        onKeyDown={onKeyDown}
                        onBlur={(e) =>
                            disabled
                                ? () => {}
                                : onBlur && onBlur(e as React.FocusEvent<HTMLInputElement>)
                        }
                        international
                        withCountryCallingCode
                        className={inputClassName}
                        disabled={disabled}
                        value={(value ?? '') as string}
                    />
                ) : ['date', 'datetime'].includes(type) ? (
                    <DatePicker
                        onChange={handleDateInput}
                        selected={getDateValue(value)}
                        placeholderText={placeholder}
                        name={name}
                        readOnly={disabled}
                        onKeyDown={(e) =>
                            disabled
                                ? () => {}
                                : onKeyDown && onKeyDown(e as React.KeyboardEvent<HTMLInputElement>)
                        }
                        onBlur={(e) =>
                            disabled
                                ? () => {}
                                : onBlur && onBlur(e as React.FocusEvent<HTMLInputElement>)
                        }
                        showTimeSelect={['datetime'].includes(type)}
                        className={inputClassName}
                        wrapperClassName="w-full"
                        maxDate={maxDate ? new Date(maxDate) : undefined}
                        minDate={minDate ? new Date(minDate) : undefined}
                        disabled={disabled}
                    />
                ) : isTextArea ? (
                    <textarea rows={rows} {...sharedProps} />
                ) : (
                    <input type={passwordType} {...sharedProps} />
                )}

                {isPasswordField && (
                    <span
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </span>
                )}
            </div>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};
 