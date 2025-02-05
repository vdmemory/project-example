import {
    defaultSocialLinkTitles,
    PitchCreationStepsEnum,
    projectFitItemInitValues,
} from '@breef/shared/constants';
import { getLink, urlToDefaultFormat } from '@breef/shared/utils';
import {
    PitchCreate,
    PitchCreateRequestType,
    PitchGuideFile,
    PitchGuideFileRequest,
    PitchMergedResponseType,
    PitchResponseType,
} from '@breef/shared/types';

export function preparePitchCreationData(
    values: PitchCreate,
): PitchCreateRequestType {
    const { body, projectId } = values;

    const otherLinks = [];
    const socialLinks = [];

    if (body.website) {
        otherLinks.push({
            title: 'website',
            link: urlToDefaultFormat(body.website),
        });
    }
    if (body.portfolio) {
        otherLinks.push({
            title: 'portfolio',
            link: urlToDefaultFormat(body.portfolio),
        });
    }
    if (body.instagram) {
        socialLinks.push({
            title: 'instagram',
            link: getLink({
                title: 'instagram',
                link: body.instagram,
                defaultLinkTitles: defaultSocialLinkTitles,
            }),
        });
    }

    // OUR_AGENCY - 1 step
    const data: PitchCreateRequestType = {
        project: projectId,
        step: body.step,
        other_links: otherLinks,
        social_links: socialLinks,
        company_logo: body.logo?.id || null,
        tagline: body.tagline || null,
        agency_bio: body.aboutUs || null,
    };

    // YOUR_PITCH - 2 step
    if (body.pitchDetails !== undefined) {
        data.pitch_text = body.pitchDetails || null;
    }
    if (body.approach) {
        data.approach = {
            description: body.approach.description || null,
            links: body.approach.links
                .filter(item => !!item.title)
                .map(item => ({
                    title: item.title,
                    link: urlToDefaultFormat(item.link),
                })),
        };
    }
    if (body.uniqueThings) {
        data.tags = body.uniqueThings.map(item => item.id);
    }
    if (body.budget) {
        data.budget = body.budget.value || null;
        data.budget_note = body.budget.comment || null;
    }

    // PORTFOLIO - 3 step
    if (body.previousWork) {
        data.past_clients = body.previousWork.map(item => ({
            name: item.clientName,
            project_name: item.projectName,
            website: item.website && urlToDefaultFormat(item.website),
            project_description: item.description,
            links: item.projectLinks
                ?.filter(item => !!item.title)
                .map(item => ({
                    title: item.title,
                    link: urlToDefaultFormat(item.link),
                })),
            documents: item.documents?.map(doc => doc.id),
        }));
    }
    if (body.additionalLinks) {
        data.additional_links = body.additionalLinks
            .filter(item => !!item.name)
            .map(item => ({
                title: item.name,
                link: urlToDefaultFormat(item.link),
            }));
    }
    if (body.attachments) {
        data.files = body.attachments.map(item => item.id) as number[];
    }

    // PROJECT_FIT - 4 step
    if (body.projectScope !== undefined) {
        data.project_scope = body.projectScope || null;
    }
    if (body.experience !== undefined) {
        data.experience = body.experience || null;
    }
    if (body.clientFit !== undefined) {
        data.client_fit = body.clientFit || null;
    }
    if (body.noteToBreef !== undefined) {
        data.note_to_breef = body.noteToBreef || null;
    }

    if (body.step === PitchCreationStepsEnum.Post) {
        data.status = 'posted';
    }

    return data;
}

export function transformGetPitchByIdData(
    values: PitchResponseType,
): PitchMergedResponseType {
    return {
        id: values.id,
        aboutUs: values.agency_bio ?? '',
        logo:
            values.company_logo && values.company_logo_url
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
        approach: {
            description: values.approach?.description ?? '',
            links: values.approach?.links ?? [],
        },
        additionalLinks: values.additional_links?.length
            ? values.additional_links.map(item => ({
                  name: item.title,
                  link: item.link,
              }))
            : [],
        attachments: values.files?.length
            ? values.files.map(({ id, name, url }) => ({
                  id,
                  title: name,
                  link: url,
              }))
            : [],

        budget: values.budget
            ? { value: values.budget, comment: values.budget_note ?? '' }
            : projectFitItemInitValues,
        projectScope: values.project_scope ? String(values.project_scope) : '',
        experience: values.experience ? String(values.experience) : '',
        clientFit: values.client_fit ? String(values.client_fit) : '',
        noteToBreef: values.note_to_breef ?? '',
        uniqueThings: values.tags ?? [],

        status: values.status,
        step: values.step,
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
}

export const transformPitchGuideFile = (
    values: PitchGuideFileRequest,
): PitchGuideFile => ({ breefPitchGuideUrl: values.breef_pitch_guide_url });
