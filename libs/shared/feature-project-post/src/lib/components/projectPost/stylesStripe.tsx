import { GOOGLE_API_KEY } from '@breef/shared/constants';
import { colors } from '@breef/ui-kit';
import {
    StripeAddressElementOptions,
    StripeCardCvcElementOptions,
    StripeCardExpiryElementOptions,
    StripeCardNumberElementOptions,
    StripeElementStyle,
} from '@stripe/stripe-js';

const baseStyle: StripeElementStyle = {
    base: {
        color: `${colors.grey.grey900}`,
        fontWeight: 400,
        fontFamily: 'Neue Haas Grotesk Display Pro',
        fontSize: '14px',
        '::placeholder': {
            color: `#C2C8CC`,
            fontSize: '14px',
        },
    },
    invalid: {
        color: `${colors.error.error500}`,
    },
};

export const creditCardOptions: {
    number: StripeCardNumberElementOptions;
    cvc: StripeCardCvcElementOptions;
    expirationDate: StripeCardExpiryElementOptions;
} = {
    number: {
        iconStyle: 'default',
        showIcon: true,
        style: baseStyle,
    },
    cvc: {
        style: baseStyle,
    },
    expirationDate: {
        style: baseStyle,
        placeholder: 'EXP (MM/YY)',
    },
};

export const addressOptions: StripeAddressElementOptions = {
    mode: 'billing',
    autocomplete: {
        mode: 'google_maps_api',
        apiKey: GOOGLE_API_KEY,
    },
    defaultValues: {
        address: {
            country: 'US',
        },
    },
};
