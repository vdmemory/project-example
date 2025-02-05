import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPitchTermsForm = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px 0 25px;
    gap: 23px;

    .list {
        display: flex;
        flex-direction: row;

        gap: 16px;
        flex-wrap: wrap;

        @media screen and (max-width: 1024px) {
            justify-content: center;
        }

        .item {
            width: 100%;
            border-radius: 4px;
            border: 1px solid ${colors.grey.grey100};
            background-color: rgb(211 211 211 / 20%);
            padding: 16px 20px 16px;
            min-height: 76px;

            @media screen and (max-width: 512px) {
                max-width: 100%;
                min-height: 89px;
            }

            .title {
                ${mixinTypography.text.tLg.textLgMedium};
                line-height: 24px;
                text-transform: none;
                margin: 0 0 6px;
                color: ${colors.grey.grey900};
                -webkit-text-stroke-width: 0.3px;
                -webkit-text-stroke-color: ${colors.grey.grey900};
            }

            .description {
                ${mixinTypography.text.tLg.textLgMedium};
                font-size: 12px;
                line-height: 12px;
                text-transform: none;
                letter-spacing: unset;
                color: ${colors.grey.grey900};
            }
        }
    }

    .terms {
        font-size: 16px;
        line-height: 19px;
        margin: 0 0 0 21px;
        display: flex;
        align-items: center;

        label {
            margin-right: 8px;
        }

        a {
            white-space: nowrap;
            color: ${colors.primary.primary500};
            text-decoration: none;
        }

        .checkbox {
            min-width: 18px;
            max-width: 18px;
            height: 18px;

            :hover {
                background-color: rgb(211 211 211 / 18%);
            }

            &.checkbox-selected:hover svg rect {
                fill: ${colors.primary.primary300};
            }

            &.checkbox-selected:hover svg path {
                fill: ${colors.white};
            }
        }
    }

    @media screen and (${mediaScreen.mobile}) {
        .terms {
            margin: 0 0 0 7.33px;
        }
    }
`;
