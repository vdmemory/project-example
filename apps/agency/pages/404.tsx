import { AnimateLayoutPage, ErrorBoundary } from '@breef/shared/ui-components';

export default function Page404() {
    return (
        <AnimateLayoutPage headTitle="404">
            <ErrorBoundary message="404 - Page Not Found" />
        </AnimateLayoutPage>
    );
}
