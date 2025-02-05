import {
    FullPaymentScheduleAgency,
    PaymentStatusType,
} from '@breef/shared/types';
import { usePaymentTag } from './usePaymentTag';
import {
    capitalizeFirstLetter,
    formatBudgetCost,
    limitSymbols,
} from '@breef/shared/utils';
import { AccessDeniedButton, LinkButton } from '@breef/shared/ui-components';
import moment from 'moment';
import React, { ReactNode, useCallback, useContext } from 'react';
import { DownloadIcon } from '@breef/shared/assets';
import { useLazyDownloadInvoiceDocumentQuery } from '@breef/shared/data-access-payments';
import {
    PaymentSchedule,
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
    PROJECT_PAYMENT_CHOICE_ROUTE,
} from '@breef/shared/constants';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useMediaContext } from '@breef/shared/hooks';

export const useTableRowsClient = (
    projectId: string,
    payments: FullPaymentScheduleAgency[],
    isAccessDenied: boolean,
) => {
    const { getPaymentTagComponent } = usePaymentTag();
    const router = useRouter();
    const { isMobile } = useMediaContext();

    const [downloadInvoice, { isFetching: isLoadingInvoice }] =
        useLazyDownloadInvoiceDocumentQuery();

    const handlePayNow = useCallback(
        (payId: number | string) => {
            router.push(
                `${
                    PROJECT_PAYMENT_CHOICE_ROUTE.reverse({
                        projectId: projectId,
                        paymentId: payId,
                    }) || ''
                }`,
            );
        },
        [projectId, router],
    );

    const onClickAction = useCallback(
        (paymentId: number, action: string) => {
            switch (action) {
                case 'make-payment':
                    return handlePayNow(paymentId);
                case 'download':
                    return downloadInvoice({ paymentId })
                        .unwrap()
                        .catch(e => {
                            if (e.status === 403) {
                                const message =
                                    "You don't have permissions to download invoice";
                                toast.error(message, { toastId: message });
                            }
                        });
            }
        },
        [downloadInvoice, handlePayNow],
    );

    const getWarningTip = (tag: PaymentScheduleTag) => {
        switch (tag) {
            case PaymentScheduleTag[PaymentScheduleTagRequest.paymentDue]:
                return 'Please complete this payment';
            default:
                return undefined;
        }
    };

    const checkIsDisabledDownloadInvoice = (status: PaymentStatusType) =>
        status === 'awaiting' ||
        status === 'approval' ||
        status === 'cancelled';
    const checkIsDisabledMakePayment = (status: PaymentStatusType) =>
        status !== 'invoiceSent';

    const renderAccessDeniedWrapper = (
        children: ReactNode,
        message: string,
    ) => {
        if (!isAccessDenied) return children;
        return (
            <AccessDeniedButton placement="left" message={message}>
                {children}
            </AccessDeniedButton>
        );
    };

    const rows = React.useMemo(
        () =>
            payments.map(payment => ({
                id: payment.id,
                invoiceCode: payment.invoiceCode,
                status: getPaymentTagComponent(
                    payment.tag,
                    getWarningTip(payment.tag),
                ),
                description: limitSymbols(25, payment.deliverable, true),
                type: capitalizeFirstLetter(payment.scheduleType),
                invoiceDate: moment(payment.invoiceDate).format('MMM D, YYYY'),
                payBy: moment(payment.paymentDue).format('MMM D, YYYY'),
                amount: formatBudgetCost(Number(payment.amount)),
                actionButton: renderAccessDeniedWrapper(
                    <LinkButton
                        disabled={
                            checkIsDisabledMakePayment(payment.status) ||
                            isAccessDenied
                        }
                        className="button-link"
                        line
                        name="Pay Now"
                        onClick={() =>
                            onClickAction(Number(payment.id), 'make-payment')
                        }
                    />,
                    'Payment functionality is not enabled for your type of user. Please reach out to your company owner.',
                ),
                downloadInvoice: renderAccessDeniedWrapper(
                    <button
                        className="button-icon"
                        disabled={
                            checkIsDisabledDownloadInvoice(payment.status) ||
                            isAccessDenied
                        }
                        onClick={() =>
                            onClickAction(Number(payment.id), 'download')
                        }
                    >
                        <DownloadIcon />
                    </button>,
                    'Invoice downloading is not enabled for your type of user. Please reach out to your company owner.',
                ),
            })),
        [getPaymentTagComponent, onClickAction, payments],
    );

    const mobileViewButtons = isMobile
        ? payments.map(payment => {
              const isEnableDownloadInvoice = !checkIsDisabledDownloadInvoice(
                  payment.status,
              );
              const isEnablePayButton = !checkIsDisabledMakePayment(
                  payment.status,
              );
              return {
                  id: payment.id,
                  button: isEnablePayButton
                      ? {
                            title: 'Make Payment',
                            onClick: () =>
                                onClickAction(
                                    Number(payment.id),
                                    'make-payment',
                                ),
                            arrowRight: true,
                        }
                      : undefined,
                  link: isEnableDownloadInvoice
                      ? {
                            title: 'Download Invoice',
                            onClick: () =>
                                onClickAction(Number(payment.id), 'download'),
                        }
                      : undefined,
              };
          })
        : undefined;

    const notCancelledPayments = payments.filter(
        item => item.status !== PaymentSchedule.cancelled,
    );
    const footerRow = {
        payBy: 'Totals:',
        amount: formatBudgetCost(
            notCancelledPayments.reduce(
                (acc, curr) => (acc += Number(curr.amount)),
                0,
            ),
        ),
    };

    return {
        rows,
        footerRow,
        isLoading: isLoadingInvoice,
        mobileViewButtons,
    };
};
