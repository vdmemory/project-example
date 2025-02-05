// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    AnimateLayoutPage,
    Faq,
    HeaderPagesSupport,
} from '@breef/shared/ui-components';

export function FaqPage() {
    return (
        <AnimateLayoutPage headTitle="FAQ">
            <HeaderPagesSupport title="frequently asked questions" />
            <Faq role="public" />
        </AnimateLayoutPage>
    );
}

export default FaqPage;
