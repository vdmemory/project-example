import { AppProps } from 'next/app';

import { initializeErrorLogging, ErrorLogging } from '@breef/shared/utils';
import {
    SENTRY_DSN,
    APP_ENVIRONMENT,
    GOOGLE_CLIENT_ID,
} from '@breef/shared/constants';
import { wrapper } from '../setup/store';
import { Layout, Script } from '../components';
import { Integrations } from '@sentry/tracing';
import dynamic from 'next/dynamic';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Toastify = dynamic(
    () => import('@breef/shared/ui-components').then(item => item.Toastify),
    {
        ssr: false,
    },
);
const ErrorBoundary = dynamic(
    () =>
        import('@breef/shared/ui-components').then(item => item.ErrorBoundary),
    {
        ssr: false,
    },
);

const MediaProvider = dynamic(
    () => import('@breef/shared/hooks').then(item => item.MediaProvider),
    {
        ssr: false,
    },
);

initializeErrorLogging();

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ErrorLogging.ErrorBoundary fallback={<ErrorBoundary />} showDialog>
                <Script gtm={true} />
                <MediaProvider>
                    <Layout>
                        <GoogleOAuthProvider
                            onScriptLoadSuccess={() =>
                                console.log('[google script load success]')
                            }
                            onScriptLoadError={() =>
                                console.log('[google script load error]')
                            }
                            clientId={GOOGLE_CLIENT_ID}
                        >
                            <Component {...pageProps} />
                        </GoogleOAuthProvider>

                        <Toastify />
                    </Layout>
                </MediaProvider>
            </ErrorLogging.ErrorBoundary>
        </>
    );
}

export default wrapper.withRedux(CustomApp);
