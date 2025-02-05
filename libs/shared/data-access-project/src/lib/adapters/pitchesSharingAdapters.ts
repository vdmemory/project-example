import {
    GetPitchesListSharing,
    GetPitchesListSharingRequest,
    PublicPitchesListRequest,
    PublicPitchesList,
    AgencyPitchResponse,
    TransformAgencyPitchResponse,
} from '@breef/shared/types';

export function pitchesSharingAdapters(
    values: GetPitchesListSharingRequest,
): GetPitchesListSharing {
    return {
        id: values.id,
        pitchesSharing: values.pitches_sharing,
        token: values.token,
    };
}

export function publicPitchesListAdapters(
    values: PublicPitchesListRequest[],
): PublicPitchesList[] {
    return values.map(item => ({
        token: item.token,
        companyName: item.company_name,
        companyLogoUrl: item.company_logo_url,
    }));
}

export const publicSinglePitchAdapter = (
    values: AgencyPitchResponse,
): TransformAgencyPitchResponse => {
    return {
        id: values.id,
        aboutUs: values.agency_bio ?? '',
        companyLogo: values.company_logo_url
            ? {
                  url: values.company_logo_url,
                  id: values.company_logo,
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
        breefTake: values.breef_take,
    };
};
