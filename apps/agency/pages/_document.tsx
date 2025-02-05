import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GOOGLE_API_KEY } from '@breef/shared/constants';
import Script from 'next/script';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <Script id="initMap" strategy="beforeInteractive">
                        {`
                        function initMap() {
                            console.log('initMap');
                        }

                        window.initMap = initMap;
                    `}
                    </Script>
                    <Script
                        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&region=US&language=en&callback=initMap`}
                        strategy="beforeInteractive"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
