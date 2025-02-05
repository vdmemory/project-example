// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    TermsOfUseBreef,
} from '@breef/shared/ui-components';

export function TermsOfUsePage() {
    return (
        <AnimateLayoutPage headTitle="Terms Of Use">
            <HeaderPagesSupport title="Terms of use" />
            <TermsOfUseBreef role="public" />
        </AnimateLayoutPage>
    );
}

export default TermsOfUsePage;
