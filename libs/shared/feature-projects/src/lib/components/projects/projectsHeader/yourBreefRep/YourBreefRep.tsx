import { StyledYourBreefRep } from './YourBreefRep.styled';
import { Button } from '@breef/shared/ui-components';
import {
    BreefAvatar,
    ChatIcon,
    PhoneIcon,
    HandVictoryGreen,
} from '@breef/shared/assets';

import { useIntercom } from 'react-use-intercom';
import { itemAnimationSettings, linkClick } from '@breef/shared/utils';
import { CALENDLY_URL } from '@breef/shared/constants';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { AvatarImage, breefTeamDefaultImage } from '@breef/ui-kit';

export interface YourBreefRepProps {
    userFirstName: string;
    helpText: string;
    logoUrl: string | null;
    leadFirstName: string;
    leadLastName: string;
    calendlyLink: string;
    role: 'client' | 'agency';
}

export function YourBreefRep({
    userFirstName,
    helpText,
    logoUrl,
    leadFirstName,
    leadLastName,
    calendlyLink,
    role,
}: YourBreefRepProps) {
    const { boot, show } = useIntercom();
    const { data, isSuccess } = useGetSelfQuery();

    const handleShowIntercom = () => {
        if (isSuccess && data) {
            boot({
                userId: String(data.id),
                email: data.email,
                createdAt: data.dateJoined,
                name: `${data.firstName} ${data.lastName}`,
                company: {
                    companyId: String(data.id),
                    name: data.companyName,
                    createdAt: data.dateJoined,
                },
                customAttributes: {
                    type: data.companyType,
                },
            });
            show();
        }
    };

    const handleClickCall = () => {
        linkClick(calendlyLink || CALENDLY_URL);
    };

    const limitString = (value: string, limit: number) => {
        if (value.length > limit) {
            return `${value.slice(0, limit)}...`;
        }
        return value;
    };

    const helpTextTransformer = () => {
        const helpTextDefaultValue = helpText.slice(
            helpText.indexOf('{'),
            helpText.indexOf('}') + 1,
        );
        return helpTextDefaultValue
            ? helpText.replace(
                  helpTextDefaultValue,
                  limitString(userFirstName || 'user', 13),
              )
            : helpText;
    };

    const label =
        role === 'client' ? 'Your BRAND LEAD' : 'YOUR COMMUNITY TEAM:';
    const getAvatar = () => {
        if (role === 'agency') return breefTeamDefaultImage.src;
        if (role === 'client') return logoUrl || BreefAvatar.src;
        return BreefAvatar.src;
    };

    const firstName = (role === 'client' ? leadFirstName : 'Breef') || 'Breef';
    const lastName = (role === 'client' ? leadLastName : 'Team') || 'Team';

    return (
        <StyledYourBreefRep {...itemAnimationSettings}>
            <div className="content-your-rep-wrapper">
                <span className="rep-label">{label}</span>
                <div className="breef-info">
                    <div className="image-breef-wrapper">
                        <AvatarImage
                            src={getAvatar()}
                            alt="Avatar"
                            width={50}
                            height={50}
                            className="image"
                        />
                    </div>
                    <div
                        className="breef-info-lead"
                        data-testid="leadName"
                    >{`${firstName} ${lastName}`}</div>
                </div>
                <span className="rep-note" data-testid="repNote">
                    {helpTextTransformer()}
                </span>
                <img
                    className="rep-image"
                    src={HandVictoryGreen.src}
                    alt="Rock&Roll"
                />
            </div>
            <div className="footer-your-rep-wrapper">
                <Button
                    type="button"
                    className="only-icon button-icon"
                    onClick={handleShowIntercom}
                >
                    <div className="icon-with-notify">
                        <ChatIcon />
                    </div>
                </Button>
                <Button
                    type="button"
                    className="only-icon button-icon"
                    onClick={handleClickCall}
                >
                    <PhoneIcon />
                </Button>
            </div>
        </StyledYourBreefRep>
    );
}
