import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledReviewCardOld = styled.div`
    padding: 20px;
    border: 1px solid ${colors.grey.grey900};
    display: flex;
    overflow: hidden;
    border-radius: 4px;
    position: relative;

    .main-section {
        display: flex;
        flex-direction: column;
        flex: 1;
        ${mixinTypography.text.tMd.textMdMedium};
        overflow: hidden;
        word-wrap: break-word;

        > .title {
            font-size: 18px;
            line-height: 24px;
            text-transform: uppercase;
            margin: 0 30px 20px 0;
            letter-spacing: 0.025em;
            font-weight: bolder;
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
        padding: 12px 14.5px;

        .edit-button {
            top: 12px;
            right: 14.5px;
        }

        .main-section {
            .title {
                margin-right: 56.5px;
                ${mixinTypography.mobile.text.mobileTextLg};
            }
        }
    }
`;

export const StyledReviewTextOld = styled.div`
    ${mixinTypography.text.tLg.textLgMedium};
    white-space: pre-wrap;
    @media screen and (${mediaScreen.tablet}) {
        ${mixinTypography.mobile.text.mobileTextMd};
        margin-bottom: 10px;

        margin: 0;
    }
`;
