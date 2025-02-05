import { useElements, useStripe } from '@stripe/react-stripe-js';
import {
    StripeCardExpiryElementChangeEvent,
    StripeCardCvcElementChangeEvent,
    StripeCardNumberElementChangeEvent,
    StripeCardNumberElement,
    Stripe,
} from '@stripe/stripe-js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { transformAddressData } from '../utils/adapters/transformAddressData';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';

export enum ElementsNames {
    NUMBER = 'number',
    EXPIRY = 'expiry',
    CVC = 'cvc',
    ADDRESS = 'address',
}
export type CardElementsNamesType =
    | ElementsNames.NUMBER
    | ElementsNames.EXPIRY
    | ElementsNames.CVC;
export type ErrorElementsType = {
    [key in CardElementsNamesType]: string;
};

const defaultsErrorsElements: ErrorElementsType = {
    number: '',
    expiry: '',
    cvc: '',
};

export type ReadyElementsType = {
    number: boolean;
    expiry: boolean;
    cvc: boolean;
    address: boolean;
};

const defaultsReadyElements: ReadyElementsType = {
    number: false,
    expiry: false,
    cvc: false,
    address: false,
};

const ERROR_CREATE_TOKEN_CARD =
    'An error occurred while creating the token, please try again';

interface StripeElementsProps {
    callBack: (
        token: string,
        options: CreateTokenCardData,
        saveCard?: boolean,
        callBack?: () => void,
    ) => void;
    isSave: boolean;
    cardToken?: string | null;
}

export const useStripeElements = ({
    callBack,
    isSave,
    cardToken,
}: StripeElementsProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const [readyElements, setReadyElements] = useState<ReadyElementsType>(
        defaultsReadyElements,
    );

    const [errorsElements, setErrorsElements] = useState<ErrorElementsType>(
        defaultsErrorsElements,
    );

    const [isProcessing, setProcessingTo] = useState(false);

    const handleReadyElements = (field: string) => {
        setReadyElements(prev => ({ ...prev, [field]: true }));
    };

    const handleChangeElements = (
        event:
            | StripeCardExpiryElementChangeEvent
            | StripeCardCvcElementChangeEvent
            | StripeCardNumberElementChangeEvent,
        field: string,
    ) => {
        setErrorsElements(prev => ({ ...prev, [field]: event.error?.message }));
    };

    const resetErrorElements = (field: string) => {
        setErrorsElements(prev => ({ ...prev, [field]: '' }));
    };

    const getIsValidCard = () => {
        const isCardErrors = Object.values(errorsElements).some(error => error);
        if (isCardErrors) {
            return false;
        }

        if (
            document.querySelector('#card-number-element.StripeElement--empty')
        ) {
            setErrorsElements(prev => ({
                ...prev,
                [ElementsNames.NUMBER]: 'Card number is required.',
            }));
            return false;
        }
        if (
            document.querySelector('#card-expiry-element.StripeElement--empty')
        ) {
            setErrorsElements(prev => ({
                ...prev,
                [ElementsNames.EXPIRY]: 'Expiry number is required.',
            }));
            return false;
        }
        if (document.querySelector('#card-cvc-element.StripeElement--empty')) {
            setErrorsElements(prev => ({
                ...prev,
                [ElementsNames.CVC]: 'CVC number is required.',
            }));
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!stripe || !elements || !getIsValidCard()) {
            return;
        }

        const cardNumber = elements.getElement('cardNumber');
        const addressElement = elements.getElement('address');

        try {
            setProcessingTo(true);
            const result = await addressElement?.getValue();
            if (!result?.complete) {
                return;
            }
            const options = transformAddressData(result.value);
            if (cardToken) {
                callBack(cardToken, options);
            } else if (cardNumber) {
                const token = await getCardToken(stripe, cardNumber, options);
                callBack(token.id, options, isSave);
            }
        } catch (error) {
            toast.error(
                (error as { message: string }).message ||
                    ERROR_CREATE_TOKEN_CARD,
            );
        } finally {
            setProcessingTo(false);
        }
    };

    return {
        handleSubmit,
        handleReadyElements,
        handleChangeElements,
        errorsElements,
        resetErrorElements,
        readyElements,
        isProcessing,
    };
};

export const getCardToken = async (
    stripe: Stripe,
    cardNumber: StripeCardNumberElement,
    options: CreateTokenCardData,
) => {
    const { token, error } = await stripe.createToken(cardNumber, options);
    if (error) {
        throw error;
    }
    return token;
};
