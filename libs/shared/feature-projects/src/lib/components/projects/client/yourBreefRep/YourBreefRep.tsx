import { StyledYourBreefRep } from './YourBreefRep.styled';
import { BreefAvatar, PhoneIcon } from '@breef/shared/assets';
import { itemAnimationSettings, linkClick } from '@breef/shared/utils';
import { CALENDLY_URL } from '@breef/shared/constants';
import { Card } from '../card/Card';
import { AvatarImage, Button } from '@breef/ui-kit';

interface YourBreefRepProps {
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

    const label = role === 'client' ? 'Your Strategist' : 'Your Agency Lead';
    const logo = logoUrl || BreefAvatar.src;
    const brandLeadName = `${leadFirstName || 'Breef'} ${
        (role === 'client' ? leadLastName : leadLastName[0] + '.') || 'Team'
    }`;

    return (
        <StyledYourBreefRep {...itemAnimationSettings}>
            <Card
                label={label}
                renderFooter={
                    <Button
                        icon={<PhoneIcon />}
                        variant="secondary"
                        label={'BOOK A CALL'}
                        onClick={handleClickCall}
                        iconPlacement="left"
                    />
                }
            >
                <BreefRepContent
                    logo={logo}
                    name={brandLeadName}
                    text={helpTextTransformer()}
                />
            </Card>
        </StyledYourBreefRep>
    );
}

const BreefRepContent = ({
    logo,
    name,
    text,
}: {
    logo: string;
    name: string;
    text: string;
}) => {
    return (
        <div className="breef-info">
            <div className="lead">
                <div className="avatar">
                    <AvatarImage
                        src={logo}
                        alt="Avatar"
                        width={78}
                        height={78}
                        className="image"
                    />
                </div>
                <div data-testid="name" className="name">
                    {name}
                </div>
            </div>
            <div data-testid="description" className="description">
                {text}
            </div>
        </div>
    );
};
