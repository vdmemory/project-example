import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ErrorType = {
    data?: {
        detail?: string;
    };
};

type RequestPropertiesType = {
    error?: object;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};

type MessagesByPropertiesType = {
    loading: string;
    success: string;
    error: string;
};

export interface UseTeamMemberToastifyProps {
    actionProps: RequestPropertiesType;
    configMessages: MessagesByPropertiesType;
    toastId: string;
    callbackFn?: () => void;
    isDelayCallback?: boolean;
}
const DELAY = 1200;

export const useToastifyRequest = ({
    actionProps,
    configMessages,
    callbackFn,
    toastId,
    isDelayCallback = true,
}: UseTeamMemberToastifyProps) => {
    const [toastLoading, setToastLoading] = useState(false);

    const onToastEnd = () => {
        if (isDelayCallback) {
            setTimeout(() => {
                setToastLoading(false);
                if (callbackFn) callbackFn();
            }, DELAY);
        } else {
            setTimeout(() => setToastLoading(false), DELAY);
            if (callbackFn) callbackFn();
        }
    };

    useEffect(() => {
        if (actionProps.isLoading) {
            setToastLoading(true);
            toast(configMessages.loading, {
                isLoading: true,
                toastId: toastId,
                type: 'info',
            });
        }
        if (actionProps.isSuccess) {
            toast.update(toastId, {
                render: configMessages.success,
                type: 'success',
                isLoading: false,
                autoClose: DELAY - 200,
                closeOnClick: false,
                hideProgressBar: false,
                progress: undefined,
            });
            onToastEnd();
        }
        if (actionProps.isError) {
            toast.update(toastId, {
                render:
                    (actionProps.error as ErrorType)?.data?.detail ||
                    configMessages.error,
                type: 'error',
                isLoading: false,
            });
            onToastEnd();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        actionProps.isLoading,
        actionProps.isSuccess,
        actionProps.isError,
        actionProps.error,
    ]);

    return { toastLoading };
};
