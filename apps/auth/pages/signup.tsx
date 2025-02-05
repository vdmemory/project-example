// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import dynamic from 'next/dynamic';

const SignUp = dynamic(
    () => import('@breef/shared/feature-auth').then(item => item.SignUp),
    {
        ssr: false,
    },
);

export default function SignUpPage() {
    return (
        <AnimateLayoutPage headTitle="Sign Up">
            <SignUp />
        </AnimateLayoutPage>
    );
}
