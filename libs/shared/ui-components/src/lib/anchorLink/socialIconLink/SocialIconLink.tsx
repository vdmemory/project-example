import { FC } from 'react';
import { getLink } from '@breef/shared/utils';
import { defaultSocialLinkTitles } from '@breef/shared/constants';
import { AnchorLink, LinkProps } from '../AnchorLink';
import { useProjectReview } from '@breef/shared/hooks';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@breef/shared/assets';

interface SocialLinkProps {
    link: string | null;
    title: string;
    className?: string;
    isSmallIcon?: boolean;
}

const StyledSocialIconLink = styled(AnchorLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props: LinkProps & { isSmallIcon?: boolean }) =>
        css`
            svg > path {
                fill: ${!props.href ? colors.mainGray : colors.mainOrange};
                stroke: ${!props.href ? colors.mainGray : colors.mainOrange};
            }
        `}
`;

export const SocialIconLink: FC<SocialLinkProps> = ({
    link,
    title,
    className,
    isSmallIcon,
}) => {
    const { getSocialIcon } = useProjectReview();
    const linkHref =
        link && title
            ? getLink({
                  title: title.toLowerCase(),
                  link,
                  defaultLinkTitles: defaultSocialLinkTitles,
              })?.toLowerCase()
            : undefined;

    return (
        <StyledSocialIconLink href={linkHref} className={className}>
            {getSocialIcon(title, isSmallIcon)}
        </StyledSocialIconLink>
    );
};
