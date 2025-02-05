import { ProjectByIdType } from '@breef/shared/types';
import { replaceSocialLinks } from '../formatLinks/replaceSocialLink';

export const getProjectData = (projectData: ProjectByIdType) => ({
    ...projectData,
    socialLinks:
        replaceSocialLinks({
            socialLink: projectData?.socialLinks.length
                ? projectData?.socialLinks
                : [],
        }) || [],
});
