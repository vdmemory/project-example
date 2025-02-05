import { AUTH_FRONT_APP_URL } from '@breef/shared/constants';
import withQueryPermission from '../hoc/withQueryPermission';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import dynamic from 'next/dynamic';

const Impersonate = dynamic(
    () => import('@breef/shared/feature-auth').then(item => item.Impersonate),
    {
        ssr: false,
    },
);

function ImpersonatePage({
    queryOption,
    isValid,
}: {
    queryOption: string;
    isValid: boolean;
}) {
    return (
        <AnimateLayoutPage headTitle="Impersonate">
            {isValid ? (
                <Impersonate token={queryOption} />
            ) : (
                <PageLoader
                    allowRedirect={AUTH_FRONT_APP_URL}
                    errorMessage="Sorry, this link isn't valid anymore, please use impersonate flow again"
                />
            )}
        </AnimateLayoutPage>
    );
}

export default withQueryPermission(ImpersonatePage);
