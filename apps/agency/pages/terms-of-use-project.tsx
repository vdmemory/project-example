/* eslint-disable-next-line */
import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    TermsOfUseProject,
} from '@breef/shared/ui-components';

export function TermsOfUseProjectPage() {
    return (
        <AnimateLayoutPage headTitle="Terms Of Use Project">
            <HeaderPagesSupport title="project terms" />
            <TermsOfUseProject role="agency" />
        </AnimateLayoutPage>
    );
}

export default TermsOfUseProjectPage;
