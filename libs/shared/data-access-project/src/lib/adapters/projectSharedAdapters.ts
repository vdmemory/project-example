import { SharedProjectRequest, SharedProjectType } from '@breef/shared/types';
import {
    getBrandLinks,
    urlToDefaultFormat,
    getFiles,
} from '@breef/shared/utils';
import moment from 'moment/moment';
import { Choice } from '@breef/shared/constants';
import { adaptedSocialLink } from '@breef/shared/data-access-pitch-create';

export function projectSharedAdapters(
    values: SharedProjectRequest,
): SharedProjectType {
    return {
        id: values.id,
        idealAgencyDescription: values.agency_description,
        name: values.name,
        companyLocation: values.company_location,
        description: values.description,
        submissionDeadline: values.submission_deadline
            ? moment(values.submission_deadline).utc().format('YYYY-MM-DD')
            : '',
        companyName: values.company_name,
        companyDescription: values.company_description,
        socialLinks: adaptedSocialLink(values.social_links),
        agencyLocation: values.agency_location ?? '',
        openToRemoteAgencies: values.open_to_remote_agencies,
        files: getFiles(values.files),
        brandLinks: getBrandLinks(values.brand_links),
        companyWebsite: values.company_website
            ? urlToDefaultFormat(values.company_website)
            : '',
        kickOffStatus: values.kick_off_status,
        startDay: values.start_day,
        agencySkills: values.agency_skills.map(item => ({
            id: item.capability,
            name: item.capability_name,
            note: item.note ?? '',
        })),
        budgetRange: Choice[values.budget_range],
        budgetType: values.budget_range_type,
        agencyTags: values.tags,
        agenciesAdvantages: values.agencies_advantages,
        isConfidential: values.is_confidential,
        brandLead: {
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
        },
        companyId: values.company_id,
        status: values.status,

        unfilledStep: values.unfilled_step,
    };
}
