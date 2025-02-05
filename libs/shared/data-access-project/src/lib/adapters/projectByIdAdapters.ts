import { Choice, ProjectCreationStepsEnum } from '@breef/shared/constants';
import { ProjectByIdResponseType, ProjectByIdType } from '@breef/shared/types';
import {
    getBrandLinks,
    urlToDefaultFormat,
    getFiles,
} from '@breef/shared/utils';

export function projectByIdAdapters(
    values: ProjectByIdResponseType,
): ProjectByIdType {
    return {
        id: values.id,
        name: values.name,
        companyName: values.company_name ?? '',
        companyLocation: values.company_location ?? '',
        startDay: values.start_day ?? '',
        description: values.description ?? '',
        agencySkills: values.agency_skills.map(item => ({
            id: item.capability,
            name: item.capability_name,
            note: item.note ?? '',
            isCustomerNote: item.is_default ?? false,
        })),
        agencyTags: values.tags,
        agenciesAdvantages: values.agencies_advantages,
        agencyLocation: values.agency_location ?? '',
        openToRemoteAgencies: values.open_to_remote_agencies,
        budgetRange: values.budget_range ? Choice[values.budget_range] : '',
        budgetType: values.budget_range_type,
        companyDescription: values.company_description ?? '',
        socialLinks:
            values.social_links?.map(item => ({
                title: item.title,
                link: urlToDefaultFormat(item.link ?? ''),
            })) || [],
        brandLinks: getBrandLinks(values.brand_links),
        files: getFiles(values.files),
        companyWebsite: values.company_website ?? '',
        idealAgencyDescription: values.agency_description ?? '',

        progressBarStatus: values.progress_bar_status,
        actionValue: values.action_value,
        currentPaymentId: values.current_payment_id,
        status: values.status,
        step: values.step ?? ProjectCreationStepsEnum.ProjectScope,
        isAvailabilityCreated: values.is_availability_created,
        isSchedulingCreated: values.is_scheduling_created,
        isConfidential: values.is_confidential,
        isNameEditLocked: values.is_name_edit_locked,

        unfilledStep: values.unfilled_step,
    };
}
