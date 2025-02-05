import React from 'react';
import { StyledInput } from './FieldInput.styled';
import FieldButton from './fieldButton/FieldButton';
import { FieldError } from '../fieldError/FieldError';
import PhoneNumberInput from '../phoneNumberInput/PhoneNumberInput';
import { ChangeHandler } from 'react-hook-form';
import { TypeFieldNames } from '@breef/shared/constants';
import { EyePassIcon, OffEyePassIcon } from '@breef/shared/assets';
import { controlInputField } from './utils/controlInputField';
import { useViewPassword } from '@breef/shared/hooks';
import { TypeField } from '@breef/shared/types';

interface FieldInputProps {
    setValue: (value: string) => void;
    value?: string;
    onClick: (key: string, data: React.SyntheticEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    typeButton?: 'submit' | 'button';
    typeInput?: 'text' | 'password' | 'phone';
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    hideArrowBtn?: boolean;
    isDisableNextBtn: boolean;
    isFieldArrowNextOnMobile?: boolean;
    onEyeIcon?: boolean;
}

export const FieldInput = ({
    setValue,
    value = '',
    onChange,
    onClick,
    typeButton = 'button',
    placeholder,
    disabled = false,
    error,
    hideArrowBtn,
    typeInput = 'text',
    isDisableNextBtn,
    isFieldArrowNextOnMobile = true,
    onEyeIcon = false,
}: FieldInputProps) => {
    const { typeInput: typeField, toggleTypeInput: toggleTypeField } =
        useViewPassword(typeInput as TypeField);

    return (
        <StyledInput
            className="field-input"
            type={typeInput}
            isArrowBtn={!hideArrowBtn}
            isFieldArrowNextOnMobile={isFieldArrowNextOnMobile}
        >
            <label htmlFor={'field-form'}>
                {typeInput === 'phone' ? (
                    <PhoneNumberInput
                        className="phone-input"
                        value={value}
                        onChange={
                            (e => {
                                e.target.value = e.target.value.number;
                                (onChange as ChangeHandler)(e);
                            }) as ChangeHandler
                        }
                        placeholder="123-456-7890"
                    />
                ) : (
                    <>
                        <input
                            id={'field-form'}
                            data-testid="field-input"
                            type={typeField}
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={
                                (e => {
                                    e.target.value = controlInputField(
                                        typeInput,
                                        e.target.value,
                                    );
                                    (onChange as ChangeHandler)(e);
                                }) as ChangeHandler
                            }
                            value={value}
                            autoComplete="off"
                        />
                        {typeInput === TypeFieldNames.PASSWORD && onEyeIcon ? (
                            <PasswordIcon
                                onClick={toggleTypeField}
                                typeField={
                                    typeField as 'text' | 'password' | 'phone'
                                }
                            />
                        ) : null}
                    </>
                )}
            </label>

            {error && (
                <FieldButton
                    data-testid="field-close-button"
                    view="close"
                    type="button"
                    onClick={() => setValue('')}
                    isDisabled={false}
                />
            )}
            {!error && !hideArrowBtn && (
                <FieldButton
                    view="arrow"
                    type={typeButton}
                    wrapperClassName="field-arrow-next"
                    onClick={event => onClick('nav-event', event)}
                    isDisabled={isDisableNextBtn || !value}
                />
            )}
            <FieldError error={error ? error : ''} />
        </StyledInput>
    );
};

export default FieldInput;

function PasswordIcon({
    onClick,
    typeField,
}: {
    onClick: () => void;
    typeField: 'text' | 'password' | 'phone';
}) {
    return (
        <span className="password-icon" onClick={onClick}>
            {typeField === TypeFieldNames.PASSWORD ? (
                <EyePassIcon />
            ) : (
                <OffEyePassIcon />
            )}
        </span>
    );
}
