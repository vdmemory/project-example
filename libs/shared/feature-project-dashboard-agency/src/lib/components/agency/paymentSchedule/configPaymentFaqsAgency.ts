import { magnifierBlueImage } from '@breef/shared/assets';

export const configPaymentFaqsAgency = {
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
            title: 'How do I set up my banking details to receive payments?',
            description: `<p>After the client approves the payment schedule on Breef, you will receive an email from our payment system “Routable” with instructions on how to set up for direct deposit. This is a one-time set up. If you need to change your payout details at any time, please email <a href="mailto:payments@breef.com">payments@breef.com</a></p>`,
        },
        {
            title: 'How do I request a payment?',
            description: `<p>All payments are requested automatically from the client on the invoice date. If you need to adjust a payment request date, you can do that at any time prior to the invoice date.  Simply find the payment request you want to change in the payment schedule above, click Edit and choose a new invoice date.</p>`,
        },
        {
            title: 'How do I track the status of payment?',
            description: `<p>Once a payment has been made by a client, funds will be processed to your team, minus any applicable Breef Fees. Processing time varies depending on the payment method used by the client. The payment schedule above is updated in real time so you can track the current status of your payments.</p>`,
        },
    ],
};
