/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    prepareAddPayments,
    prepareBanksData,
    preparePayment,
    preparePaymentCardData,
    preparePostProjectData,
    transformBanksData,
    transformConnectSession,
    transformFCAccount,
    transformPayment,
    transformPaymentCards,
    transformPaymentCoupons,
    transformPaymentCouponsValidate,
    transformPaymentRetainer,
    transformPaymentsSchedule,
    transformPaymentsScheduleKickoff,
    transformWireData,
    prepareUpdateCardBillingInfo,
    transformCardBillingInfo,
    transformPaymentTag,
    updateBankAccount,
    transformPaymentInfo,
} from './paymentsAdapters';
import {
    CouponsResponseType,
    CouponsValidateResponseType,
    CardsResponseType,
    WireResponseType,
    TransformConnectSessionRequestType,
    TransformConnectSessionResponseType,
    PaymentBankRequestType,
    TransformPaymentBankRequestType,
    BankFinancialConnectionType,
    TransformBanksResponseType,
    BanksResponseType,
    PaymentCardRequestType,
    TransformPaymentCardRequestType,
    PostProjectRequestType,
    TransformPostProjectRequestType,
    AddPaymentsType,
    PaymentsScheduleRequestType,
    PaymentScheduleKickoffRequest,
    RetainerPaymentRequestType,
    PaymentRequestType,
    TransformPaymentRequestType,
    StatusTagType,
    PaymentInfoRequest,
    PaymentInfo,
} from '@breef/shared/types';
import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';
import {
    PaymentScheduleTagRequest,
    PaymentStatusNames,
} from '@breef/shared/constants';
import {
    CardMoreResponseType,
    TransformCardMoreResponseType,
} from '@breef/shared/types';

describe('functions adapter', () => {
    describe('transformPaymentCoupons', () => {
        it('should transform coupon data correctly', () => {
            const response: CouponsResponseType = {
                prefill_coupon: {
                    id: 1,
                    name: 'Discount',
                    promo_code: 'DISCOUNT10',
                    amount_off: 1000,
                    percent_off: 10,
                    coupon_type: 'percentage',
                    description: '10% off',
                },
            };

            const expected = {
                id: 1,
                name: 'Discount',
                promoCode: 'DISCOUNT10',
                amountOff: 1000,
                percentOff: 10,
                couponType: 'percentage',
                description: '10% off',
            };

            expect(transformPaymentCoupons(response)).toEqual(expected);
        });

        it('should return null if no coupon is present', () => {
            const response: CouponsResponseType = { prefill_coupon: null };
            expect(transformPaymentCoupons(response)).toBeNull();
        });
    });

    describe('transformPaymentCouponsValidate', () => {
        it('should transform validated coupon data correctly', () => {
            const coupon: CouponsValidateResponseType = {
                id: 1,
                name: 'Discount',
                promo_code: 'DISCOUNT10',
                amount_off: 1000,
                percent_off: 10,
                coupon_type: 'fixed_amount',
                description: '10% off',
            };

            const expected = {
                id: 1,
                name: 'Discount',
                promoCode: 'DISCOUNT10',
                amountOff: 1000,
                percentOff: 10,
                couponType: 'fixed_amount',
                description: '10% off',
            };

            expect(transformPaymentCouponsValidate(coupon)).toEqual(expected);
        });

        it('should return null if no coupon is provided', () => {
            //@ts-ignore
            expect(transformPaymentCouponsValidate(null)).toBeNull();
        });
    });

    describe('transformPaymentCards', () => {
        it('should transform payment cards correctly', () => {
            const response: CardsResponseType = [
                {
                    id: 'card_1',
                    billing_details: {
                        name: 'John Doe',
                        address: {
                            country: 'US',
                            line1: '123 Main St',
                            city: 'Los Angeles',
                        },
                    },
                    card_number: '4242',
                    brand: 'Visa',
                    card_month: 12,
                    card_year: 2025,
                },
            ];

            const expected = [
                {
                    id: 'card_1',
                    institutionName: 'John Doe',
                    last4: '•••• 4242',
                    brand: 'Visa',
                    token: 'card_1',
                    type: 'payment_method',
                    expiredDate: '12/25',
                    address: {
                        country: 'US',
                        line1: '123 Main St',
                        city: 'Los Angeles',
                    },
                },
            ];

            expect(transformPaymentCards(response)).toEqual(expected);
        });
    });

    describe('transformWireData', () => {
        it('should transform wire data correctly', () => {
            const response: WireResponseType = {
                bank_name: 'Bank of Test',
                account: '12345678',
                routing: '87654321',
                swift_code: 'BOFAUS3N',
            };

            const expected = {
                bankAccount: {
                    bankName: 'Bank of Test',
                    accountNumber: '12345678',
                    routingNumber: '87654321',
                },
                code: 'BOFAUS3N',
            };

            expect(transformWireData(response)).toEqual(expected);
        });
    });

    describe('transformConnectSession', () => {
        it('should transform connect session correctly', () => {
            const response: TransformConnectSessionResponseType = {
                customer: 'cus_123',
                fc_session_secret: 'secret_456',
            };

            const expected: TransformConnectSessionRequestType = {
                customer: 'cus_123',
                FCSessionSecret: 'secret_456',
            };

            expect(transformConnectSession(response)).toEqual(expected);
        });
    });

    describe('prepareBanksData', () => {
        it('should prepare banks data correctly', () => {
            const request: PaymentBankRequestType = {
                accounts: [
                    {
                        FCAToken: 'token_1',
                        last4: '1234',
                        displayName: 'Test Account',
                        institutionName: 'Test Bank',
                    },
                ],
            };

            const expected: TransformPaymentBankRequestType[] = [
                {
                    token: 'token_1',
                    last4: '1234',
                    display_name: 'Test Account',
                    institution_name: 'Test Bank',
                },
            ];

            expect(prepareBanksData(request)).toEqual(expected);
        });
    });

    describe('transformFCAccount', () => {
        it('should transform FC account correctly', () => {
            const bank: BankFinancialConnectionType = {
                id: 1,
                token: 'token_1',
                last4: '1234',
                display_name: 'Test Account',
                institution_name: 'Test Bank',
                bank_account_type: 'financial_connection',
            };

            const expected: TransformBanksResponseType = {
                id: 1,
                token: 'token_1',
                last4: '•••• 1234',
                displayName: 'Test Account',
                institutionName: 'Test Bank',
                type: 'financial_connection',
                brand: 'Test Bank',
            };

            expect(transformFCAccount(bank)).toEqual(expected);
        });
    });

    describe('transformBanksData', () => {
        it('should transform banks data correctly', () => {
            const banks: BanksResponseType = [
                {
                    id: 1,
                    token: 'token_1',
                    last4: '1234',
                    display_name: 'Test Account',
                    institution_name: 'Test Bank',
                    bank_account_type: 'savings',
                    default: true,
                },
            ];

            const expected: TransformBanksResponseType[] = [
                {
                    id: 1,
                    token: 'token_1',
                    last4: '•••• 1234',
                    displayName: 'Test Account',
                    institutionName: 'Test Bank',
                    type: 'savings',
                    brand: 'Test Bank',
                    default: true,
                },
            ];

            expect(transformBanksData(banks)).toEqual(expected);
        });
    });

    describe('preparePaymentCardData', () => {
        it('should prepare payment card data correctly', () => {
            const request: PaymentCardRequestType = {
                token: 'token_1',
                projectId: 1,
                cardHolder: 'John Doe',
            };

            const expected: TransformPaymentCardRequestType = {
                token: 'token_1',
                project: 1,
                cardholder_name: 'John Doe',
            };

            expect(preparePaymentCardData(request)).toEqual(expected);
        });
    });

    describe('preparePostProjectData', () => {
        it('should prepare post project data correctly', () => {
            const request: PostProjectRequestType = {
                token: 'token_1',
                projectId: 1,
                paymentStatus: 'paid',
                code: 'DISCOUNT10',
                acceptedTerms: true,
            };

            const expected: TransformPostProjectRequestType = {
                token: 'token_1',
                project: 1,
                token_type: 'paid',
                promo_code: 'DISCOUNT10',
                accepted_terms: true,
            };

            expect(preparePostProjectData(request)).toEqual(expected);
        });
    });

    describe('prepareAddPayments', () => {
        it('should prepare add payments response to expected format', () => {
            const addPaymentsData = {
                paymentsMilestone: [
                    {
                        deliverable: 'deliverable',
                        invoiceDate: '2023-03-04',
                        amount: 1212,
                        id: 1,
                        paymentDue: '2024-01-11',
                        scheduleType: 'ongoing',
                        status: 'awaiting',
                    },
                ],
                paymentsRetainer: null,
                files: [
                    {
                        id: 1,
                        title: 'title',
                        link: 'link.com',
                    },
                ],
                isAlreadyExistsRetainers: true,
            };

            const expectedOutput = {
                milestones: [
                    {
                        deliverable: 'deliverable',
                        invoice_date: '2023-03-04',
                        amount: 1212,
                        id: 1,
                        payment_due: '2024-01-11',
                        schedule_type: 'ongoing',
                        status: 'awaiting',
                    },
                ],
                contracts: [1],
            };
            const result = prepareAddPayments(addPaymentsData);

            expect(result).toEqual(expectedOutput);
        });
        it('should prepare add payments response to expected format with retainer', () => {
            const addPaymentsData = {
                paymentsMilestone: [
                    {
                        deliverable: 'deliverable',
                        invoiceDate: '2023-03-04',
                        amount: 1212,
                        id: 1,
                        paymentDue: '2024-01-11',
                        scheduleType: 'ongoing',
                        status: 'awaiting',
                    },
                ],
                files: [],
                paymentsRetainer: {
                    id: 33,
                    amount: 1000,
                    deliverable: 'deliverable-retainer',
                    invoiceDate: '2023-03-04',
                    paymentDue: '2023-03-04',
                    invoiceFirstDate: '2023-03-04',
                    paymentFrequency: 'monthly',
                    numberOfPayments: 11 + '',
                    scheduleType: 'retainer',
                },
                isAlreadyExistsRetainers: false,
            } as AddPaymentsType & { isAlreadyExistsRetainers: boolean };

            const expectedOutput = {
                milestones: [
                    {
                        deliverable: 'deliverable',
                        invoice_date: '2023-03-04',
                        amount: 1212,
                        id: 1,
                        payment_due: '2024-01-11',
                        schedule_type: 'ongoing',
                        status: 'awaiting',
                    },
                ],
                retainer: {
                    deliverable: 'deliverable-retainer',
                    invoice_date: '2023-03-04',
                    amount: 1000,
                    payment_frequency: 'monthly',
                    number_of_payments: 11,
                },
            };
            const result = prepareAddPayments(addPaymentsData);
            expect(result).toEqual(expectedOutput);
        });
    });

    describe('transformPayment', () => {
        it('should transform payment data response to expected format', () => {
            const paymentData = {
                amount: '100',
                transaction: 'pi_transaction-123',
                pm_data: {
                    last4: '1234',
                    institution_name: 'pumb',
                    display_name: 'holder name',
                },
            };

            const expectedOutput = {
                amount: '100',
                transaction: 'transaction-123',
                name: 'pumb',
                last4: '1234',
            };
            const result = transformPayment(paymentData);
            expect(result).toEqual(expectedOutput);
        });
    });
    describe('transformPaymentsSchedule', () => {
        it('should transform payments schedule data response to expected format', () => {
            const paymentsScheduleData = {
                payments: [
                    {
                        id: 123,
                        deliverable: 'deliverable',
                        amount: '32423.00',
                        team_take: '27559.55',
                        invoice_date: '2023-03-04',
                        schedule_type: 'ongoing',
                        payment_due: '2023-03-11',
                        status: 'awaiting',
                        payment_frequency: 'monthly',
                        number_of_payments: 2,
                    },
                ],
                payment_frequency: 'monthly',
            } as PaymentsScheduleRequestType;

            const expectedOutput = {
                payments: [
                    {
                        amount: '32423.00',
                        deliverable: 'deliverable',
                        invoiceDate: '2023-03-04',
                        paymentDue: '2023-03-11',
                        scheduleType: 'ongoing',
                        status: 'awaiting',
                        teamTake: '27559.55',
                        id: 123,
                        numberOfPayments: 2,
                    },
                ],
                paymentFrequency: 'monthly',
            };
            const result = transformPaymentsSchedule(paymentsScheduleData);
            expect(result).toEqual(expectedOutput);

            const paymentsScheduleData2 = {
                payments: paymentsScheduleData.payments,
                payment_frequency: 'monthly',
                payment_terms: '7_days',
            } as PaymentsScheduleRequestType;

            const expectedOutput2 = {
                payments: [
                    {
                        amount: '32423.00',
                        deliverable: 'deliverable',
                        invoiceDate: '2023-03-04',
                        paymentDue: '2023-03-11',
                        scheduleType: 'ongoing',
                        status: 'awaiting',
                        teamTake: '27559.55',
                        id: 123,
                        numberOfPayments: 2,
                        invoiceCode: undefined,
                        tag: undefined,
                    },
                ],
                paymentFrequency: 'monthly',
                paymentTerms: 7,
            };

            const result2 = transformPaymentsSchedule(paymentsScheduleData2);
            expect(result2).toEqual(expectedOutput2);
        });
    });
    describe('transformPaymentsScheduleKickoff', () => {
        it('should transform payments schedule kickoff response to expected format', () => {
            const paymentsScheduleKickoffData = {
                one_time_payments: [
                    {
                        amount: '4343.00',
                        deliverable: 'zzzzzzz',
                        id: 1974,
                        invoice_date: '2023-03-03',
                        payment_due: '2023-03-10',
                        schedule_type: 'milestone',
                        status: 'awaiting',
                        team_take: '3691.55',
                        payment_frequency: 'monthly',
                    },
                ],
                ongoing_payment: {
                    amount: '1212.00',
                    deliverable: 'deliverable',
                    id: 2005,
                    invoice_date: '2024-01-04',
                    number_of_payments: 2,
                    payment_due: '2024-01-11',
                    payment_frequency: 'monthly',
                    payment_terms: '7_days',
                    schedule_type: 'ongoing',
                    status: 'awaiting',
                    team_take: '1030.20',
                },
            } as PaymentScheduleKickoffRequest;

            const expectedOutput = {
                oneTimePayments: [
                    {
                        id: 1974,
                        deliverable: 'zzzzzzz',
                        amount: '4343.00',
                        teamTake: '3691.55',
                        invoiceDate: '2023-03-03',
                        scheduleType: 'milestone',
                        paymentDue: '2023-03-10',
                        status: 'awaiting',
                        paymentFrequency: 'monthly',
                    },
                ],
                ongoingPayment: {
                    id: 2005,
                    deliverable: 'deliverable',
                    amount: '1212.00',
                    teamTake: '1030.20',
                    invoiceDate: '2024-01-04',
                    scheduleType: 'ongoing',
                    paymentDue: '2024-01-11',
                    status: 'awaiting',
                    paymentFrequency: 'monthly',
                    numberOfPayments: 2,
                    paymentTerms: '7_days',
                },
            };
            const result = transformPaymentsScheduleKickoff(
                paymentsScheduleKickoffData,
            );
            expect(result).toEqual(expectedOutput);
        });
    });

    describe('transformPaymentRetainer', () => {
        it('should transform payment retainer response to expected format', () => {
            const paymentRetainer = {
                amount: 1212,
                deliverable: 'ddscsd',
                id: 26,
                invoice_date: '2023-03-04',
                number_of_payments: 11,
                payment_due: '2023-03-11',
                payment_frequency: 'monthly',
                schedule_type: 'ongoing',
                status: 'awaiting',
            } as RetainerPaymentRequestType;

            const expectedOutput = {
                deliverable: 'ddscsd',
                invoiceDate: '2023-03-04',
                amount: 1212,
                paymentFrequency: 'monthly',
                numberOfPayments: 11 + '',
                scheduleType: 'ongoing',
                id: 26,
            };
            const result = transformPaymentRetainer(paymentRetainer);
            expect(result).toEqual(expectedOutput);
        });

        it('should transform payment retainer response to expected format without invoice_date', () => {
            const paymentRetainer = {
                amount: 1212,
                deliverable: 'ddscsd',
                id: 26,
                invoice_date: '',
                number_of_payments: 11,
                payment_due: '2023-03-11',
                payment_frequency: 'monthly',
                schedule_type: 'ongoing',
            } as RetainerPaymentRequestType;
            const result = transformPaymentRetainer(paymentRetainer);
            expect(result).toEqual(null);
        });
    });
});

describe('preparePayment', () => {
    it('should transform payment request data correctly', () => {
        const request: PaymentRequestType = {
            paymentId: 1,
            token: 'token_123',
            paymentStatus: 'paid',
        };

        const expected: TransformPaymentRequestType = {
            token: 'token_123',
            token_type: 'paid',
        };

        expect(preparePayment(request)).toEqual(expected);
    });

    it('should handle different payment statuses correctly', () => {
        const request: PaymentRequestType = {
            paymentId: 1,
            token: 'token_456',
            paymentStatus: 'pending',
        };

        const expected: TransformPaymentRequestType = {
            token: 'token_456',
            token_type: 'pending',
        };

        expect(preparePayment(request)).toEqual(expected);
    });

    it('should handle empty token correctly', () => {
        const request: PaymentRequestType = {
            paymentId: 1,
            token: '',
            paymentStatus: 'failed',
        };

        const expected: TransformPaymentRequestType = {
            token: '',
            token_type: 'failed',
        };

        expect(preparePayment(request)).toEqual(expected);
    });

    it('should handle empty payment status correctly', () => {
        const request: PaymentRequestType = {
            paymentId: 1,
            token: 'token_789',
            paymentStatus: '',
        };

        const expected: TransformPaymentRequestType = {
            token: 'token_789',
            token_type: '',
        };

        expect(preparePayment(request)).toEqual(expected);
    });
});

describe('prepareUpdateCardBillingInfo', () => {
    it('should transform billing data correctly', () => {
        const billingData: CreateTokenCardData = {
            name: 'John Doe',
            address_country: 'US',
            address_line1: '123 Main St',
            address_line2: 'Apt 4B',
            address_zip: '12345',
            address_state: 'NY',
            address_city: 'New York',
        };

        const expected = {
            name: 'John Doe',
            address: {
                country: 'US',
                line1: '123 Main St',
                line2: 'Apt 4B',
                postal_code: '12345',
                state: 'NY',
                city: 'New York',
            },
        };

        expect(prepareUpdateCardBillingInfo(billingData)).toEqual(expected);
    });

    it('should handle missing optional fields correctly', () => {
        const billingData: CreateTokenCardData = {
            name: 'Jane Smith',
            address_country: 'CA',
            address_line1: '456 Elm St',
            address_line2: undefined,
            address_zip: '54321',
            address_state: 'ON',
            address_city: 'Toronto',
        };

        const expected = {
            name: 'Jane Smith',
            address: {
                country: 'CA',
                line1: '456 Elm St',
                line2: undefined,
                postal_code: '54321',
                state: 'ON',
                city: 'Toronto',
            },
        };

        expect(prepareUpdateCardBillingInfo(billingData)).toEqual(expected);
    });

    it('should handle empty strings correctly', () => {
        const billingData: CreateTokenCardData = {
            name: '',
            address_country: '',
            address_line1: '',
            address_line2: '',
            address_zip: '',
            address_state: '',
            address_city: '',
        };

        const expected = {
            name: '',
            address: {
                country: '',
                line1: '',
                line2: '',
                postal_code: '',
                state: '',
                city: '',
            },
        };

        expect(prepareUpdateCardBillingInfo(billingData)).toEqual(expected);
    });
});

describe('transformCardBillingInfo', () => {
    it('should transform card billing info correctly', () => {
        const card: CardMoreResponseType = {
            id: 'card_123',
            card_number: 4242,
            brand: 'Visa',
            card_month: 12,
            card_year: 2025,
            billing_details: {
                name: 'John Doe',
                address: {
                    country: 'US',
                    line1: '123 Main St',
                    line2: 'Apt 4B',
                    postal_code: '12345',
                    state: 'NY',
                    city: 'New York',
                },
            },
        };

        const expected: TransformCardMoreResponseType = {
            token: 'card_123',
            last4: '•••• 4242',
            brand: 'Visa',
            type: PaymentStatusNames.CARD_EXIST,
            expiredDate: '12/25',
            billingDetails: {
                address: {
                    country: 'US',
                    line1: '123 Main St',
                    line2: 'Apt 4B',
                    postalCode: '12345',
                    state: 'NY',
                    city: 'New York',
                },
                name: 'John Doe',
            },
        };

        expect(transformCardBillingInfo(card)).toEqual(expected);
    });

    it('should handle missing optional address fields correctly', () => {
        const card: CardMoreResponseType = {
            id: 'card_123',
            card_number: 4242,
            brand: 'Visa',
            card_month: 12,
            card_year: 2025,
            billing_details: {
                name: 'Jane Smith',
                address: {
                    country: 'CA',
                    line1: '456 Elm St',
                    line2: null,
                    postal_code: '54321',
                    state: null,
                    city: 'Toronto',
                },
            },
        };

        const expected: TransformCardMoreResponseType = {
            token: 'card_123',
            last4: '•••• 4242',
            brand: 'Visa',
            type: PaymentStatusNames.CARD_EXIST,
            expiredDate: '12/25',
            billingDetails: {
                address: {
                    country: 'CA',
                    line1: '456 Elm St',
                    line2: null,
                    postalCode: '54321',
                    state: null,
                    city: 'Toronto',
                },
                name: 'Jane Smith',
            },
        };

        expect(transformCardBillingInfo(card)).toEqual(expected);
    });

    it('should handle empty card number and year correctly', () => {
        const card: CardMoreResponseType = {
            id: 'card_123',
            card_number: 0,
            brand: 'Visa',
            card_month: 12,
            card_year: 0,
            billing_details: {
                name: '',
                address: {
                    country: '',
                    line1: '',
                    line2: '',
                    postal_code: '',
                    state: '',
                    city: '',
                },
            },
        };

        const expected: TransformCardMoreResponseType = {
            token: 'card_123',
            last4: '•••• 0',
            brand: 'Visa',
            type: PaymentStatusNames.CARD_EXIST,
            expiredDate: '12/0',
            billingDetails: {
                address: {
                    country: '',
                    line1: '',
                    line2: '',
                    postalCode: '',
                    state: '',
                    city: '',
                },
                name: '',
            },
        };

        expect(transformCardBillingInfo(card)).toEqual(expected);
    });
});

describe('transformPaymentTag', () => {
    it('should transform awaiting tag correctly', () => {
        const tag = PaymentScheduleTagRequest.awaiting;
        const expected: StatusTagType = {
            title: 'awaiting',
            sentiment: 'neutral',
        };
        expect(transformPaymentTag(tag)).toEqual(expected);
    });

    it('should transform invoiceSent tag correctly', () => {
        const tag = PaymentScheduleTagRequest.invoiceSent;
        const expected: StatusTagType = {
            title: 'invoice sent',
            sentiment: 'primary',
        };
        expect(transformPaymentTag(tag)).toEqual(expected);
    });

    it('should transform paymentDue tag correctly', () => {
        const tag = PaymentScheduleTagRequest.paymentDue;
        const expected: StatusTagType = {
            title: 'payment due',
            sentiment: 'primary',
        };
        expect(transformPaymentTag(tag)).toEqual(expected);
    });

    it('should transform processing tag correctly', () => {
        const tag = PaymentScheduleTagRequest.processing;
        const expected: StatusTagType = {
            title: 'processing',
            sentiment: 'informative',
        };
        expect(transformPaymentTag(tag)).toEqual(expected);
    });

    it('should transform paid tag correctly', () => {
        const tag = PaymentScheduleTagRequest.paid;
        const expected: StatusTagType = {
            title: 'paid',
            sentiment: 'positive',
        };
        expect(transformPaymentTag(tag)).toEqual(expected);
    });

    it('should transform cancelled tag correctly', () => {
        const tag = PaymentScheduleTagRequest.cancelled;
        const expected: StatusTagType = {
            title: 'cancelled',
            sentiment: 'attentive',
        };
        expect(transformPaymentTag(tag)).toEqual(expected);
    });

    it('should return null for an unknown tag', () => {
        const tag = 'unknownTag' as PaymentScheduleTagRequest;
        expect(transformPaymentTag(tag)).toBeNull();
    });
});

describe('updateBankAccount', () => {
    it('should mask entire account number if n is not provided', () => {
        const accountNumber = '123456789';
        const expected = '•••• 123456789';
        expect(updateBankAccount(accountNumber)).toBe(expected);
    });

    it('should mask all but the last n digits if n is provided', () => {
        const accountNumber = '123456789';
        const n = 4;
        const expected = '•••• 6789';
        expect(updateBankAccount(accountNumber, n)).toBe(expected);
    });

    it('should mask all but the last n digits if n is provided and n is greater than the length of account number', () => {
        const accountNumber = '1234';
        const n = 6;
        const expected = '•••• 1234';
        expect(updateBankAccount(accountNumber, n)).toBe(expected);
    });

    it('should return "•••• " if account number is empty', () => {
        const accountNumber = '';
        const expected = '•••• ';
        expect(updateBankAccount(accountNumber)).toBe(expected);
    });
});

describe('transformPaymentInfo', () => {
    it('should transform the PaymentInfoRequest correctly', () => {
        const response: PaymentInfoRequest = {
            id: '123',
            project_name: 'Project Name',
            invoice_code: 'INV123',
            payment_due: '2024-06-30',
            invoice_date: '2024-06-01',
            agency_company_name: 'Agency Name',
            agency_logo_url: 'http://example.com/logo.png',
            amount: '1000.00',
            deliverable: 'Deliverable Description',
            tag: PaymentScheduleTagRequest.awaiting,
            schedule_type: 'one_time',
            status: 'paid',
            team_take: '800.00',
        };

        const expected: PaymentInfo = {
            id: '123',
            projectName: 'Project Name',
            invoiceCode: 'INV123',
            dueDate: '2024-06-30',
            invoiceDate: '2024-06-01',
            agencyName: 'Agency Name',
            agencyLogo: 'http://example.com/logo.png',
            amount: 1000,
            total: 1000,
            deliverable: 'Deliverable Description',
            tag: {
                title: 'awaiting',
                sentiment: 'neutral',
            },
            paymentType: 'one_time',
            status: 'paid',
        };

        expect(transformPaymentInfo(response)).toEqual(expected);
    });
});
