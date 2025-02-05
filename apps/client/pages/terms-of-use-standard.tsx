/* eslint-disable-next-line */

import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    TermsOfUseStandard,
} from '@breef/shared/ui-components';

export function TermsOfUseStandardPage() {
    return (
        <AnimateLayoutPage headTitle="Terms Of Use Standard">
            <HeaderPagesSupport title="Terms of use" />
            <TermsOfUseStandard role="client" />
        </AnimateLayoutPage>
    );
}

export default TermsOfUseStandardPage;
