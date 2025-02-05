import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    PrivacyPolicy,
} from '@breef/shared/ui-components';

export function PrivacyPolicyPage() {
    return (
        <AnimateLayoutPage headTitle="Privacy Policy">
            <HeaderPagesSupport title="Privacy Policy" />
            <PrivacyPolicy />
        </AnimateLayoutPage>
    );
}

export default PrivacyPolicyPage;
