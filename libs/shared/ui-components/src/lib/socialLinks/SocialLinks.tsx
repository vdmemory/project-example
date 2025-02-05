import { StyledSocialLinks } from './SocialLinks.styled';
import { CloseIcon } from '@breef/shared/assets';
import {
    defaultSocialLinkTitles,
    otherLinkTitles,
} from '@breef/shared/constants';
import { getTitleLink } from '@breef/shared/utils';
import { SocialLinkType } from '@breef/shared/types';
import { AnchorLink } from '../anchorLink';
import { useMediaContext } from '@breef/shared/hooks';

const SocialLinks: React.FC<SocialLinkType> = ({
    title,
    link,
    handleDeleteLink,
    handleOpenModal,
    idx,
    className = 'social-links--item',
}) => {
    const handleEditLink = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleOpenModal(idx);
    };
    const { isMobile } = useMediaContext();
    const displayLinkName =
        link && title
            ? getTitleLink({
                  title: title.toLowerCase(),
                  link: link,
                  defaultLinkTitles: [
                      ...defaultSocialLinkTitles,
                      ...otherLinkTitles,
                  ],
              }).toLowerCase()
            : '';

    const isSocial =
        title && defaultSocialLinkTitles.includes(title.toLowerCase());
    const isOther = title && otherLinkTitles.includes(title.toLowerCase());

    return (
        <StyledSocialLinks
            data-testid="social-link-event"
            className={className}
            onClick={e => handleEditLink(e)}
        >
            <div className="social-header">
                {isSocial && !isMobile && (
                    <h3 className="social-title">{title}:</h3>
                )}
                {isOther && !isMobile && (
                    <h3 className="other-title">{title}:</h3>
                )}
                {isMobile && !link && (
                    <h3 className="title-placeholder">{title}</h3>
                )}

                {link && (
                    <AnchorLink className="social-link" href={link}>
                        {displayLinkName}
                    </AnchorLink>
                )}
            </div>

            {link && (
                <div
                    className="social-delete"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();

                        handleDeleteLink(idx);
                    }}
                >
                    <CloseIcon />
                </div>
            )}
        </StyledSocialLinks>
    );
};
export default SocialLinks;
