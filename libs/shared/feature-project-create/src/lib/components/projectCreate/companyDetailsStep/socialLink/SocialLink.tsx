import React, { FC, Fragment, useContext } from 'react';
import { StyledSocialLink } from './SocialLink.styled';
import { SocialNameEnum } from '@breef/shared/constants';
import {
    InstagramSmallIcon,
    TikTokSmallIcon,
    TwitterSmallIcon,
} from '@breef/shared/assets';
import {
    AddCircleOrangeIcon,
    ButtonRound,
    Input,
    InputOld,
    LinkUi,
} from '@breef/ui-kit';
import { TrashIconButton } from '@breef/shared/ui-components';
import { useMediaContext } from '@breef/shared/hooks';

interface SocialLinkProps {
    socialName: SocialNameEnum;
    value: string | null;
    onChange: (value: string | null) => void;
    onBlur: () => void;
    error?: string;
}
export const SocialLink: FC<SocialLinkProps> = ({
    socialName,
    value,
    onChange,
    onBlur,
    error,
}) => {
    const isAddedLink = value !== null;
    const normalizedSocialName = getNormalizedSocialName(socialName) ?? '';
    const onAddLink = () => onChange('');
    const onRemoveLink = () => onChange(null);

    return (
        <StyledSocialLink className="social-link">
            {!isAddedLink ? (
                <LinkUi
                    onClick={onAddLink}
                    iconLeft={<AddCircleOrangeIcon />}
                    title={normalizedSocialName}
                    variant="decoration-none"
                />
            ) : (
                <Fragment>
                    <div className="social-link-info">
                        {getSocialIcon(socialName)}
                        <span>{normalizedSocialName}</span>
                    </div>
                    <div className="link-row">
                        <Input
                            placeholder="Username"
                            className="social-input"
                            descriptiveText="@breefwork"
                            value={value || ''}
                            onChange={onChange}
                            error={error}
                            onBlur={onBlur}
                            maxLength={900}
                        >
                            <TrashIconButton
                                className="trash"
                                onClick={onRemoveLink}
                            />
                        </Input>
                    </div>
                </Fragment>
            )}
        </StyledSocialLink>
    );
};

export default SocialLink;

const getSocialIcon = (socialName: SocialNameEnum) => {
    switch (socialName) {
        case SocialNameEnum.Instagram:
            return <InstagramSmallIcon />;
        case SocialNameEnum.Tiktok:
            return <TikTokSmallIcon />;
        case SocialNameEnum.Twitter:
            return <TwitterSmallIcon />;
        default:
            return null;
    }
};

const getNormalizedSocialName = (socialName: SocialNameEnum) => {
    switch (socialName) {
        case SocialNameEnum.Instagram:
            return 'Instagram';
        case SocialNameEnum.Tiktok:
            return 'TikTok';
        case SocialNameEnum.Twitter:
            return 'Twitter';
        default:
            return null;
    }
};
