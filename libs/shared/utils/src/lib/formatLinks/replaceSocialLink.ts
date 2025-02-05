import { SocialLinks } from '@breef/shared/types';
import { SocialNameEnum } from '@breef/shared/constants';

const socialLinksDefault = [
    {
        title: 'tiktok',
        link: '',
    },
    {
        title: 'twitter',
        link: '',
    },
    {
        title: 'instagram',
        link: '',
    },
];

export const replaceSocialLinks = ({
    socialLink,
}: {
    socialLink: SocialLinks[];
}) => {
    if (!socialLink?.length) {
        return socialLinksDefault;
    }
    const tiktokLink = socialLink.find(item => item.title === 'tiktok');
    const twitterLink = socialLink.find(item => item.title === 'twitter');
    const instagramLink = socialLink.find(item => item.title === 'instagram');

    return [
        {
            title: SocialNameEnum.Instagram,
            link: instagramLink?.link || '',
        },
        {
            title: SocialNameEnum.Tiktok,
            link: tiktokLink?.link || '',
        },
        {
            title: SocialNameEnum.Twitter,
            link: twitterLink?.link || '',
        },
    ];
};
