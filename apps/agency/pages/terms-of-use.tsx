/* eslint-disable-next-line */

import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    TermsOfUseBreef,
} from '@breef/shared/ui-components';

export function TermsOfUsePage() {
    return (
        <AnimateLayoutPage headTitle="Terms Of Use">
            <HeaderPagesSupport title="Terms of use" />
            <TermsOfUseBreef role="agency" />
        </AnimateLayoutPage>
    );
}

export default TermsOfUsePage;
