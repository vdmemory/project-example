import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export interface ToastifyOptionsProps {
    errors: object;
    isError?: boolean;
    isSuccess?: boolean;
}

export const useShowToastify = ({
    errors,
    isError,
    isSuccess,
}: ToastifyOptionsProps) => {
    useEffect(() => {
        const errorMessages = Object.values(errors) as { message: string }[];
        for (const error of errorMessages) {
            const errorMessageToShow =
                error.message ||
                Object.values(
                    error as { [key: string]: { message?: string } },
                )[0].message ||
                (validationErrorMessages[
                    ValidationErrorType.default
                ] as string);
            toast.error(errorMessageToShow, { toastId: errorMessageToShow });
        }
    }, [errors, isError]);

    useEffect(() => {
        if (isSuccess) toast.success('Changes saved successfully.');
    }, [isSuccess]);
};
