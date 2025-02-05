import {
    Instagram,
    InstagramSmallIcon,
    TikTok,
    TikTokSmallIcon,
    Twitter,
    TwitterSmallIcon,
} from '@breef/shared/assets';
import { AgenciesAdvantagesList } from '@breef/shared/types';

type List = {
    name?: string;
    description?: string;
};

export const useProjectReview = () => {
    const getAgenciesAdvantages = (
        agenciesAdvantagesList: AgenciesAdvantagesList[],
        agenciesAdvantagesValue: number[],
    ) =>
        agenciesAdvantagesValue
            .map((item, idx) =>
                agenciesAdvantagesValue.length < idx
                    ? `${agenciesAdvantagesList[item - 1].name}, `
                    : agenciesAdvantagesList[item - 1].name,
            )
            .join(', ');

    const getInvitationsString = (
        invitations: {
            id: number;
            email: string;
        }[],
    ) =>
        invitations
            .map((item, idx) =>
                invitations.length < idx ? `${item.email}, ` : `${item.email}`,
            )
            .join(', ');

    const getSocialIcon = (titleLink: string, isSmallIcon?: boolean) => {
        if (titleLink?.toLowerCase() === 'TikTok'.toLocaleLowerCase()) {
            return isSmallIcon ? (
                <TikTokSmallIcon />
            ) : (
                <TikTok data-testid="tiktok-icon" />
            );
        } else if (titleLink?.toLowerCase() === 'Twitter'.toLocaleLowerCase()) {
            return isSmallIcon ? (
                <TwitterSmallIcon />
            ) : (
                <Twitter data-testid="twitter-icon" />
            );
        } else {
            return isSmallIcon ? (
                <InstagramSmallIcon />
            ) : (
                <Instagram data-testid="instagram-icon" />
            );
        }
    };

    const getStringForList = ({ list }: { list: List[] }) =>
        list
            .map(({ name, description }, idx) => {
                if (name) {
                    return idx === list.length - 1 ? `${name}` : `${name}, `;
                } else if (description) {
                    return idx === list.length - 1
                        ? `${description}`
                        : `${description}, `;
                }
                return '';
            })
            .join('');

    return {
        getAgenciesAdvantages,
        getInvitationsString,
        getSocialIcon,
        getStringForList,
    };
};
