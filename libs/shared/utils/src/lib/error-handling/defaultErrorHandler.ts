import { toast } from 'react-toastify';
import {
    validationErrorMessages,
    ValidationErrorType,
} from './validationErrorMessages';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { interceptableErrorStatusCodesList } from '@breef/shared/constants';

type ServerErrorType = {
    status: number | string;
    data?: {
        detail: string | string[];
        non_field_errors: string | string[];
        project: string | string[];
        pitch: string | string[];
    };
};

const destructureMessage = (value: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

export const defaultErrorHandler = (
    error: FetchBaseQueryError,
    isNonFieldErrorChecks = true,
) => {
    const typedError = error as ServerErrorType;
    const nonFieldError =
        typedError.data?.detail ||
        typedError.data?.non_field_errors ||
        typedError.data?.project ||
        typedError.data?.pitch;
    if (isNonFieldErrorChecks && nonFieldError) {
        const message = destructureMessage(nonFieldError);
        toast.error(message, { toastId: message });
    } else if (!interceptableErrorStatusCodesList.includes(error.status)) {
        toast.error(validationErrorMessages[ValidationErrorType.default]);
    }
};
