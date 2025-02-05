import styled from '@emotion/styled';
import { colors, mixinTypography, template } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledReviewScopeCard = styled.div`
    padding: 20px;
    display: flex;
    overflow: hidden;
    border-radius: 4px;
    position: relative;
    ${template.boxShadowGrey};
    background-color: ${colors.white};

    .main-section {
        display: flex;
        flex-direction: column;
        flex: 1;
        ${mixinTypography.text.tMd.textMdMedium};
        overflow: hidden;
        word-wrap: break-word;

        > .title {
            text-transform: capitalize;
            position: relative;
            font-size: 18px;
            line-height: 24px;
            margin: 0 30px 20px 0;
            letter-spacing: 0.025em;
            font-weight: bolder;
            width: fit-content;

            > svg {
                position: absolute;
                left: -3px;
                bottom: -2px;
            }
        }
    }

    .edit-button {
        border: none;
        outline: none;
        padding: 0;
        width: 24px;
        height: 24px;
        cursor: pointer;
        background-color: transparent;
        position: absolute;
        top: 20px;
        right: 20px;

        > svg {
            width: inherit;
            height: inherit;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .edit-button {
            top: 12px;
            right: 14px;
        }

        .main-section {
            .title {
                margin-right: 56px;
                ${mixinTypography.mobile.text.mobileTextLg};
                font-weight: bold;
            }
        }
    }
`;

export const StyledReviewScopeText = styled.div`
    ${mixinTypography.text.tLg.textLgMedium};
    white-space: pre-wrap;
    @media screen and (${mediaScreen.tablet}) {
        ${mixinTypography.mobile.text.mobileTextMd};
        margin-bottom: 10px;
        margin: 0;
    }
`;
