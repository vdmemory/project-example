import { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import {
    initializeErrorLogging,
    ErrorLogging,
    initializeMomentLocale,
} from '@breef/shared/utils';
import { SENTRY_DSN, APP_ENVIRONMENT } from '@breef/shared/constants';
import { ErrorBoundary } from '@breef/shared/ui-components';
import { wrapper } from '../setup/store';
import { Layout } from '../components';
import { Integrations } from '@sentry/tracing';

initializeErrorLogging();
initializeMomentLocale();

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ??
        (page => {
            return <Layout>{page}</Layout>;
        });

    return getLayout(
        <ErrorLogging.ErrorBoundary fallback={<ErrorBoundary />} showDialog>
            <Component {...pageProps} />
        </ErrorLogging.ErrorBoundary>,
    );
}

export default wrapper.withRedux(CustomApp);
