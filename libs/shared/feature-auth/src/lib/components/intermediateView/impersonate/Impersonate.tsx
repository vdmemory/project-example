import { useImpersonateMutation } from '@breef/shared/data-access-auth';
import { useTokenPromise } from '../useTokenPromise';
import { IntermediateView } from '../IntermediateView';

export interface ConfirmEmailProps {
    token: string;
}

export default function Impersonate({ token }: ConfirmEmailProps) {
    const [impersonate] = useImpersonateMutation();
    const { errorMessage, allowRedirect } = useTokenPromise({
        sendToken: impersonate,
        token,
        defaultErrorMessage:
            'Sorry, cannot complete the process, an error occurred while impersonate.',
    });

    return (
        <IntermediateView
            errorMessage={errorMessage}
            allowRedirect={allowRedirect}
        />
    );
}
