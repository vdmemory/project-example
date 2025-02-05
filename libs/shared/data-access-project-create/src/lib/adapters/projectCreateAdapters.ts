import {
    Choice,
    defaultSocialLinkTitles,
    ProjectCreationStepsEnum,
} from '@breef/shared/constants';
import {
    getLink,
    getProjectTitleUsingSkills,
    urlToDefaultFormat,
} from '@breef/shared/utils';
import {
    CompanyDetailsRequestType,
    CompanyDetailsResponseType,
    ProjectCreationRequestType,
    ProjectCreationResponseType,
    ProjectTemplateResponseType,
    ProjectTemplateType,
    SocialLinks,
} from '@breef/shared/types';

export function prepareCompanyDetailsData(
    values: CompanyDetailsRequestType,
): CompanyDetailsResponseType {
    return {
        company_location: values.companyLocation,
        company_name: values.companyName,
        company_description: values.companyDescription,
        company_website: urlToDefaultFormat(values.companyWebsite),
    };
}

export function prepareProjectCreationData(
    values: ProjectCreationRequestType,
): ProjectCreationResponseType {
    const afterCompanyDetails =
        values.step === ProjectCreationStepsEnum.CompanyDetails ||
        values.step === ProjectCreationStepsEnum.Review ||
        values.step === ProjectCreationStepsEnum.Post;

    const projectName = values.isNameEditLocked
        ? values.projectTitle
        : getProjectTitleUsingSkills(values.agencySkills);

    const result: ProjectCreationResponseType = {
        name: projectName,
        step: values.step,
    };

    if (values.companyLocation !== undefined) {
        const companyLocation = values.companyLocation || null;
        result.company_location = companyLocation;
    }

    if (values.startDay !== undefined) {
        const startDay = values.startDay || null;
        result.start_day = startDay;
    }
    if (values.description !== undefined) {
        const description = values.description || null;
        result.description = description;
    }
    if (values.idealAgencyDescription !== undefined) {
        const idealAgencyDescription = values.idealAgencyDescription || null;
        result.agency_description = idealAgencyDescription;
    }
    if (values.agencySkills !== undefined) {
        result.agency_skills = values.agencySkills
            .filter(item => item.id !== -1)
            .map(item => ({
                capability: item.id,
                note: item.note || null,
                is_default: item.isCustomerNote,
            }));
    }
    if (values.agencyTags !== undefined) {
        result.tags = values.agencyTags.map(item => item.id);
    }
    if (values.agencyLocation !== undefined) {
        result.agency_location = !values.openToRemoteAgencies
            ? values.agencyLocation || null
            : null;
    }
    if (values.openToRemoteAgencies !== undefined) {
        result.open_to_remote_agencies = values.openToRemoteAgencies;
    }
    if (values.budgetRange !== undefined) {
        result.budget_range = values.budgetRange
            ? Choice[values.budgetRange]
            : null;
    }
    if (values.budgetType !== undefined) {
        result.budget_range_type = values.budgetType;
    }
    if (values.companyName !== undefined) {
        const companyName = values.companyName || null;
        result.company_name = companyName;
    }
    if (values.companyDescription !== undefined) {
        const companyDescription = values.companyDescription || null;
        result.company_description = companyDescription;
    }
    if (values.companyWebsite !== undefined) {
        result.company_website =
            (values.companyWebsite &&
                urlToDefaultFormat(values.companyWebsite)) ||
            null;
    }
    if (values.files !== undefined) {
        result.files = values.files.map(item => item.id as number);
    }
    if (values.brandLinks !== undefined) {
        result.brand_links = getBrandLinks(values.brandLinks);
    }
    if (values.socialLinks !== undefined) {
        result.social_links = getSocialLinks(values.socialLinks);
    }
    if (afterCompanyDetails) {
        result.is_confidential = values.isConfidential;
    }

    return result;
}

export const getSocialLinks = (
    links: { title: string; link: string | null }[],
): SocialLinks[] => {
    const filterLinks = links.filter(item => !!item.link) as SocialLinks[];
    return filterLinks.map(item => ({
        title: item.title,
        link: getLink({
            title: item.title,
            link: item.link,
            defaultLinkTitles: defaultSocialLinkTitles,
        }),
    }));
};

export const getBrandLinks = (
    links: {
        title: string;
        link: string;
        id?: string | number | null;
        type?: string;
    }[],
) => {
    const filterLinks = links.filter(
        item => !!item.link && item.type !== 'file',
    );

    return filterLinks.map(item => ({
        id: /^tmp-id-/.test(String(item.id)) ? null : item.id,
        title: item.title,
        link: urlToDefaultFormat(item.link),
    }));
};

export const projectTemplateAdapter = (
    values: ProjectTemplateResponseType,
): ProjectTemplateType => {
    return {
        description: values.description ?? '',
        agencySkills:
            values.agency_skills?.map(item => ({
                id: item.capability,
                name: item.capability_name,
                note: item.note ?? '',
                isCustomerNote: false,
            })) ?? [],
    };
};
