// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AnimateLayoutPage, ErrorBoundary } from '@breef/shared/ui-components';

export default function Page404() {
    return (
        <AnimateLayoutPage headTitle="403">
            <ErrorBoundary message="403 - Permission denied to load this page" />
        </AnimateLayoutPage>
    );
}
