import { defaultSocialLinkTitles } from '@breef/shared/constants';
import {
    checkProfileNameInSocial,
    findFirstAt,
    getUrlPattern,
} from '@breef/shared/utils';

export const useErrorHandler = () => {
    const checkValidateSocialLinks = ({
        titleLink,
        link,
        maxLinkLength,
    }: {
        titleLink: string;
        link: string;
        maxLinkLength: number;
    }): boolean => {
        if (link.length > maxLinkLength) {
            return true;
        }
        if (
            defaultSocialLinkTitles.includes(titleLink.toLowerCase()) &&
            link.match(findFirstAt)
        ) {
            const profileName = link.replace(/.*@/, '');
            return !profileName.match(checkProfileNameInSocial);
        }
        if (
            defaultSocialLinkTitles.includes(titleLink.toLowerCase()) &&
            link.match(getUrlPattern()) &&
            !link.match(findFirstAt)
        ) {
            return false;
        }
        if (link.match(getUrlPattern()) && !link.match(findFirstAt)) {
            return false;
        }
        return true;
    };

    const checkValidationTitleLink = ({
        titleLink,
        maxLengthTitle,
    }: {
        titleLink: string;
        maxLengthTitle: number;
    }) => {
        if (!titleLink?.length || titleLink?.length > maxLengthTitle) {
            return true;
        } else {
            return false;
        }
    };

    return { checkValidateSocialLinks, checkValidationTitleLink };
};
