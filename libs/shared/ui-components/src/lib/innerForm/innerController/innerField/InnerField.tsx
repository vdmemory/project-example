import { FieldError } from 'react-hook-form';
import { useRef } from 'react';
import { StyledInnerField } from './InnerField.styled';
import { PhoneNumberType } from '../../../phoneNumberInput/PhoneNumberInput';
import Tooltip from '../../../tooltip/Tooltip';
import {
    InnerInputController,
    InnerInputType,
} from './InnerInputController/InnerInputController';
import { HookFormEventType } from '@breef/shared/types';

export interface InnerFieldProps {
    label: string;
    onChange: (event: HookFormEventType) => void;
    placeholder?: string;
    type?: InnerInputType;
    listType?: string;
    error?: FieldError;
    value: string | { name: string; id: number }[] | PhoneNumberType;
    isDisabled?: boolean;
    maxLength?: number;
    rowsCount?: number;
    suggested?: string;
    isDisplayUppercaseValue?: boolean;
    isDisplayCapitalizeValue?: boolean;
}

export default function InnerField({
    type = 'text',
    label,
    error,
    isDisabled,
    isDisplayUppercaseValue,
    isDisplayCapitalizeValue,
    ...props
}: InnerFieldProps) {
    const fieldRef = useRef(null);
    const errorMessage = getDeepErrorMessage(error);

    return (
        <StyledInnerField
            ref={fieldRef}
            isClickable={type === 'dropdown' || type === 'socialLink'}
            type={type}
            isDisabled={isDisabled}
            isDisplayUppercaseValue={isDisplayUppercaseValue}
            isDisplayCapitalizeValue={isDisplayCapitalizeValue}
            isError={!!error}
            htmlFor={label}
        >
            {errorMessage ? (
                <Tooltip
                    className="tooltip"
                    isError
                    placement="right"
                    label={errorMessage}
                    offsetCustom={14}
                >
                    <span className="label-name">{label}</span>
                </Tooltip>
            ) : (
                <span className="label-name">{label}</span>
            )}
            <InnerInputController
                fieldRef={fieldRef}
                type={type}
                label={label}
                error={error}
                isDisabled={isDisabled}
                {...props}
            />
        </StyledInnerField>
    );
}

const getDeepErrorMessage = (error: FieldError | undefined) => {
    if (!error) {
        return '';
    }
    return (
        error.message ?? (Object.values(error)[0] as FieldError)?.message ?? ''
    );
};
