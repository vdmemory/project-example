import { CapabilityPricingType, CompanyRole } from '@breef/shared/constants';
import {
    AccountInfoRequestType,
    AccountInfoResponseType,
    BillingDataMergedType,
    BillingDataRequestType,
    CapabilitiesRequestType,
    CapabilitiesResponseType,
    ChangePasswordRequestType,
    CompanyInfoFormRequestType,
    CompanyInfoMergedResponseType,
    CompanyInfoRequestType,
    CompanyInfoResponseType,
    CompanyRequestType,
    IndustriesTagsRequestType,
    LinksDocsRequestType,
    ListRolesResponse,
    SetPasswordRequestType,
    TeamMemberRequestType,
    TeamMembersProfileResponseType,
} from '@breef/shared/types';
import { parsePhoneNumberToObj, urlToDefaultFormat } from '@breef/shared/utils';
import { uniqueId } from 'lodash';

export function prepareSetPasswordData(values: SetPasswordRequestType) {
    return {
        new_password: values.newPassword,
        confirm_password: values.confirmNewPassword,
    };
}

export function prepareChangePasswordData(values: ChangePasswordRequestType) {
    return {
        old_password: values.currentPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmNewPassword,
    };
}

export function prepareChangeAccountInfoData(values: AccountInfoRequestType) {
    return {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.toLowerCase(),
        phone_number: values.phoneNumber.numberWithoutCountryCode
            ? values.phoneNumber.number
            : null,
    };
}

export function transformAccountInfoData(values: AccountInfoResponseType) {
    return {
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        emailToConfirm: values.email_to_confirm,
        hasPassword: values.has_password,
        phoneNumber: parsePhoneNumberToObj(values.phone_number),
        hasSocialAccount: values.has_social_account,
        role: values.role || '',
    };
}

export function prepareChangeCompanyInfoData(values: CompanyInfoRequestType) {
    const socialLinks = [];
    if (values.instagram)
        socialLinks.push({
            title: 'instagram',
            link: urlToDefaultFormat(values.instagram),
        });
    if (values.twitter)
        socialLinks.push({
            title: 'twitter',
            link: values.twitter,
        });
    if (values.tiktok)
        socialLinks.push({
            title: 'tiktok',
            link: values.tiktok,
        });

    const data = {
        name: values.companyName.trim(),
        description: values.companyOverview.trim(),
        website: urlToDefaultFormat(values.website),
        social_links: socialLinks,
        office_locations: values.officeLocations.map(item => ({
            location: item.name,
        })),
        logo: values.logo,
        industries: values.industries?.map(item => item.id),
        company_size: values.companySize,
    };

    return data;
}

export function prepareUpdateCompanyInfoData(
    values: CompanyInfoFormRequestType,
) {
    const data = {
        name: values.name,
        description: values.description.trim(),
        website: urlToDefaultFormat(values.website),
        office_locations: [{ location: values.location }],
    };

    return data;
}

export function prepareChangeCompanyData(values: CompanyRequestType) {
    const socialLinks = [];
    if (values.instagram)
        socialLinks.push({
            title: 'instagram',
            link: urlToDefaultFormat(values.instagram),
        });
    if (values.twitter)
        socialLinks.push({
            title: 'twitter',
            link: values.twitter,
        });
    if (values.linkedin)
        socialLinks.push({
            title: 'linkedin',
            link: values.linkedin,
        });
    if (values.meta)
        socialLinks.push({
            title: 'meta',
            link: urlToDefaultFormat(values.meta),
        });

    return {
        name: values.companyName.trim(),
        description: values.companyOverview.trim(),
        website: urlToDefaultFormat(values.website),
        social_links: socialLinks,
        office_locations: values.officeLocations.map(item => ({
            location: item.name,
        })),
        number_of_employees: values.teamSize,
        business_years: values.yearsInBusiness,
        catchline: values.tagline,
        primary_contact_email: values.contactEmail,
        primary_contact_phone_number: values.contactPhoneNumber.number,
        logo: values.logo,
    };
}

export function prepareChangeCapabilitiesData(values: CapabilitiesRequestType) {
    const servicesData = values.services.map(service => ({
        capability: service.serviceId,
        pricing: service.pricing
            ? [
                  {
                      name: service.pricing.packageName || null,
                      description: service.pricing.description || null,
                      minimum: Number(
                          service.pricing.pricingStructure ===
                              CapabilityPricingType.PACKAGE
                              ? service.pricing.projectAmount
                              : service.pricing.minProjectAmount,
                      ),
                      maximum:
                          service.pricing.pricingStructure ===
                          CapabilityPricingType.RANGE
                              ? Number(service.pricing.maxProjectAmount)
                              : null,
                      price_type: service.pricing.pricingStructure,
                      billing_structure: service.pricing.billingStructure,
                      retainer_type: service.pricing.retainerType,
                  },
              ]
            : [],
        clients: service.portfolio.map(item => ({
            name: item.clientName,
            website: item.clientWebsite
                ? urlToDefaultFormat(item.clientWebsite)
                : null,
            project_name: item.projectName,
            project_date:
                item.startDateYear && item.startDateMonth
                    ? `${item.startDateMonth}, ${item.startDateYear}`
                    : null,
            project_description: item.projectDescription || null,
            testimonial: item.clientTestimonial || null,
            links: item.linkUrl
                ? [
                      {
                          title: `${service.name} for ${item.clientName}`,
                          link: urlToDefaultFormat(item.linkUrl),
                      },
                  ]
                : [],
            documents: item.documents.map(doc => doc.id),
        })),
    }));

    return { capabilities: servicesData };
}

export function prepareChangeIndustriesTagsData(
    values: IndustriesTagsRequestType,
) {
    return {
        industries: values.industries?.map(item => item.id),
        tags: values.tags?.map(item => item.id),
    };
}

export function prepareChangeLinksDocsData(values: LinksDocsRequestType) {
    return {
        portfolio_links: values.links?.map(item => ({
            link: urlToDefaultFormat(item.link),
            title: item.title,
        })),
        documents: values.docs?.map(item => item.id),
    };
}

export const getSocialLink = (
    socialLinks: {
        link: string;
        title: string;
    }[],
    title: string,
) => {
    const link = socialLinks.find(item => item.title === title)?.link || '';
    return link ? urlToDefaultFormat(link) : '';
};

export const transformOfficeLocations = (
    locations: {
        id: number;
        location: string;
    }[],
) => {
    // remove duplicates
    const unique = locations.filter(
        (item, index) =>
            locations.findIndex(l => l.location === item.location) === index,
    );

    // remove 'None' locations
    const clear = unique.filter(
        item => item.location !== 'None' && item.location !== 'None, None',
    );

    // remove 'None' in 'None, Kiev' locations
    clear.forEach(item => {
        if (item.location.includes('None, ')) {
            item.location = item.location.replace('None, ', '');
        }
    });

    return clear.map(item => ({
        id: item.id,
        name: item.location,
    }));
};

function getEnumValueFromString<T extends { [index: string]: string }>(
    enumObj: T,
    valueStr: string,
): T[keyof T] | undefined {
    return enumObj[valueStr as keyof T];
}

export function transformCompanyInfoData(values: CompanyInfoResponseType) {
    const brandLead =
        values.brand_lead && values.brand_lead.brand_lead
            ? {
                  brandLead: {
                      id: values.brand_lead.brand_lead.id,
                      helpText: values.brand_lead.brand_lead.help_text,
                      companyType: values.brand_lead.brand_lead.company_type,
                      logoUrl: values.brand_lead.brand_lead.logo_url,
                      calendlyLink: values.brand_lead.brand_lead.calendly_link,
                  },
                  id: values.brand_lead.id,
                  email: values.brand_lead.email,
                  firstName: values.brand_lead.first_name,
                  lastName: values.brand_lead.last_name,
              }
            : {
                  brandLead: {
                      id: Number(uniqueId()),
                      helpText: 'Hi {user first name}! Chat me here',
                      companyType: '',
                      logoUrl: '',
                      calendlyLink: '',
                  },
                  id: Number(uniqueId()),
                  email: '',
                  firstName: 'Breef',
                  lastName: 'Team',
              };

    const companyData = {
        companyName: values.name,
        companyOverview: values.description,
        website: values.website ? urlToDefaultFormat(values.website) : '',
        instagram: getSocialLink(values.social_links, 'instagram') ?? '',
        twitter: getSocialLink(values.social_links, 'twitter') ?? '',
        meta: getSocialLink(values.social_links, 'meta') ?? '',
        officeLocations: transformOfficeLocations(values.office_locations),
        brandLead,
    } as CompanyInfoMergedResponseType;
    const tiktok = getSocialLink(values.social_links, 'tiktok');
    const linkedin = getSocialLink(values.social_links, 'linkedin');
    if (tiktok) {
        companyData.tiktok = tiktok;
    }
    if (linkedin) {
        companyData.linkedin = linkedin;
    }

    if (values.number_of_employees !== undefined) {
        companyData.teamSize = values.number_of_employees ?? '';
    }
    if (values.business_years !== undefined) {
        companyData.yearsInBusiness = values.business_years ?? '';
    }
    if (values.primary_contact_email !== undefined) {
        companyData.contactEmail = values.primary_contact_email ?? '';
    }
    if (values.primary_contact_phone_number !== undefined) {
        companyData.contactPhoneNumber = {
            code: '',
            number: values.primary_contact_phone_number ?? '',
            numberWithoutCountryCode: '',
        };
    }
    if (values.catchline !== undefined) {
        companyData.tagline = values.catchline ?? '';
    }

    if (values.industries) {
        companyData.industries = values.industries.map(item => ({
            id: item.id,
            name: item.name,
        }));
    }
    if (values.tags) {
        companyData.tags = values.tags;
    }
    if (values.portfolio_links) {
        companyData.links = values.portfolio_links;
    }
    if (values.documents) {
        companyData.docs = values.documents.map(item => ({
            id: item.id,
            title: item.name,
            link: item.url,
        }));
    }
    if (values.company_size !== undefined) {
        companyData.companySize = values.company_size ?? '';
    }
    if (values.logo_url) {
        companyData.logoUrl = values.logo_url;
        companyData.logo = values.logo;
    }

    if (values.services_and_skills) {
        companyData.servicesAndSkills = values.services_and_skills;
    }

    if (values.company_role) {
        companyData.companyRole = getEnumValueFromString(
            CompanyRole,
            values.company_role,
        );
    }
    if (values.capabilities) {
        companyData.services = values.capabilities.map(item => ({
            serviceId: item.capability.id,
            name: item.capability.name,
            pricing: item.pricing?.[0]
                ? {
                      pricingStructure: item.pricing[0].price_type,
                      billingStructure: item.pricing[0].billing_structure,
                      retainerType: item.pricing[0].retainer_type,
                      projectAmount: String(item.pricing[0].minimum) ?? '',
                      minProjectAmount: String(item.pricing[0].minimum) ?? '',
                      maxProjectAmount: String(item.pricing[0].maximum) ?? '',
                      packageName: item.pricing[0].name ?? '',
                      description: item.pricing[0].description ?? '',
                  }
                : null,
            portfolio: item.clients.map(client => ({
                clientName: client.name,
                clientWebsite: client.website ?? '',
                projectName: client.project_name,
                startDateMonth: client.project_date?.split(', ')[0] ?? '',
                startDateYear: client.project_date?.split(', ')[1] ?? '',
                projectDescription: client.project_description ?? '',
                clientTestimonial: client.testimonial ?? '',
                linkUrl: client.links[0]?.link ?? '',
                documents: client.documents.map(item => ({
                    id: item.id,
                    title: item.name,
                    link: item.url,
                })),
            })),
        }));
    }
    return companyData;
}

export function prepareInviteTeamMemberData(values: TeamMemberRequestType) {
    return {
        email: values.email,
    };
}

export function prepareResendInviteTeamMemberData(
    values: TeamMemberRequestType,
) {
    return {
        email: values.email,
        resend: true,
    };
}

export function transformTeamMembersData(
    values: TeamMembersProfileResponseType,
) {
    return {
        teamMembers: values.team_members?.map(member => {
            const restMemberParams: { phoneNumber?: string } = {};
            if (member.phone_number)
                restMemberParams.phoneNumber = member.phone_number;
            return {
                id: member.id,
                email: member.email,
                firstName: member.first_name,
                lastName: member.last_name,
                position: member.position,
                ...restMemberParams,
            };
        }),
        invites: values.invites.map(invite => ({
            email: invite.email,
            status: invite.invitation_status,
            date: invite.invitation_date,
            id: invite.id,
            phoneNumber: invite.phone_number,
        })),
    };
}

export function transformListRolesData(values: ListRolesResponse) {
    const listRoles = excludeOwner(values);
    return listRoles.map(item => ({
        value: item.id,
        label: item.title,
    }));
}

export function excludeOwner(roles: ListRolesResponse) {
    return roles.filter(role => !role.title.match(/owner/i));
}

export function transformBillingData(values: BillingDataRequestType) {
    return {
        legalName: values.billing_details?.legal_name || '',
        billingAddress: values.billing_details?.billing_address || '',
        billingAddressAdditional:
            values.billing_details?.address_additional_info || '',
    } as BillingDataMergedType;
}

export function prepareChangeBillingData(values: BillingDataMergedType) {
    return {
        billing_details: {
            legal_name: values.legalName,
            billing_address: values.billingAddress,
            address_additional_info: values.billingAddressAdditional,
        },
    } as BillingDataRequestType;
}
