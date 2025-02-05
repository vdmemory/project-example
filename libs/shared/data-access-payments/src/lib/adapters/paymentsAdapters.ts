import {
    PaymentStatusNames,
    PaymentSchedule,
    PaymentScheduleTag,
    PaymentTermsId,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import {
    AddPaymentsRequestType,
    AddPaymentsType,
    BankFinancialConnectionType,
    BanksResponseType,
    CardMoreResponseType,
    CardsResponseType,
    CouponsResponseType,
    CouponsValidateResponseType,
    PaymentAchDefaultBankRequestType,
    PaymentBankRequestType,
    PaymentCardRequestType,
    PaymentInfo,
    PaymentInfoRequest,
    PaymentRequestType,
    PaymentResponseType,
    PaymentScheduleKickoff,
    PaymentScheduleKickoffRequest,
    PaymentsScheduleRequestType,
    PaymentsScheduleType,
    PostProjectRequestType,
    RetainerPaymentRequestType,
    StatusTagType,
    StoredRetainerPaymentType,
    TransformBanksResponseType,
    TransformCardMoreResponseType,
    TransformCardsResponseType,
    TransformConnectSessionRequestType,
    TransformConnectSessionResponseType,
    TransformCouponsResponseType,
    TransformPaymentAchDefaultBankRequestType,
    TransformPaymentBankRequestType,
    TransformPaymentCardRequestType,
    TransformPaymentRequestType,
    TransformPaymentResponseType,
    TransformPostProjectRequestType,
    TransformWireResponseType,
    WireResponseType,
} from '@breef/shared/types';
import { urlToDefaultFormat } from '@breef/shared/utils';
import moment from 'moment';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export const transformPaymentCoupons = (
    response: CouponsResponseType,
): TransformCouponsResponseType | null => {
    const coupon = response.prefill_coupon;
    if (!coupon) return null;
    return {
        id: coupon.id,
        name: coupon.name,
        promoCode: coupon.promo_code,
        amountOff: coupon.amount_off,
        percentOff: coupon.percent_off,
        couponType: coupon.coupon_type,
        description: coupon.description,
    };
};

export const transformPaymentCouponsValidate = (
    coupon: CouponsValidateResponseType,
): TransformCouponsResponseType | null => {
    if (!coupon) return null;
    return {
        id: coupon.id,
        name: coupon.name,
        promoCode: coupon.promo_code,
        amountOff: coupon.amount_off,
        percentOff: coupon.percent_off,
        couponType: coupon.coupon_type,
        description: coupon.description,
    };
};

export const replaceCardYear = (year: number) => {
    return String(year).replace(/^[0-9]{2}/g, '');
};

export const transformPaymentCards = (
    response: CardsResponseType,
): TransformCardsResponseType[] => {
    return response.map(card => ({
        id: card.id,
        institutionName: card.billing_details.name,
        last4: updateCardNumber(card.card_number),
        brand: card.brand,
        token: card.id,
        type: PaymentStatusNames.CARD_EXIST,
        expiredDate: `${card.card_month}/${replaceCardYear(card.card_year)}`,
        address: card.billing_details.address,
    }));
};

export const transformWireData = (
    response: WireResponseType,
): TransformWireResponseType => {
    return {
        bankAccount: {
            bankName: response.bank_name,
            accountNumber: response.account,
            routingNumber: response.routing,
        },
        code: response.swift_code,
    };
};

export const transformConnectSession = (
    response: TransformConnectSessionResponseType,
): TransformConnectSessionRequestType => {
    return {
        customer: response.customer,
        FCSessionSecret: response.fc_session_secret,
    };
};

export const prepareBanksData = ({
    accounts,
}: PaymentBankRequestType): TransformPaymentBankRequestType[] => {
    return accounts.map(account => ({
        token: account.FCAToken,
        last4: account.last4 || '',
        display_name: account.displayName,
        institution_name: account.institutionName,
    }));
};

export const transformFCAccount = (
    bank: BankFinancialConnectionType,
): TransformBanksResponseType => {
    return {
        id: bank.id,
        token: bank.token,
        last4: updateBankAccount(bank.last4),
        displayName: bank.display_name,
        institutionName: bank.institution_name,
        type: PaymentStatusNames.FINANCIAL_CONNECTION,
        brand: bank.institution_name,
    };
};

export const transformBanksData = (
    banks: BanksResponseType,
): TransformBanksResponseType[] => {
    return banks.map(bank => ({
        id: bank.id,
        token: bank.token,
        last4: updateBankAccount(bank.last4),
        displayName: bank.display_name,
        institutionName: bank.institution_name,
        type: bank.bank_account_type,
        brand: bank.institution_name,
        default: bank.default,
    }));
};

export const preparePaymentCardData = ({
    token,
    projectId,
    cardHolder,
}: PaymentCardRequestType) => {
    const result: TransformPaymentCardRequestType = {
        token,
        project: Number(projectId),
        cardholder_name: cardHolder,
    };
    return result;
};

export const preparePostProjectData = ({
    token,
    projectId,
    paymentStatus,
    code,
    acceptedTerms,
}: PostProjectRequestType) => {
    const result: TransformPostProjectRequestType = {
        token,
        project: Number(projectId),
        token_type: paymentStatus,
    };
    if (code) result.promo_code = code;
    if (acceptedTerms) result.accepted_terms = acceptedTerms;

    return result;
};

export const preparePayment = ({
    token,
    paymentStatus,
}: PaymentRequestType): TransformPaymentRequestType => {
    const result: TransformPaymentRequestType = {
        token,
        token_type: paymentStatus,
    };

    return result;
};

export const prepareSetDefaultBank = ({
    token,
    paymentStatus,
}: PaymentAchDefaultBankRequestType): TransformPaymentAchDefaultBankRequestType => ({
    token,
    token_type: paymentStatus,
});

export const transformPayment = ({
    amount,
    transaction,
    pm_data: { institution_name, last4 },
}: PaymentResponseType): TransformPaymentResponseType => {
    const replaceTransaction = (transaction: string) => {
        return transaction.replace('pi_', '');
    };
    return {
        amount,
        transaction: replaceTransaction(transaction),
        name: institution_name,
        last4,
    };
};

export function transformPaymentsSchedule(
    response: PaymentsScheduleRequestType,
): PaymentsScheduleType {
    const notRequiredParams = {} as PaymentsScheduleType;
    if (response.payment_terms) {
        notRequiredParams.paymentTerms =
            PaymentTermsId[response.payment_terms as '7_days'];
    }
    return {
        ...notRequiredParams,
        payments: response.payments.map(item => ({
            amount: item.amount,
            deliverable: item.deliverable,
            invoiceDate: item.invoice_date, //getLocaleDateString(item.invoice_date),
            paymentDue: item.payment_due, //getLocaleDateString(item.payment_due),
            scheduleType: item.schedule_type,
            status: PaymentSchedule[item.status],
            tag: PaymentScheduleTag[item.tag],
            teamTake: item.team_take,
            id: item.id,
            invoiceCode: item.invoice_code,
            numberOfPayments: item.number_of_payments,
        })),
        paymentFrequency: response.payment_frequency || null,
    };
}

export function transformPaymentsScheduleKickoff(
    response: PaymentScheduleKickoffRequest,
): PaymentScheduleKickoff {
    return {
        oneTimePayments: response.one_time_payments.map(item => ({
            id: item.id,
            deliverable: item.deliverable,
            amount: item.amount,
            teamTake: item.team_take,
            invoiceDate: item.invoice_date,
            scheduleType: item.schedule_type,
            paymentDue: item.payment_due,
            status: PaymentSchedule[item.status],
            paymentFrequency: item.payment_frequency,
        })),
        ongoingPayment: response.ongoing_payment
            ? {
                  id: response.ongoing_payment.id,
                  deliverable: response.ongoing_payment.deliverable,
                  amount: response.ongoing_payment.amount,
                  teamTake: response.ongoing_payment.team_take,
                  invoiceDate: response.ongoing_payment.invoice_date,
                  scheduleType: response.ongoing_payment.schedule_type,
                  paymentDue: response.ongoing_payment.payment_due,
                  status: PaymentSchedule[response.ongoing_payment.status],
                  paymentFrequency: response.ongoing_payment.payment_frequency,
                  numberOfPayments: response.ongoing_payment.number_of_payments,
                  paymentTerms: response.ongoing_payment.payment_terms,
              }
            : null,
    };
}

export function transformPaymentRetainer(
    response: RetainerPaymentRequestType,
): StoredRetainerPaymentType {
    if (response.invoice_date) {
        return {
            deliverable: response.deliverable,
            invoiceDate: response.invoice_date, //getLocaleDateString(response.invoice_date),
            amount: response.amount,
            paymentFrequency: response.payment_frequency,
            numberOfPayments: response.number_of_payments + '',
            scheduleType: response.schedule_type
                ? (response.schedule_type as 'ongoing')
                : 'ongoing',
            id: response.id,
        };
    }
    return null;
}

export function transformPaymentInfo(
    response: PaymentInfoRequest,
): PaymentInfo {
    const logoUrl = response.agency_logo_url
        ? urlToDefaultFormat(response.agency_logo_url)
        : '';
    return {
        id: response.id,
        projectName: response.project_name,
        invoiceCode: response.invoice_code,
        dueDate: response.payment_due,
        invoiceDate: response.invoice_date,
        agencyName: response.agency_company_name,
        agencyLogo: logoUrl ?? '',
        amount: Number(response.amount),
        total: Number(response.amount),
        deliverable: response.deliverable,
        tag: transformPaymentTag(response.tag),
        paymentType: response.schedule_type,
        status: response.status,
    };
}

export function downloadPdf(
    response: Blob,
    meta: FetchBaseQueryMeta,
    defaultFileName: string,
) {
    const filename = meta.response?.headers
        .get('content-disposition')
        ?.split(';')
        .find(row => row.includes('filename='))
        ?.replace('filename=', '')
        .replace(/['"]/g, '')
        .trim();
    const hiddenElement = document.createElement('a');
    const url = window.URL || window.webkitURL;
    hiddenElement.href = url.createObjectURL(response);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename || defaultFileName;
    hiddenElement.click();
    return { data: null };
}

export function transformDownloadPdfInvoice(
    response: Blob,
    meta: FetchBaseQueryMeta,
): { data: null } {
    return downloadPdf(response, meta, 'Breef_Invoice.pdf');
}

export function transformDownloadPdfReceipt(
    response: Blob,
    meta: FetchBaseQueryMeta,
): { data: null } {
    return downloadPdf(response, meta, 'Breef_Receipt.pdf');
}

export const updateCardNumber = (cardNumber: string) => {
    return `•••• ${cardNumber}`;
};

export const updateBankAccount = (accountNumber: string, n?: number) => {
    if (n !== undefined) {
        const num = accountNumber.substring(accountNumber.length - n);
        return `•••• ${num}`;
    }
    return `•••• ${accountNumber}`;
};

export const prepareAddPayments = (
    values: AddPaymentsType & { isAlreadyExistsRetainers: boolean },
): AddPaymentsRequestType => {
    const preparedData = {} as AddPaymentsRequestType;
    if (values.paymentsMilestone.length !== 0) {
        preparedData.milestones = values.paymentsMilestone.map(item => ({
            deliverable: item.deliverable,
            invoice_date: moment(item.invoiceDate).format('YYYY-MM-DD'),
            amount: Number(item.amount),
            id: item.id || 0,
            payment_due: item.paymentDue,
            schedule_type: item.scheduleType,
            status: item.status,
        }));
    }
    if (values.paymentsRetainer) {
        if (values.isAlreadyExistsRetainers) {
            preparedData.retainer = {
                number_of_payments: Number(
                    values.paymentsRetainer.numberOfPayments,
                ),
            };
        } else {
            preparedData.retainer = {
                deliverable: values.paymentsRetainer.deliverable,
                invoice_date: moment(
                    values.paymentsRetainer.invoiceDate,
                ).format('YYYY-MM-DD'),
                amount: Number(values.paymentsRetainer.amount),
                payment_frequency: values.paymentsRetainer.paymentFrequency,
                number_of_payments: Number(
                    values.paymentsRetainer.numberOfPayments,
                ),
            };
        }
    }
    if (values.files.length !== 0) {
        preparedData.contracts = values.files.map(item => Number(item.id));
    }

    return preparedData;
};

const replaceTag = (tag: PaymentScheduleTagRequest) => {
    return tag.replace(/_/g, ' ');
};

export const transformPaymentTag = (
    tag: PaymentScheduleTagRequest,
): StatusTagType | null => {
    switch (tag) {
        case PaymentScheduleTagRequest.awaiting:
            return {
                title: replaceTag(tag),
                sentiment: 'neutral',
            };
        case PaymentScheduleTagRequest.invoiceSent:
            return {
                title: replaceTag(tag),
                sentiment: 'primary',
            };
        case PaymentScheduleTagRequest.paymentDue:
            return {
                title: replaceTag(tag),
                sentiment: 'primary',
            };
        case PaymentScheduleTagRequest.processing:
            return {
                title: replaceTag(tag),
                sentiment: 'informative',
            };
        case PaymentScheduleTagRequest.paid:
            return {
                title: replaceTag(tag),
                sentiment: 'positive',
            };
        case PaymentScheduleTagRequest.cancelled:
            return {
                title: replaceTag(tag),
                sentiment: 'attentive',
            };
        default:
            return null;
    }
};

export const transformCardBillingInfo = (
    card: CardMoreResponseType,
): TransformCardMoreResponseType => {
    return {
        token: card.id,
        last4: updateCardNumber(String(card.card_number)),
        brand: card.brand,
        type: PaymentStatusNames.CARD_EXIST,
        expiredDate: `${card.card_month}/${replaceCardYear(card.card_year)}`,
        billingDetails: {
            address: {
                country: card.billing_details.address.country,
                line1: card.billing_details.address.line1,
                line2: card.billing_details.address.line2 ?? null,
                postalCode: card.billing_details.address.postal_code,
                state: card.billing_details.address.state ?? null,
                city: card.billing_details.address.city ?? null,
            },
            name: card.billing_details.name,
        },
    };
};

export const prepareUpdateCardBillingInfo = (
    billingData: CreateTokenCardData,
) => {
    return {
        name: billingData.name,
        address: {
            country: billingData.address_country,
            line1: billingData.address_line1,
            line2: billingData.address_line2,
            postal_code: billingData.address_zip,
            state: billingData.address_state,
            city: billingData.address_city,
        },
    };
};
