import {
    AnimateLayoutPage,
    Faq,
    HeaderPagesSupport,
} from '@breef/shared/ui-components';

export function FaqPage() {
    return (
        <AnimateLayoutPage headTitle="FAQ">
            <HeaderPagesSupport title="frequently asked questions" />
            <Faq role="agency" />
        </AnimateLayoutPage>
    );
}

export default FaqPage;
