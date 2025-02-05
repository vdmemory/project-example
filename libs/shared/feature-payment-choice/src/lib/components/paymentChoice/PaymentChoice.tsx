import {
    PAYMENT_COMMISSION_BY_CREDIT_CARD,
    PROJECTS_ROUTE,
    PaymentScheduleRequest,
    DASHBOARD_PAYMENTS_ROUTE,
} from '@breef/shared/constants';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import {
    ExpandedStepperNavigation,
    LoaderWrapper,
    NavControl,
    Section,
} from '@breef/shared/ui-components';

import { PaymentMethodNames } from '../../types/paymentDataTypes';
import { Fragment, useEffect, useState } from 'react';
import { StyledPayment, StyledPaymentChoice } from './PaymentChoice.styled';
import { calculateAmountFee } from '@breef/shared/utils';
import AchSection from './achSection/AchSection';
import BreefPaySection from './breefPaySection/BreefPaySection';
import CreditCardSection from './creditCardSection/CreditCardSection';
import WireSection from './wireSection/WireSection';
import { paymentTabs } from '../../utils/config/tabs';
import LeftSectionPaymentChoice from './leftSectionPaymentChoice/LeftSectionPaymentChoice';
import {
    useGetPaymentInfoQuery,
    useLazyDownloadInvoiceDocumentQuery,
} from '@breef/shared/data-access-payments';
import { toast } from 'react-toastify';
import { Tabs } from '@breef/ui-kit';
import { ListType } from '@breef/shared/types';

export const PaymentChoice = () => {
    const { changePage, queryParams } = useRouteControl();

    const { isMaxMobile } = useMediaContext();
    const [isSuccessTag, setIsSuccessTag] = useState<boolean>(false);
    const [document, setDocument] = useState<ListType[]>([]);

    const paymentIntentClientSecretParam =
        (queryParams as { payment_intent_client_secret?: string })
            .payment_intent_client_secret || null;

    const paymentId = (queryParams as { paymentId?: number }).paymentId || 0;
    const projectId = (queryParams as { projectId?: number }).projectId || 0;

    const {
        data: payment,
        isSuccess,
        isError,
        error,
        isLoading,
    } = useGetPaymentInfoQuery({
        paymentId,
    });
    const isNotAvailablePage =
        payment?.status !== PaymentScheduleRequest.invoiceSent;

    useEffect(() => {
        if (isSuccess && isNotAvailablePage) {
            changePage(PROJECTS_ROUTE);
        }
        //eslint-disable-next-line
    }, [isSuccess]);

    useEffect(() => {
        if (isError && (error as { status: number }).status === 403) {
            toast.error('No permissions to view this page');
            changePage(PROJECTS_ROUTE);
            return;
        }

        if (isError && (error as { status: number }).status !== 403) {
            changePage(
                DASHBOARD_PAYMENTS_ROUTE.reverse({ projectId }) as string,
            ).finally(() => {
                toast.error('An error occurred while loading payment info');
            });
        }
        //eslint-disable-next-line
    }, [error, isError]);

    const [
        downloadInvoice,
        { isLoading: isLoadingInvoice, isFetching: isFetchingInvoice },
    ] = useLazyDownloadInvoiceDocumentQuery();

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethodNames | null>(null);

    useEffect(() => {
        if (paymentIntentClientSecretParam)
            return setPaymentMethod(PaymentMethodNames.CARD);

        if (isMaxMobile && paymentMethod === PaymentMethodNames.ACH)
            return setPaymentMethod(null);
        if (!isMaxMobile && !paymentMethod)
            return setPaymentMethod(PaymentMethodNames.ACH);

        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMaxMobile, paymentIntentClientSecretParam]);

    const handleClick = (type: string) => {
        setPaymentMethod(type as PaymentMethodNames);
    };

    const amount = payment?.amount || 0;
    const fee = calculateAmountFee(amount, PAYMENT_COMMISSION_BY_CREDIT_CARD);

    const handleChangeNavigation = () => {
        if (isMaxMobile && !!paymentMethod) {
            return setPaymentMethod(null);
        }

        changePage(DASHBOARD_PAYMENTS_ROUTE.reverse({ projectId }) as string);
    };

    const isHideTabs = isMaxMobile && !!paymentMethod;

    const renderPaymentContent = () => {
        switch (paymentMethod) {
            case PaymentMethodNames.ACH:
                return (
                    <AchSection
                        amount={amount}
                        isHideTabs={isHideTabs}
                        onClick={handleClick}
                        paymentMethod={paymentMethod}
                        tabs={paymentTabs}
                        setIsSuccessTag={setIsSuccessTag}
                    />
                );
            case PaymentMethodNames.CARD:
                return (
                    <CreditCardSection
                        amount={amount}
                        fee={fee}
                        isHideTabs={isHideTabs}
                        onClick={handleClick}
                        paymentMethod={paymentMethod}
                        tabs={paymentTabs}
                        setIsSuccessTag={setIsSuccessTag}
                    />
                );
            case PaymentMethodNames.WIRE:
                return (
                    <WireSection
                        isHideTabs={isHideTabs}
                        onClick={handleClick}
                        paymentMethod={paymentMethod}
                        tabs={paymentTabs}
                        amount={amount}
                        setIsSuccessTag={setIsSuccessTag}
                        setDocument={setDocument}
                        document={document}
                    />
                );
            case PaymentMethodNames.BREEF:
                return (
                    <BreefPaySection
                        isHideTabs={isHideTabs}
                        onClick={handleClick}
                        paymentMethod={paymentMethod}
                        tabs={paymentTabs}
                        amount={amount}
                    />
                );
            default:
                return (
                    <Fragment>
                        <h3 className="title">Make Payment</h3>
                        <Section label="select a payment method">
                            <Tabs
                                className="tabs"
                                tabs={paymentTabs}
                                onClick={handleClick}
                                activeTab={paymentMethod}
                            />
                        </Section>
                    </Fragment>
                );
        }
    };

    if (isLoading || isNotAvailablePage || isError) {
        return <LoaderWrapper />;
    }

    if (isSuccess) {
        return (
            <StyledPaymentChoice isMobile={isMaxMobile && !!paymentMethod}>
                <NavControl
                    handleBack={handleChangeNavigation}
                    isStatic
                    isSticky
                >
                    <ExpandedStepperNavigation
                        title={payment.projectName}
                        readOnly
                        onButtonClick={() => changePage(PROJECTS_ROUTE)}
                        buttonTitle="Save + Exit"
                    />
                </NavControl>

                <div className="content-wrapper">
                    <LeftSectionPaymentChoice
                        {...payment}
                        tag={
                            isSuccessTag
                                ? {
                                      title: 'processing',
                                      sentiment: 'informative',
                                  }
                                : payment.tag
                        }
                        handleDownloadInvoice={() =>
                            downloadInvoice({ paymentId })
                        }
                        invoiceIsLoaded={isLoadingInvoice || isFetchingInvoice}
                    />

                    <div className="right-section">
                        <StyledPayment data-testid="selection-wrapper">
                            {renderPaymentContent()}
                        </StyledPayment>
                    </div>
                </div>
            </StyledPaymentChoice>
        );
    }

    return null;
};

export default PaymentChoice;
