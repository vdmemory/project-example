import { toast } from 'react-toastify';
import {
    validationErrorMessages,
    ValidationErrorType,
} from './validationErrorMessages';
import { interceptableErrorStatusCodesList } from '@breef/shared/constants';
import { capitalizeFirstLetter } from '../help-functions/stringTransformFunctions';

export type CustomStripeErrorType = {
    status: string | number;
    error?: string;
    data?:
        | {
              [key: string]: string;
          }
        | {
              stripe?: {
                  [key: string]: string;
              };
              detail?: string;
              status?: string;
              client_secret?: string;
          };
};

interface StripeErrorHandlerProps {
    error: CustomStripeErrorType;
    defaultErrorMessage?: string;
    callbackFn?: (errorMessage: string) => void;
}

export const stripeErrorHandler = ({
    error,
    defaultErrorMessage = validationErrorMessages[
        ValidationErrorType.default
    ] as string,
    callbackFn,
}: StripeErrorHandlerProps) => {
    let errorFieldKey = '';
    let errorMessage: string | string[] = '';

    if (error.status === 400 && error.data) {
        if (error.data.stripe) {
            errorMessage = Object.values(
                error.data.stripe as { [key: string]: string },
            )[0];
        } else if (error.data.detail) {
            errorMessage = error.data.detail;
        } else {
            errorMessage = Object.values(
                error.data as { [key: string]: string },
            );
            errorFieldKey = Object.keys(
                error.data as { [key: string]: string },
            )[0];
        }
    } else if (
        error.status === 'FETCH_ERROR' ||
        error.status === 'NETWORK_ERROR' ||
        error.status === 'PARSING_ERROR'
    ) {
        errorMessage =
            (error.error as string | string[]) ||
            (validationErrorMessages[ValidationErrorType.default] as string);
    }

    const errorMessageStr: string =
        (errorFieldKey ? capitalizeFirstLetter(errorFieldKey) + ': ' : '') +
            (typeof errorMessage === 'object'
                ? errorMessage[0]
                : errorMessage) || defaultErrorMessage;
    if (callbackFn) return callbackFn(errorMessageStr);
    return (
        !interceptableErrorStatusCodesList.includes(error.status) &&
        toast.error(errorMessageStr)
    );
};
