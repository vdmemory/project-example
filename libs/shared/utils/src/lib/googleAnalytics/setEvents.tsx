/* eslint-disable @typescript-eslint/ban-ts-comment */
export const googleAnalyticsEvent = () => {
    if (typeof window === 'undefined') return;
    // @ts-ignore
    if (typeof window.gtag !== 'undefined') {
        // @ts-ignore
        window.gtag('event', 'conversion', {
            send_to: 'AW-829006948/t5ZBCI6xuPsBEOTIposD',
        });
    }
    // @ts-ignore
    if (typeof window.fbq !== 'undefined') {
        // @ts-ignore
        // window.fbq('track', 'Lead');
    }
};
