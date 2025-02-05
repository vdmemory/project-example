import {
    KickoffAgencyBillingInfoRequestType,
    KickoffAgencyBillingInfoType,
    KickoffMergedResponseType,
    KickoffRequestType,
    KickoffResponseType,
} from '@breef/shared/types';
import moment from 'moment';

type NotRequiredKickoffParamsType = {
    milestones?: {
        deliverable: string;
        amount: number;
        invoice_date: string;
    }[];
    retainer?: {
        payment_frequency: string;
        deliverable: string;
        amount: number;
        invoice_date: string;
        number_of_payments: number;
    };
    agency_accepted_terms?: boolean;
    client_accepted_terms?: boolean;
};

const getInvitations = (invites: KickoffRequestType['invites']) => {
    return invites
        .filter(f => f.checked)
        .map(m => {
            if (m.phoneNumber) {
                return { email: m.email, phone_number: m.phoneNumber };
            }
            return { email: m.email };
        });
};

export function prepareSendKickoffAgencyData(values: KickoffRequestType) {
    const teamMembersIds = values.teamMembers.length
        ? values.teamMembers.map(item => item.id)
        : [];
    const teamInvitesIds = values.teamInvites.length
        ? values.teamInvites.map(item => item.id)
        : [];
    const allTeamsIds = [...teamMembersIds, ...teamInvitesIds];
    const invitations = getInvitations(values.invites);
    const billingDetails = {
        legal_name: values.legalName,
        billing_address: values.billingAddress,
    } as {
        legal_name: string;
        billing_address: string;
        address_additional_info?: string;
    };
    const notRequiredParams = {} as NotRequiredKickoffParamsType;
    if (values.billingAddressAdditional) {
        billingDetails.address_additional_info =
            values.billingAddressAdditional;
    }
    if (values.paymentsMilestone.length !== 0)
        notRequiredParams.milestones = values.paymentsMilestone.map(item => ({
            deliverable: item.deliverable,
            amount: Number(item.amount),
            invoice_date: moment(item.invoiceDate).format('YYYY-MM-DD'),
        }));
    if (values.paymentsRetainer)
        notRequiredParams.retainer = {
            payment_frequency: values.paymentsRetainer.paymentFrequency,
            deliverable: values.paymentsRetainer.deliverable,
            amount: Number(values.paymentsRetainer.amount),
            invoice_date: moment(values.paymentsRetainer.invoiceDate).format(
                'YYYY-MM-DD',
            ),
            number_of_payments: Number(
                values.paymentsRetainer.numberOfPayments,
            ),
        };

    return {
        billing_details: billingDetails,
        files: values.files.map(item => item.id),
        kickoff_type: values.paymentsType,
        payment_terms: values.paymentTerms,
        team_members: allTeamsIds,
        invitations,
        agency_accepted_terms: values.isAcceptedTerms,
        status: values.status,
        ...notRequiredParams,
    };
}

export function prepareSendKickoffClientData(values: KickoffRequestType) {
    const teamMembersIds = values.teamMembers.length
        ? values.teamMembers.map(item => item.id)
        : [];
    const teamInvitesIds = values.teamInvites.length
        ? values.teamInvites.map(item => item.id)
        : [];
    const allTeamsIds = [...teamMembersIds, ...teamInvitesIds];
    const invitations = getInvitations(values.invites);

    const billingDetails = {
        legal_name: values.legalName,
        billing_address: values.billingAddress,
    } as {
        legal_name: string;
        billing_address: string;
        address_additional_info?: string;
    };
    if (values.billingAddressAdditional) {
        billingDetails.address_additional_info =
            values.billingAddressAdditional;
    }

    return {
        billing_details: billingDetails,
        team_members: allTeamsIds,
        invitations,
        status: values.status,
        client_accepted_terms: values.isAcceptedTerms,
    };
}

export function transformKickoffData(
    values: KickoffResponseType,
): KickoffMergedResponseType {
    const teamMembers = values.kickoff_members.length
        ? values.kickoff_members
              .filter(f => f.first_name)
              .map(item => {
                  const notRequiredParams = {} as { phoneNumber?: string };
                  if (item.phone_number)
                      notRequiredParams.phoneNumber = item.phone_number;
                  return {
                      id: item.id,
                      email: item.email,
                      firstName: item.first_name,
                      lastName: item.last_name,
                      ...notRequiredParams,
                  };
              })
        : [];
    const teamInvites = values.kickoff_members.length
        ? values.kickoff_members
              .filter(f => !f.first_name)
              .map(item => {
                  const notRequiredParams = {} as { phoneNumber?: string };
                  if (item.phone_number)
                      notRequiredParams.phoneNumber = item.phone_number;
                  return {
                      id: item.id,
                      email: item.email,
                      firstName: '',
                      lastName: '',
                      ...notRequiredParams,
                  };
              })
        : [];

    return {
        isAcceptedTerms: values.accepted_terms,
        paymentsType: values.kickoff_type,
        paymentsMilestone: values.milestones.map(item => ({
            deliverable: item.deliverable,
            amount: item.amount,
            id: item.id,
            status: item.status,
            invoiceDate: item.invoice_date,
            paymentDue: item.payment_due,
            scheduleType: item.schedule_type,
        })),
        paymentsRetainer: values.retainer
            ? {
                  amount: values.retainer.amount,
                  deliverable: values.retainer.deliverable,
                  invoiceDate: values.retainer.invoice_date,
                  paymentDue: values.retainer.payment_due,
                  paymentFrequency: values.retainer.payment_frequency,
                  numberOfPayments: values.retainer.number_of_payments + '',
                  id: values.retainer.id || 0,
                  scheduleType: values.retainer.schedule_type,
              }
            : null,
        paymentTerms: values.payment_terms,
        files: values.contracts.map(item => ({
            id: item.id || 0,
            title: item.name,
            link: item.url,
            thumbnail: item.thumbnail_url,
        })),
        teamMembers,
        teamInvites,
        invites: [],
        status: values.status,
    };
}

export function transformAgencyKickoffBillingInfo(
    values: KickoffAgencyBillingInfoRequestType,
): KickoffAgencyBillingInfoType {
    const teamMembers = values.team_members.length
        ? values.team_members.map(item => {
              const notRequiredParams = {} as {
                  firstName?: string;
                  lastName?: string;
                  phoneNumber?: string;
              };
              if (item.first_name)
                  notRequiredParams.firstName = item.first_name;
              if (item.last_name) notRequiredParams.lastName = item.last_name;
              if (item.phone_number)
                  notRequiredParams.phoneNumber = item.phone_number;
              return {
                  id: item.id,
                  email: item.email,
                  ...notRequiredParams,
              };
          })
        : [];

    return {
        legalName: values.legal_name,
        billingAddress: values.billing_address,
        billingAddressAdditional: values.address_additional_info || '',
        teamMembers,
    };
}
