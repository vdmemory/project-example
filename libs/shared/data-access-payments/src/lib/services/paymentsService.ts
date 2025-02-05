import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';

import {
    PostProjectRequestType,
    PaymentScheduleAgency,
    TransformCouponsResponseType,
    TransformCardsResponseType,
    PaymentRequestType,
    PaymentCardRequestType,
    TransformBanksResponseType,
    PaymentBankRequestType,
    StoredRetainerPaymentType,
    AddPaymentsType,
    TransformWireResponseType,
    PaymentsScheduleType,
    PaymentScheduleKickoff,
    TransformConnectSessionRequestType,
    PaymentInfo,
    TransformPaymentResponseType,
    PaymentAchDefaultBankRequestType,
    TransformCardMoreResponseType,
    CardMoreResponseType,
} from '@breef/shared/types';

import {
    getPayments,
    POST_PROJECT_PATH,
    CARDS_PATH,
    getCard,
    setPayPayment,
    BANKS_PATH,
    WIRE_PAYMENT_PATH,
    setWirePayment,
    getPaymentsRetainer,
    addPayments,
    getInvoice,
    getPaymentsKickoff,
    updatePayment,
    FINANCIAL_CONNECTIONS_SESSION_PATH,
    removeFCAccount,
    getPaymentInfo,
    SET_DEFAULT_PATH,
    getCardBillingDetails,
    COUPONS_PREFILL_PATH,
    COUPONS_VALIDATE_PATH,
    getReceipt,
} from '../constants/endpoints';
import {
    prepareAddPayments,
    prepareBanksData,
    preparePaymentCardData,
    preparePostProjectData,
    transformFCAccount,
    transformBanksData,
    transformConnectSession,
    transformDownloadPdfInvoice,
    transformDownloadPdfReceipt,
    transformPayment,
    transformPaymentCards,
    transformPaymentCoupons,
    transformPaymentRetainer,
    transformPaymentsSchedule,
    transformPaymentsScheduleKickoff,
    transformWireData,
    transformPaymentInfo,
    preparePayment,
    prepareSetDefaultBank,
    transformCardBillingInfo,
    prepareUpdateCardBillingInfo,
    transformPaymentCouponsValidate,
} from '../adapters/paymentsAdapters';
import moment from 'moment';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';

export const apiPayments = createApi({
    reducerPath: 'paymentsService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: [
        'paymentsService',
        'Coupons',
        'paymentSchedule',
        'paymentScheduleKickoff',
        'Cards',
        'Banks',
        'ExistRetainer',
    ],
    endpoints: builder => ({
        getCouponsData: builder.query<
            TransformCouponsResponseType | null,
            void
        >({
            query: () => COUPONS_PREFILL_PATH,
            providesTags: ['Coupons'],
            transformResponse: transformPaymentCoupons,
        }),
        validateCoupons: builder.mutation<
            TransformCouponsResponseType | null,
            string
        >({
            query: code => ({
                url: COUPONS_VALIDATE_PATH,
                method: 'POST',
                body: {
                    promo_code: code,
                },
            }),
            transformResponse: transformPaymentCouponsValidate,
        }),
        postProject: builder.mutation<
            TransformPaymentResponseType,
            PostProjectRequestType
        >({
            query: body => ({
                url: POST_PROJECT_PATH,
                method: 'POST',
                body: preparePostProjectData(body),
            }),
            transformResponse: transformPayment,
        }),
        getCards: builder.query<TransformCardsResponseType[], void>({
            query: () => CARDS_PATH,
            providesTags: ['Cards'],
            transformResponse: transformPaymentCards,
        }),
        setCards: builder.mutation<{ pm: string }, PaymentCardRequestType>({
            query: body => ({
                url: CARDS_PATH,
                method: 'POST',
                body: preparePaymentCardData(body),
            }),
            invalidatesTags: ['Cards'],
        }),
        deleteCards: builder.mutation<unknown, string>({
            query: id => ({
                url: getCard(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['Cards'],
        }),
        getBanks: builder.query<TransformBanksResponseType[], void>({
            query: () => BANKS_PATH,
            providesTags: ['Banks'],
            transformResponse: transformBanksData,
        }),
        setBank: builder.mutation<
            TransformBanksResponseType,
            PaymentBankRequestType
        >({
            query: body => ({
                url: BANKS_PATH,
                method: 'POST',
                body: prepareBanksData(body),
            }),
            transformResponse: transformFCAccount,
            invalidatesTags: ['Banks'],
        }),
        deleteFCAccount: builder.mutation<unknown, string>({
            query: id => ({
                url: removeFCAccount(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['Banks'],
        }),
        getFCSessionSecret: builder.query<
            TransformConnectSessionRequestType,
            void
        >({
            query: () => FINANCIAL_CONNECTIONS_SESSION_PATH,
            transformResponse: transformConnectSession,
        }),
        getWirePayment: builder.query<TransformWireResponseType, void>({
            query: () => WIRE_PAYMENT_PATH,
            transformResponse: transformWireData,
        }),
        setWirePaymentPay: builder.mutation<
            unknown,
            { paymentId: number; fileId?: number }
        >({
            query: param => ({
                url: setWirePayment(param.paymentId),
                method: 'POST',
                ...(param.paymentId && {
                    body: {
                        file_id: param.fileId,
                    },
                }),
            }),
        }),
        setDefaultBank: builder.mutation<
            unknown,
            PaymentAchDefaultBankRequestType
        >({
            query: body => ({
                url: SET_DEFAULT_PATH,
                method: 'POST',
                body: prepareSetDefaultBank(body),
            }),
            invalidatesTags: result => (result ? ['Banks'] : []),
        }),
        setPayPayment: builder.mutation<
            TransformPaymentResponseType,
            PaymentRequestType
        >({
            query: body => ({
                url: setPayPayment(body.paymentId),
                method: 'POST',
                body: preparePayment(body),
            }),
            transformResponse: transformPayment,
        }),
        getPaymentsKickoff: builder.query<
            PaymentScheduleKickoff,
            { projectId: number | string }
        >({
            query: ({ projectId }) => getPaymentsKickoff(projectId),
            providesTags: ['paymentScheduleKickoff'],
            transformResponse: transformPaymentsScheduleKickoff,
        }),
        getPaymentsSchedule: builder.query<
            PaymentsScheduleType,
            { projectId: number | string }
        >({
            query: ({ projectId }) => getPayments(projectId),
            providesTags: ['paymentSchedule'],
            transformResponse: transformPaymentsSchedule,
        }),
        getPaymentsRetainer: builder.query<
            StoredRetainerPaymentType,
            { projectId: number | string }
        >({
            query: ({ projectId }) => getPaymentsRetainer(projectId),
            transformResponse: transformPaymentRetainer,
            providesTags: ['ExistRetainer'],
        }),
        addPayments: builder.mutation<
            PaymentScheduleAgency[],
            AddPaymentsType & {
                projectId: number | string;
                isAlreadyExistsRetainers: boolean;
            }
        >({
            query: body => ({
                url: addPayments(body.projectId),
                method: 'POST',
                body: prepareAddPayments(body),
            }),
            invalidatesTags: result =>
                result
                    ? [
                          'paymentSchedule',
                          'ExistRetainer',
                          'paymentScheduleKickoff',
                      ]
                    : [],
        }),
        getPaymentInfo: builder.query<
            PaymentInfo,
            { paymentId: number | string }
        >({
            query: ({ paymentId }) => getPaymentInfo(paymentId),
            transformResponse: transformPaymentInfo,
        }),
        updatePayment: builder.mutation<
            PaymentScheduleAgency[],
            { paymentId: number; invoiceDate: string; deliverable?: string }
        >({
            query: ({ paymentId, invoiceDate, deliverable }) => ({
                url: updatePayment(paymentId),
                method: 'PATCH',
                body: {
                    invoice_date: moment(invoiceDate).format('YYYY-MM-DD'), //getUtcDateString(invoiceDate)
                    deliverable,
                },
            }),
            invalidatesTags: result =>
                result ? ['paymentSchedule', 'paymentScheduleKickoff'] : [],
        }),
        downloadInvoiceDocument: builder.query<
            { data: null },
            { paymentId: number }
        >({
            query: ({ paymentId }) => ({
                url: getInvoice(paymentId),
                method: 'GET',
                responseHandler: response => response.blob(),
            }),
            transformResponse: transformDownloadPdfInvoice,
        }),
        downloadReceiptDocument: builder.query<
            { data: null },
            { paymentId: number }
        >({
            query: ({ paymentId }) => ({
                url: getReceipt(paymentId),
                method: 'GET',
                responseHandler: response => response.blob(),
            }),
            transformResponse: transformDownloadPdfReceipt,
        }),
        getCardBillingDetails: builder.query<
            TransformCardMoreResponseType,
            { cardToken: string }
        >({
            query: ({ cardToken }) => getCardBillingDetails(cardToken),
            transformResponse: transformCardBillingInfo,
        }),
        updateCardBillingDetails: builder.mutation<
            CardMoreResponseType,
            { cardToken: string; options: CreateTokenCardData }
        >({
            query: ({ cardToken, options }) => ({
                url: getCardBillingDetails(cardToken),
                method: 'PATCH',
                body: prepareUpdateCardBillingInfo(options),
            }),
        }),
    }),
});

export const {
    useGetCouponsDataQuery,
    useValidateCouponsMutation,
    useGetPaymentsScheduleQuery,
    useGetPaymentsRetainerQuery,
    useGetPaymentsKickoffQuery,
    useUpdatePaymentMutation,
    usePostProjectMutation,
    useGetCardsQuery,
    useLazyGetCardsQuery,
    useSetCardsMutation,
    useGetBanksQuery,
    useLazyGetBanksQuery,
    useSetBankMutation,
    useSetPayPaymentMutation,
    useSetDefaultBankMutation,
    useGetWirePaymentQuery,
    useSetWirePaymentPayMutation,
    useAddPaymentsMutation,
    useDeleteCardsMutation,
    useLazyDownloadInvoiceDocumentQuery,
    useLazyDownloadReceiptDocumentQuery,
    useLazyGetFCSessionSecretQuery,
    useDeleteFCAccountMutation,
    useGetPaymentInfoQuery,
    useGetCardBillingDetailsQuery,
    useUpdateCardBillingDetailsMutation,
} = apiPayments;
