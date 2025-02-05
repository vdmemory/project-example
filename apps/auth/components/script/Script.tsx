import { GOOGLE_TAG_MANAGER_ID } from '@breef/shared/constants';
import Script from 'next/script';

export default function ScriptApp({ gtm }: { gtm: boolean }) {
    if (gtm) {
        return (
            <>
                <Script
                    async
                    id="gtm"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
                            `,
                    }}
                />
                <Script
                    id="gtag"
                    async
                    src={`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`}
                />
                <Script
                    id="ga-tracking"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GOOGLE_TAG_MANAGER_ID}');
                        `,
                    }}
                />
            </>
        );
    }

    return null;
}
