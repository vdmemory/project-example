/* eslint-disable-next-line */
import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    TermsOfUseStandard,
} from '@breef/shared/ui-components';

export function TermsOfUseStandardPage() {
    return (
        <AnimateLayoutPage headTitle="Terms Of Use">
            <HeaderPagesSupport title="Terms of use" />
            <TermsOfUseStandard role="agency" />
        </AnimateLayoutPage>
    );
}

export default TermsOfUseStandardPage;
