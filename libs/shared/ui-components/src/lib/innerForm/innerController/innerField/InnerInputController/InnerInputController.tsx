import React, { RefObject } from 'react';
import { ChangeHandler, FieldError } from 'react-hook-form';
import CustomDropdownDefinesList from '../../../../customDropdown/customDropdownDefinesList/CustomDropdownDefinesList';
import ChipDropdownDefinesList from '../../../../chipDropdown/chipDropdownDefinesList/ChipDropdownDefinesList';
import ChipAutocomplete from '../../../../chipAutocomplete/ChipAutocomplete';
import TextArea from '../../../../textarea/TextArea';
import PhoneNumberInput, {
    PhoneNumberType,
} from '../../../../phoneNumberInput/PhoneNumberInput';
import LinkField from '../../../../socialLinks/linkField/LinkField';
import { HookFormEventType } from '@breef/shared/types';

export type InnerInputType =
    | 'text'
    | 'password'
    | 'phoneNumber'
    | 'checkbox'
    | 'dropdown'
    | 'textarea'
    | 'chipAutocomplete'
    | 'chipDropdown'
    | 'phone'
    | 'socialLink';

export interface InnerInputControllerProps {
    label: string;
    onChange: (event: HookFormEventType) => void;
    placeholder?: string;
    type: InnerInputType;
    listType?: string;
    error?: FieldError;
    value: string | { name: string; id: number }[] | PhoneNumberType;
    isDisabled?: boolean;
    maxLength?: number;
    rowsCount?: number;
    suggested?: string;
    fieldRef?: RefObject<HTMLElement>;
}

export function InnerInputController({
    label,
    suggested,
    rowsCount,
    isDisabled,
    type,
    listType,
    value,
    error,
    placeholder,
    maxLength,
    onChange,
    fieldRef,
}: InnerInputControllerProps) {
    switch (type) {
        case 'dropdown':
            return (
                <CustomDropdownDefinesList
                    listType={listType || ''}
                    placeholder={placeholder}
                    onChange={onChange as ChangeHandler}
                    value={typeof value === 'string' ? value : ''}
                    parentRef={fieldRef}
                    isDisabled={isDisabled}
                />
            );
        case 'chipDropdown':
            return (
                <ChipDropdownDefinesList
                    listType={listType || ''}
                    initialListValues={value as { name: string; id: number }[]}
                    onClick={onChange as ChangeHandler}
                    parentRef={fieldRef}
                />
            );
        case 'chipAutocomplete':
            return (
                <ChipAutocomplete
                    initialListValues={value as { name: string; id: number }[]}
                    onClick={onChange as ChangeHandler}
                />
            );
        case 'textarea':
            return (
                <TextArea
                    id={label}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    rows={rowsCount}
                    error={error?.message}
                    className="inner-field-textarea"
                    onChange={onChange as ChangeHandler}
                    value={typeof value === 'string' ? value : ''}
                />
            );
        case 'phone':
            return (
                <PhoneNumberInput
                    value={(value as PhoneNumberType)?.number}
                    onChange={onChange as ChangeHandler}
                />
            );
        case 'socialLink':
            return (
                <LinkField
                    value={value as string}
                    onChange={onChange as ChangeHandler}
                    label={label}
                    maxLength={maxLength}
                    parentRef={fieldRef}
                />
            );
        default:
            return (
                <input
                    id={label}
                    type={type}
                    autoComplete={suggested || 'off'}
                    value={typeof value === 'string' ? value : ''}
                    placeholder={placeholder}
                    onChange={onChange}
                    maxLength={maxLength}
                    disabled={isDisabled}
                />
            );
    }
}
