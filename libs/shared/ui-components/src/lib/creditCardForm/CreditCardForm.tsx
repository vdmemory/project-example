import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    AddressElement,
} from '@stripe/react-stripe-js';
import { ReactNode, useEffect, useState } from 'react';
import {
    loaderStyles,
    StyledCreditCardForm,
    StyledRow,
} from './CreditCardForm.styled';
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
import { Button, Switch } from '@breef/ui-kit';
import {
    CreateTokenCardData,
    StripeAddressElementOptions,
    StripeCardCvcElementOptions,
    StripeCardExpiryElementOptions,
    StripeCardNumberElementOptions,
} from '@stripe/stripe-js/types/stripe-js';
import { useGetCardBillingDetailsQuery } from '@breef/shared/data-access-payments';
import { toast } from 'react-toastify';
import { Label } from './components/label/Label';
import { LoaderWrapper } from './components/loaderWrapper/LoaderWrapper';
import { useMediaContext } from '@breef/shared/hooks';
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
    isOnSaveCard?: boolean;
    stylesStripe?: {
        creditCardOptions: {
            number: StripeCardNumberElementOptions;
            cvc: StripeCardCvcElementOptions;
            expirationDate: StripeCardExpiryElementOptions;
        };
        addressOptions: StripeAddressElementOptions;
    };
    textBlock?: ReactNode;
}

export const CreditCardForm = ({
    onClick,
    isSubmitted,
    isDisabledBtn,
    nameSubmitBtn = 'Pay + Post',
    isShowSwitcher,
    setCardToken,
    cardToken,
    children,
    isOnSaveCard,
    stylesStripe,
    textBlock,
}: CardPaymentFormProps) => {
    const { isMobile } = useMediaContext();
    const [isSaveCard, setIsSaveCard] = useState(isOnSaveCard ?? false);
    const [focusElement, setFocusElement] = useState<ElementsNames | null>(
        null,
    );

    const stripeStyles = stylesStripe ?? {
        creditCardOptions,
        addressOptions,
    };

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
            return stripeStyles.addressOptions;
        }
        const {
            name,
            address: { postalCode, ...rest },
        } = cardData.billingDetails;
        return {
            ...stripeStyles.addressOptions,
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
        return (
            <div style={loaderStyles}>
                <LipsLoader />
            </div>
        );
    }

    return (
        <StyledCreditCardForm className="form-card">
            <Section>
                <Label
                    className="card-number"
                    isFocus={focusElement === ElementsNames.NUMBER}
                    hasInputWrapper
                    label={!isMobile ? 'Card Details' : 'Card Number'}
                    error={errorsElements.number}
                    isReadonly={!!cardData}
                    isHideErrorMessage
                    isRedesign
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
                                options={stripeStyles.creditCardOptions.number}
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
                <StyledRow className="row row-group">
                    <Label
                        label={isMobile ? 'Expiry' : ''}
                        className="card-expiration"
                        isFocus={focusElement === ElementsNames.EXPIRY}
                        hasInputWrapper
                        error={errorsElements.expiry}
                        isReadonly={!!cardData}
                        isRedesign
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
                                    options={
                                        !isMobile
                                            ? stripeStyles.creditCardOptions
                                                  .expirationDate
                                            : {
                                                  ...stripeStyles
                                                      .creditCardOptions
                                                      .expirationDate,
                                                  ...{ placeholder: '(MM/YY)' },
                                              }
                                    }
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
                        label={isMobile ? 'CVC' : ''}
                        className="card-cvc"
                        isFocus={focusElement === ElementsNames.CVC}
                        hasInputWrapper
                        error={errorsElements.cvc}
                        isReadonly={!!cardData}
                        isRedesign
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
                                    options={stripeStyles.creditCardOptions.cvc}
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
            <Section>
                <AddressElement
                    options={getAddressPreset()}
                    onReady={() => handleReadyElements(ElementsNames.ADDRESS)}
                    onFocus={() => handleFocus(ElementsNames.ADDRESS)}
                />
            </Section>
            {isShowSwitcher && (
                <Switch
                    label="Save for future payments"
                    isOn={isSaveCard}
                    onToggle={() => setIsSaveCard(prev => !prev)}
                />
            )}
            {children && children}
            <Button
                isDisabled={isDisabledBtn}
                isSubmitted={isProcessing || isSubmitted}
                className={`submit ${isShowSwitcher ? 'post' : 'edit'}`}
                onClick={handleSubmit}
                label={nameSubmitBtn}
                size="large"
                isUppercase
            />
            {textBlock && (
                <div
                    className={`text-block ${isShowSwitcher ? 'post' : 'edit'}`}
                >
                    {textBlock}
                </div>
            )}
        </StyledCreditCardForm>
    );
};

export default CreditCardForm;
