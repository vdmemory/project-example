import {
    EyePassBolderIcon,
    EyePassIcon,
    OffEyePassIcon,
} from '@breef/shared/assets';
import { TypeFieldNames } from '@breef/shared/constants';
import { TypeField } from '@breef/shared/types';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { FieldError } from '@breef/shared/ui-components';
import { StyledInputField } from './InputField.styled';
import { controlInputField } from '../../../../../utils';
import { EyeButton, WarningIcon } from '@breef/ui-kit';
import { ChangeEvent } from 'react';
import { useViewPassword } from '@breef/shared/hooks';

interface InputFieldProps {
    className?: string;
    placeholder?: string;
    type?: TypeField;
    name: string;
    maxLength?: number;
    error?: string;
    warning?: string;
    onChange?: (value: string) => void;
    value?: string;
    readOnly?: boolean;
    hidePasswordEye?: boolean;
}

export const InputField = ({
    className,
    placeholder = '',
    type = TypeFieldNames.TEXT,
    name,
    maxLength = 255,
    error,
    warning,
    onChange,
    value,
    readOnly = false,
    hidePasswordEye = false,
}: InputFieldProps) => {
    const { typeInput, toggleTypeInput } = useViewPassword(type);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(controlInputField(type, event.target.value));
    };

    return (
        <StyledInputField
            isError={!!error}
            isWarning={!!warning}
            isRightIcon={type === TypeFieldNames.PASSWORD || !!warning}
        >
            <input
                data-testid="input-field"
                type={typeInput}
                className={`input-field ${className}`}
                placeholder={placeholder}
                onChange={handleChange}
                value={typeof value === 'string' ? value : ''}
                name={name}
                maxLength={maxLength}
                autoComplete="new-password"
            />

            {error ? <FieldError error={error} /> : null}
            {warning && !error ? <FieldError warning error={warning} /> : null}

            {type === TypeFieldNames.PASSWORD && !hidePasswordEye ? (
                <EyeButton onClick={toggleTypeInput} typeField={typeInput} />
            ) : null}
            {warning && !error ? (
                <WarningIcon className="warning-icon" />
            ) : null}
        </StyledInputField>
    );
};
