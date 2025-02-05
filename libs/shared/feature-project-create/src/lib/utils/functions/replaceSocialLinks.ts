import {
    CompanyInfoMergedResponseType,
    ProjectByIdType,
} from '@breef/shared/types';
import { SocialNameEnum } from '@breef/shared/constants';
import { getProfileNameDisplay } from '@breef/shared/utils';

export const replaceSocialLinks = (
    projectData?: ProjectByIdType,
    companyData?: CompanyInfoMergedResponseType,
) => {
    const profileSocialLinks = {
        [SocialNameEnum.Instagram]:
            companyData?.instagram &&
            getProfileNameDisplay(companyData.instagram),
        [SocialNameEnum.Tiktok]:
            companyData?.tiktok && getProfileNameDisplay(companyData.tiktok),
        [SocialNameEnum.Twitter]:
            companyData?.twitter && getProfileNameDisplay(companyData.twitter),
    };

    const { instagramLink, tiktokLink, twitterLink } =
        getSocialLinks(projectData);

    const projectSocialLinks = {
        [SocialNameEnum.Instagram]:
            instagramLink && getProfileNameDisplay(instagramLink),
        [SocialNameEnum.Tiktok]:
            tiktokLink && getProfileNameDisplay(tiktokLink),
        [SocialNameEnum.Twitter]:
            twitterLink && getProfileNameDisplay(twitterLink),
    };

    return [
        {
            title: SocialNameEnum.Instagram,
            link:
                projectSocialLinks[SocialNameEnum.Instagram] ||
                profileSocialLinks[SocialNameEnum.Instagram] ||
                null,
        },
        {
            title: SocialNameEnum.Tiktok,
            link:
                projectSocialLinks[SocialNameEnum.Tiktok] ||
                profileSocialLinks[SocialNameEnum.Tiktok] ||
                null,
        },
        {
            title: SocialNameEnum.Twitter,
            link:
                projectSocialLinks[SocialNameEnum.Twitter] ||
                profileSocialLinks[SocialNameEnum.Twitter] ||
                null,
        },
    ];
};

const getSocialLinks = (projectData?: ProjectByIdType) => {
    const instagramLink = projectData?.socialLinks.find(
        item => item.title === SocialNameEnum.Instagram,
    )?.link;
    const tiktokLink = projectData?.socialLinks.find(
        item => item.title === SocialNameEnum.Tiktok,
    )?.link;
    const twitterLink = projectData?.socialLinks.find(
        item => item.title === SocialNameEnum.Twitter,
    )?.link;

    return {
        instagramLink,
        tiktokLink,
        twitterLink,
    };
};
