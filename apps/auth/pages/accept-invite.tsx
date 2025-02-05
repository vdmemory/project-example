import withQueryPermission from '../hoc/withQueryPermission';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import { AUTH_FRONT_APP_URL } from '@breef/shared/constants';
import { useCheckUserStatusMutation } from '@breef/shared/data-access-auth';
import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { AuthValidationType } from '@breef/shared/types';

const AcceptInvitation = dynamic(
    () =>
        import('@breef/shared/feature-auth').then(
            item => item.AcceptInvitation,
        ),
    {
        ssr: false,
    },
);

function AcceptInvitePage({
    queryOption,
    isValid,
}: {
    queryOption: string;
    isValid: boolean;
}) {
    const [checkUserStatus, { isLoading, isError: isRevokeUser }] =
        useCheckUserStatusMutation();

    useEffect(() => {
        if (isValid)
            checkUserStatus({
                token: queryOption,
                validationType: AuthValidationType.ACCEPT_INVITE,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid, queryOption]);

    const renderPage = () => {
        if (isLoading) {
            return <PageLoader />;
        }

        if (!isValid) {
            return (
                <PageLoader
                    allowRedirect={AUTH_FRONT_APP_URL}
                    errorMessage="Please ask your colleague to resend your invite to this project on Breef."
                />
            );
        }
        if (isValid && isRevokeUser) {
            return (
                <PageLoader
                    allowRedirect={AUTH_FRONT_APP_URL}
                    errorMessage="An account has already been created through this link. Please Sign In."
                />
            );
        }
        return <AcceptInvitation token={queryOption} />;
    };

    return (
        <AnimateLayoutPage headTitle="Accept Invitation">
            {renderPage()}
        </AnimateLayoutPage>
    );
}

export default withQueryPermission(AcceptInvitePage);
