import { useConfirmEmailMutation } from '@breef/shared/data-access-auth';
import { IntermediateView } from '../IntermediateView';
import { useTokenPromise } from '../useTokenPromise';

export interface ConfirmEmailProps {
    token: string;
}

export default function ConfirmEmail({ token }: ConfirmEmailProps) {
    const [confirmEmail] = useConfirmEmailMutation();
    const { errorMessage, allowRedirect } = useTokenPromise({
        sendToken: confirmEmail,
        token,
        defaultErrorMessage:
            'Sorry, cannot complete the process, an error occurred while confirming the email.',
    });

    return (
        <IntermediateView
            errorMessage={errorMessage}
            allowRedirect={allowRedirect}
        />
    );
}
