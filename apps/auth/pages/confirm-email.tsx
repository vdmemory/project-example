import withQueryPermission from '../hoc/withQueryPermission';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import { AUTH_FRONT_APP_URL } from '@breef/shared/constants';

import dynamic from 'next/dynamic';

const ConfirmEmail = dynamic(
    () => import('@breef/shared/feature-auth').then(item => item.ConfirmEmail),
    {
        ssr: false,
    },
);

function ConfirmEmailPage({
    queryOption,
    isValid,
}: {
    queryOption: string;
    isValid: boolean;
}) {
    return (
        <AnimateLayoutPage headTitle="Email Confirmation">
            {isValid ? (
                <ConfirmEmail token={queryOption} />
            ) : (
                <PageLoader
                    allowRedirect={AUTH_FRONT_APP_URL}
                    errorMessage="Sorry, this link isn't valid anymore"
                />
            )}
        </AnimateLayoutPage>
    );
}

export default withQueryPermission(ConfirmEmailPage);
