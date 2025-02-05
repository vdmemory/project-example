import { REGISTRATION_FORM } from '@breef/shared/constants';
import { getStorageData, removeStorageData } from '@breef/shared/utils';
import { useEffect } from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage } from '@breef/shared/ui-components';

import dynamic from 'next/dynamic';

const Signin = dynamic(
    () => import('@breef/shared/feature-auth').then(item => item.Signin),
    {
        ssr: false,
    },
);

export default function SigninPage() {
    useEffect(() => {
        const isExistRegForm = getStorageData('local', REGISTRATION_FORM);
        if (isExistRegForm) removeStorageData('local', REGISTRATION_FORM);
    }, []);
    return (
        <AnimateLayoutPage headTitle="Sign In">
            <Signin />
        </AnimateLayoutPage>
    );
}
