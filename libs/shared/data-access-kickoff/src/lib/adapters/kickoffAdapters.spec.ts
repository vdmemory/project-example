import {
    KickoffAgencyBillingInfoRequestType,
    KickoffRequestType,
    KickoffResponseType,
} from '@breef/shared/types';
import {
    prepareSendKickoffAgencyData,
    prepareSendKickoffClientData,
    transformKickoffData,
    transformAgencyKickoffBillingInfo,
} from './kickoffAdapters';

const values: KickoffRequestType = {
    projectId: 1,
    mode: 'create',
    userType: 'client',
    legalName: 'Legal Name',
    billingAddress: 'Billing Address',
    billingAddressAdditional: 'Additional Info',
    paymentsMilestone: [
        {
            id: 1,
            paymentDue: '2023-07-01',
            scheduleType: 'monthly',
            status: 'pending',
            deliverable: 'Milestone 1',
            amount: 1000,
            invoiceDate: '2023-06-01',
        },
    ],
    paymentsRetainer: {
        id: 1,
        paymentFrequency: 'Monthly',
        deliverable: 'Retainer 1',
        amount: 500,
        invoiceDate: '2023-06-01',
        numberOfPayments: '12',
    },
    teamMembers: [
        { id: 1, email: 'email1@gmail.com' },
        { id: 2, email: 'email2@gmail.com' },
    ],
    teamInvites: [
        { id: 3, email: 'email3@gmail.com' },
        { id: 4, email: 'email4@gmail.com' },
    ],
    invites: [
        {
            email: 'invite1@example.com',
            checked: true,
            phoneNumber: '1234567890',
        },
    ],
    files: [{ id: 1, title: 'title file', link: 'http://link.com' }],
    paymentsType: 'one_time',
    paymentTerms: '30 days',
    isAcceptedTerms: true,
    status: 'draft',
};

describe('prepareSendKickoffAgencyData', () => {
    it('should prepare data correctly for agency kickoff with milestones and retainer', () => {
        const expectedOutput = {
            billing_details: {
                legal_name: 'Legal Name',
                billing_address: 'Billing Address',
                address_additional_info: 'Additional Info',
            },
            files: [1],
            kickoff_type: 'one_time',
            payment_terms: '30 days',
            team_members: [1, 2, 3, 4],
            invitations: [
                { email: 'invite1@example.com', phone_number: '1234567890' },
            ],
            agency_accepted_terms: true,
            status: 'draft',
            milestones: [
                {
                    deliverable: 'Milestone 1',
                    amount: 1000,
                    invoice_date: '2023-06-01',
                },
            ],
            retainer: {
                payment_frequency: 'Monthly',
                deliverable: 'Retainer 1',
                amount: 500,
                invoice_date: '2023-06-01',
                number_of_payments: 12,
            },
        };
        expect(prepareSendKickoffAgencyData(values)).toEqual(expectedOutput);
    });
});

describe('prepareSendKickoffClientData', () => {
    it('should prepare data correctly for client kickoff', () => {
        const expectedOutput = {
            billing_details: {
                legal_name: 'Legal Name',
                billing_address: 'Billing Address',
                address_additional_info: 'Additional Info',
            },
            team_members: [1, 2, 3, 4],
            invitations: [
                { email: 'invite1@example.com', phone_number: '1234567890' },
            ],
            status: 'draft',
            client_accepted_terms: true,
        };
        expect(prepareSendKickoffClientData(values)).toEqual(expectedOutput);
    });
});

describe('transformKickoffData', () => {
    it('should transform KickoffResponseType to KickoffMergedResponseType correctly', () => {
        const values: KickoffResponseType = {
            accepted_terms: true,
            kickoff_type: 'one_time',
            milestones: [
                {
                    deliverable: 'Milestone 1',
                    amount: 1000,
                    id: 1,
                    status: 'pending',
                    invoice_date: '2023-06-01',
                    payment_due: '2023-07-01',
                    schedule_type: 'monthly',
                },
            ],
            retainer: {
                amount: 500,
                deliverable: 'Retainer 1',
                invoice_date: '2023-06-01',
                payment_due: '2023-07-01',
                payment_frequency: 'Monthly',
                number_of_payments: 12,
                id: 1,
                schedule_type: 'retainer',
                status: 'pending',
            },
            payment_terms: '30 days',
            contracts: [
                {
                    id: 1,
                    name: 'Contract 1',
                    url: 'http://example.com/contract1',
                    thumbnail_url: 'http://example.com/thumbnail1',
                },
            ],
            kickoff_members: [
                {
                    id: 1,
                    email: 'member1@example.com',
                    first_name: 'Member',
                    last_name: 'One',
                    phone_number: '1234567890',
                },
                {
                    id: 2,
                    email: 'member2@example.com',
                    first_name: '',
                    last_name: '',
                },
            ],
            status: 'draft',
        };
        const expectedOutput = {
            isAcceptedTerms: true,
            paymentsType: 'one_time',
            paymentsMilestone: [
                {
                    deliverable: 'Milestone 1',
                    amount: 1000,
                    id: 1,
                    status: 'pending',
                    invoiceDate: '2023-06-01',
                    paymentDue: '2023-07-01',
                    scheduleType: 'monthly',
                },
            ],
            paymentsRetainer: {
                amount: 500,
                deliverable: 'Retainer 1',
                invoiceDate: '2023-06-01',
                paymentDue: '2023-07-01',
                paymentFrequency: 'Monthly',
                numberOfPayments: '12',
                id: 1,
                scheduleType: 'retainer',
            },
            paymentTerms: '30 days',
            files: [
                {
                    id: 1,
                    title: 'Contract 1',
                    link: 'http://example.com/contract1',
                    thumbnail: 'http://example.com/thumbnail1',
                },
            ],
            teamMembers: [
                {
                    id: 1,
                    email: 'member1@example.com',
                    firstName: 'Member',
                    lastName: 'One',
                    phoneNumber: '1234567890',
                },
            ],
            teamInvites: [
                {
                    id: 2,
                    email: 'member2@example.com',
                    firstName: '',
                    lastName: '',
                },
            ],
            invites: [],
            status: 'draft',
        };
        expect(transformKickoffData(values)).toEqual(expectedOutput);
    });
});

describe('transformAgencyKickoffBillingInfo', () => {
    it('should transform KickoffAgencyBillingInfoRequestType to KickoffAgencyBillingInfoType correctly', () => {
        const values: KickoffAgencyBillingInfoRequestType = {
            legal_name: 'Legal Name',
            billing_address: 'Billing Address',
            address_additional_info: 'Additional Info',
            team_members: [
                {
                    id: 1,
                    email: 'member1@example.com',
                    first_name: 'Member',
                    last_name: 'One',
                    phone_number: '1234567890',
                },
            ],
        };
        const expectedOutput = {
            legalName: 'Legal Name',
            billingAddress: 'Billing Address',
            billingAddressAdditional: 'Additional Info',
            teamMembers: [
                {
                    id: 1,
                    email: 'member1@example.com',
                    firstName: 'Member',
                    lastName: 'One',
                    phoneNumber: '1234567890',
                },
            ],
        };
        expect(transformAgencyKickoffBillingInfo(values)).toEqual(
            expectedOutput,
        );
    });
});
