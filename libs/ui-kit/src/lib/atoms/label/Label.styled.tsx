import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mixinTypography } from '../../styles';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledLabelProps {
    isDisabled: boolean;
}
export const StyledLabel = styled.label`
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
        ${mixinTypography.text.tLg.textLgMedium};
        color: ${colors.grey.grey900};
    }
    .optional-text {
        ${mixinTypography.text.tMd.textMdMedium};
        color: ${colors.grey.grey600};
        text-transform: capitalize;
    }
    .label-subtext {
        ${mixinTypography.text.tSmall.textSmallMedium};
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
        .label-text {
            ${mixinTypography.text.tLg.textLgMedium};
        }
        .label-subtext {
            ${mixinTypography.text.tSmall.textSmallMedium};
            margin-top: -2px;
            padding-bottom: 12px;
            letter-spacing: 0;
        }

        > span:last-of-type {
            padding-bottom: 12px;
        }
    }
`;
