import { AUTH_FRONT_APP_URL } from '@breef/shared/constants';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import withQueryPermission from '../hoc/withQueryPermission';

import dynamic from 'next/dynamic';

const ResetPassword = dynamic(
    () => import('@breef/shared/feature-auth').then(item => item.ResetPassword),
    {
        ssr: false,
    },
);

function ResetPasswordPage({
    queryOption,
    isValid,
}: {
    queryOption: string;
    isValid: boolean;
}) {
    return (
        <AnimateLayoutPage headTitle="Reset Password">
            {isValid ? (
                <ResetPassword token={queryOption} />
            ) : (
                <PageLoader
                    allowRedirect={AUTH_FRONT_APP_URL}
                    errorMessage="Sorry, this link isn't valid anymore, please use forgot password flow again"
                />
            )}
        </AnimateLayoutPage>
    );
}

export default withQueryPermission(ResetPasswordPage);
