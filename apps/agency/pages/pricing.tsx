/* eslint-disable-next-line */
import {
    AnimateLayoutPage,
    HeaderPagesSupport,
    Pricing,
} from '@breef/shared/ui-components';

export function PricingPage() {
    return (
        <AnimateLayoutPage headTitle="Pricing">
            <HeaderPagesSupport title="Pricing" />
            <Pricing />
        </AnimateLayoutPage>
    );
}

export default PricingPage;
