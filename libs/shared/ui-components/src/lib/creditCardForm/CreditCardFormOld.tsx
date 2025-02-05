import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    AddressElement,
} from '@stripe/react-stripe-js';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../button/Button';
import {
    StyledCreditCardFormOld,
    StyledPoweredByStripe,
    StyledRow,
} from './CreditCardFormOld.styled';
import {
    addressOptions,
    creditCardOptions,
} from './utils/stylesStripeElements/stylesStripe';
import { Section } from '../section/Section';
import {
    CardElementsNamesType,
    ElementsNames,
    useStripeElements,
} from './hook/useStripeElements';
import { SmallStripeLogoIcon, Switch } from '@breef/ui-kit';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';
import { useGetCardBillingDetailsQuery } from '@breef/shared/data-access-payments';
import { toast } from 'react-toastify';
import { Label } from './components/label/Label';
import { LoaderWrapper } from './components/loaderWrapper/LoaderWrapper';
import LipsLoader from '../loader/lipsLoader/LipsLoader';

interface CardPaymentFormProps {
    onClick: (
        token: string,
        options: CreateTokenCardData,
        saveCard?: boolean,
        callBack?: () => void,
    ) => void;
    isSubmitted?: boolean;
    isDisabledBtn?: boolean;
    hideCardBillingTitle?: boolean;
    nameSubmitBtn?: string;
    isShowSwitcher?: boolean;
    setCardToken?: (cardId: string | null) => void;
    cardToken?: string | null;
    children?: ReactNode;
}

export const CreditCardFormOld = ({
    onClick,
    isSubmitted,
    isDisabledBtn,
    nameSubmitBtn = 'Pay + Post',
    isShowSwitcher,
    setCardToken,
    cardToken,
    children,
}: CardPaymentFormProps) => {
    const [isSaveCard, setIsSaveCard] = useState(false);
    const [focusElement, setFocusElement] = useState<ElementsNames | null>(
        null,
    );

    const {
        data: cardData,
        isFetching,
        isError,
    } = useGetCardBillingDetailsQuery(
        { cardToken: cardToken ?? '' },
        { skip: !cardToken, refetchOnMountOrArgChange: true },
    );

    const getAddressPreset = () => {
        if (!cardData) {
            return addressOptions;
        }
        const {
            name,
            address: { postalCode, ...rest },
        } = cardData.billingDetails;
        return {
            ...addressOptions,
            defaultValues: {
                name,
                address: { postal_code: postalCode, ...rest },
            },
        };
    };

    const {
        handleSubmit,
        handleReadyElements,
        handleChangeElements,
        errorsElements,
        resetErrorElements,
        readyElements,
        isProcessing,
    } = useStripeElements({
        callBack: onClick,
        isSave: isSaveCard,
        cardToken,
    });

    const handleFocus = (element: ElementsNames | null) => {
        setFocusElement(element);
    };
    const onBlurElement = (elementName: CardElementsNamesType) => {
        handleFocus(null);
        if (errorsElements[elementName]?.includes('required')) {
            resetErrorElements(elementName);
        }
    };

    useEffect(() => {
        return () => {
            cardToken && setCardToken?.(null);
        };
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isError) {
            const message = 'Fetching card info is failed.';
            toast.error(message, { toastId: message });
        }
    }, [isError]);

    if (isFetching || isError) {
        return <LipsLoader />;
    }

    return (
        <StyledCreditCardFormOld className="form-card">
            <Section label="card details">
                <Label
                    isFocus={focusElement === ElementsNames.NUMBER}
                    hasInputWrapper
                    label="Card number"
                    error={errorsElements.number}
                    isReadonly={!!cardData}
                >
                    {cardData ? (
                        <span>{cardData.last4}</span>
                    ) : (
                        <LoaderWrapper isLoading={!readyElements.number}>
                            <CardNumberElement
                                id="card-number-element"
                                onReady={() =>
                                    handleReadyElements(ElementsNames.NUMBER)
                                }
                                options={creditCardOptions.number}
                                onChange={event =>
                                    handleChangeElements(
                                        event,
                                        ElementsNames.NUMBER,
                                    )
                                }
                                onFocus={() =>
                                    handleFocus(ElementsNames.NUMBER)
                                }
                                onBlur={() =>
                                    onBlurElement(ElementsNames.NUMBER)
                                }
                            />
                        </LoaderWrapper>
                    )}
                </Label>
                <StyledRow>
                    <Label
                        isFocus={focusElement === ElementsNames.EXPIRY}
                        hasInputWrapper
                        label="Expiry (MM/YY)"
                        error={errorsElements.expiry}
                        isReadonly={!!cardData}
                    >
                        {cardData ? (
                            <span>{cardData.expiredDate}</span>
                        ) : (
                            <LoaderWrapper isLoading={!readyElements.expiry}>
                                <CardExpiryElement
                                    id="card-expiry-element"
                                    onReady={() =>
                                        handleReadyElements(
                                            ElementsNames.EXPIRY,
                                        )
                                    }
                                    options={creditCardOptions.expirationDate}
                                    onChange={event =>
                                        handleChangeElements(
                                            event,
                                            ElementsNames.EXPIRY,
                                        )
                                    }
                                    onFocus={() =>
                                        handleFocus(ElementsNames.EXPIRY)
                                    }
                                    onBlur={() =>
                                        onBlurElement(ElementsNames.EXPIRY)
                                    }
                                />
                            </LoaderWrapper>
                        )}
                    </Label>
                    <Label
                        isFocus={focusElement === ElementsNames.CVC}
                        hasInputWrapper
                        label="CVC"
                        error={errorsElements.cvc}
                        isReadonly={!!cardData}
                    >
                        {cardData ? (
                            <span>•••</span>
                        ) : (
                            <LoaderWrapper isLoading={!readyElements.cvc}>
                                <CardCvcElement
                                    id="card-cvc-element"
                                    onReady={() =>
                                        handleReadyElements(ElementsNames.CVC)
                                    }
                                    options={creditCardOptions.cvc}
                                    onChange={event =>
                                        handleChangeElements(
                                            event,
                                            ElementsNames.CVC,
                                        )
                                    }
                                    onFocus={() =>
                                        handleFocus(ElementsNames.CVC)
                                    }
                                    onBlur={() =>
                                        onBlurElement(ElementsNames.CVC)
                                    }
                                />
                            </LoaderWrapper>
                        )}
                    </Label>
                </StyledRow>
            </Section>
            <Section label="billing details">
                <AddressElement
                    options={getAddressPreset()}
                    onReady={() => handleReadyElements(ElementsNames.ADDRESS)}
                    onFocus={() => handleFocus(ElementsNames.ADDRESS)}
                />
            </Section>
            {isShowSwitcher && (
                <Section>
                    <Switch
                        label="Save for future payments"
                        isOn={isSaveCard}
                        onToggle={() => setIsSaveCard(prev => !prev)}
                    />
                </Section>
            )}
            {children && <Section>{children}</Section>}
            {readyElements.address && <PoweredByStripe />}
            <Button
                disabled={isDisabledBtn}
                isSubmitting={isProcessing || isSubmitted}
                className="medium"
                onClick={handleSubmit}
                title={nameSubmitBtn}
                withAnimate
            />
        </StyledCreditCardFormOld>
    );
};

export default CreditCardFormOld;

const PoweredByStripe = () => {
    return (
        <StyledPoweredByStripe>
            <SmallStripeLogoIcon />
            powered by stripe
        </StyledPoweredByStripe>
    );
};
