import {
    PitchProjectStatuses,
    PitchProjectStatusesWeight,
    ReviewDecisionNames,
} from '@breef/shared/constants';
import {
    PitchListByClientRequest,
    PitchListByClient,
    AgencyPitchResponse,
    TransformAgencyPitchResponse,
    PitchesListResponse,
    TransformPitchesListResponse,
    AgenciesSchedulesListRequest,
    AgenciesSchedulesList,
} from '@breef/shared/types';
import { getPitchProjectStatusWeight } from '@breef/shared/utils';

export function pitchesByClientAdapters(
    values: PitchListByClientRequest,
): PitchListByClient {
    return {
        pitches: values.pitches.map(item => ({
            id: item.id,
            companyName: item.company_name,
            companyLogoUrl: item.company_logo_url,
            companyLocations: { location: item.company_locations.location },
            budget: item.budget,
            status: item.status,
            scheduleStatus:
                !item.schedule_status || item.schedule_status === 'none'
                    ? null
                    : item.schedule_status,
            reviewDecision: item.review_decision,
            isShortlisted: item.is_shortlisted || false,
            pitchTags: item.pitch_tags,
        })),
    };
}

export function pitchesListTransformer(
    values: PitchesListResponse,
): TransformPitchesListResponse[] {
    const checkStatusPitch = (item: PitchesListResponse['pitches'][0]) =>
        getPitchProjectStatusWeight(item.status) <
        PitchProjectStatusesWeight.agencySelected;

    const archivePitches: typeof values.pitches = [];
    const anyPitches: typeof values.pitches = [];
    values.pitches.forEach(item => {
        if (item.status === PitchProjectStatuses.archived) {
            archivePitches.push(item);
        } else {
            anyPitches.push(item);
        }
    });

    const filterPitches = anyPitches.filter(item => checkStatusPitch(item));
    const pitchesList = [...filterPitches, ...archivePitches];

    const filterUnreviewedPitches: typeof pitchesList = [];
    const filterOtherPitches: typeof pitchesList = [];
    pitchesList.forEach(item => {
        if (item.review_decision === ReviewDecisionNames.UNREVIEWED) {
            filterUnreviewedPitches.push(item);
        } else {
            filterOtherPitches.push(item);
        }
    });

    return [...filterUnreviewedPitches, ...filterOtherPitches].map(item => ({
        id: item.id as number,
        name: item.company_name,
        logo: item.company_logo_url,
        reviewDecision: item.review_decision,
        status: item.status,
        pitch: null,
    }));
}

export const transformPitchAdapter = (
    values: AgencyPitchResponse,
): TransformAgencyPitchResponse => {
    return {
        id: values.id,
        aboutUs: values.agency_bio ?? '',
        companyLogo: values.company_logo_url
            ? {
                  url: values.company_logo_url,
                  id: values.company_logo,
                  name: '',
              }
            : null,
        tagline: values.tagline || '',
        website:
            values.other_links.find(item => item.title === 'website')?.link ??
            '',
        portfolio:
            values.other_links.find(item => item.title === 'portfolio')?.link ??
            '',
        instagram:
            values.social_links.find(item => item.title === 'instagram')
                ?.link ?? '',
        pitchDetails: values.pitch_text ?? '',
        skills: values.project_capabilities ?? [],
        additionalLinks: values.additional_links?.length
            ? values.additional_links.map(item => ({
                  name: item.title,
                  link: item.link,
              }))
            : null,
        attachments: values.files?.length
            ? values.files.map(({ id, name, url }) => ({
                  id,
                  title: name,
                  link: url,
              }))
            : null,
        budget: { value: values.budget, comment: values.budget_note ?? '' },
        experience: String(values.experience),
        clientFit: String(values.client_fit),
        projectScope: String(values.project_scope),
        uniqueThings: values.tags,
        reviewDecision: values.review_decision,
        breefTake: values.breef_take ?? '',
        companyLocation: values.company_locations.location,
        companyName: values.company_name,
        approach: {
            description: values.approach?.description ?? '',
            links: values.approach?.links ?? [],
        },
        previousWork: values.past_clients?.length
            ? values.past_clients.map(item => ({
                  id: item.id,
                  clientName: item.name,
                  projectName: item.project_name,
                  website: item.website,
                  description: item.project_description,
                  documents: item.documents?.map(doc => ({
                      id: doc.id,
                      title: doc.name,
                      link: doc.url,
                  })),
                  projectLinks: item.links,
              }))
            : [],
    };
};

export const getAgenciesSchedulesListAdapter = (
    values: AgenciesSchedulesListRequest[],
): AgenciesSchedulesList[] => {
    return values.map(item => ({
        id: item.id,
        logoUrl: item.logo_url,
        name: item.name,
        location: item.location,
        schedule: item.schedule,
        isShortlisted: item.is_shortlisted,
        pitchId: item.pitch.id,
    }));
};
