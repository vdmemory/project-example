import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mixinTypography } from '../../styles';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledLabelProps {
    isDisabled: boolean;
}
export const StyledLabelOld = styled.label`
    display: flex;
    flex-direction: column;

    > span {
        display: flex;
        align-items: center;
    }

    > span:first-of-type {
        flex-wrap: wrap;
    }

    .label-text {
        ${mixinTypography.text.tXl.textXlMedium};
        color: ${colors.grey.grey900};
        text-transform: uppercase;
    }
    .optional-text {
        ${mixinTypography.label.lMd.labelMdMedium};
        color: ${colors.grey.grey500};
        text-transform: uppercase;
    }
    .label-subtext {
        ${mixinTypography.text.tLg.textLgMedium};
        line-height: 28.8px;
        color: ${colors.grey.grey600};
    }

    ${({ isDisabled }: StyledLabelProps) =>
        isDisabled &&
        css`
            .label-text,
            .optional-text {
                color: ${colors.grey.grey300}!important;
            }
        `};

    > span:last-of-type {
        padding-bottom: 12px;
    }

    @media screen and (${mediaScreen.tablet}) {
        > span:first-of-type {
            padding-bottom: 8px;
        }
        .label-text {
            ${mixinTypography.mobile.display.mobileDisplaySm};
        }
        .label-subtext {
            ${mixinTypography.mobile.text.mobileTextLg};
            padding-bottom: 20px !important;
        }
    }
`;
