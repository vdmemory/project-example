import { AnimateLayoutPage, ErrorBoundary } from '@breef/shared/ui-components';
import { internalServerErrorMessage } from '@breef/shared/utils';

export default function Page500() {
    const message = `500 - ${internalServerErrorMessage}`;

    return (
        <AnimateLayoutPage headTitle="500">
            <ErrorBoundary message={message} />
        </AnimateLayoutPage>
    );
}
