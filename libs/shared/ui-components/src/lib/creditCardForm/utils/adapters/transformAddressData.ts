import {
    CreateTokenCardData,
    StripeAddressElementChangeEvent,
} from '@stripe/stripe-js/types/stripe-js';

export const transformAddressData = ({
    name,
    address: { line1, line2, city, state, postal_code, country },
}: StripeAddressElementChangeEvent['value']): CreateTokenCardData => {
    const addressData: CreateTokenCardData = {
        name,
        address_line1: line1,
        address_city: city,
        address_zip: postal_code,
        address_country: country,
    };

    if (line2) addressData.address_line2 = line2;
    if (state) addressData.address_state = state;

    return addressData;
};
