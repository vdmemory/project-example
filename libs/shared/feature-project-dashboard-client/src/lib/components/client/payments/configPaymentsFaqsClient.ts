import { magnifierBlueImage } from '@breef/shared/assets';

export const configPaymentFaqsClient = {
    title: 'Payment Faqs',
    image: {
        src: magnifierBlueImage.src,
        position: {
            right: 15,
            bottom: 0,
        },
    },
    answersData: [
        {
            title: 'What payment methods are accepted by Breef?',
            description: `<p>Payment methods through Breef include wire, direct ACH, and credit card. Please note credit card payments incur a 3% processing fee per payment and this is the responsibility of the client. Breef(pay) coming soon!</p>`,
        },
        {
            title: 'What should I do if something looks incorrect in the payment schedule?',
            description: `<p>Please reach out directly to the agency if anything looks incorrect - they will be able to make direct changes to the payment schedule or submit adjustments to Breef.</p>`,
        },
        {
            title: 'What if I want to expand my project with the agency?',
            description: `<p>Let’s do it!  Reach out to <a href="mailto:payments@breef.com">payments@breef.com</a> to chat about how you want to expand your project, we’re here to make it happen!</p>`,
        },
    ],
};
