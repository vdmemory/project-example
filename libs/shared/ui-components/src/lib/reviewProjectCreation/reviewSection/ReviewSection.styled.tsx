import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledReviewSection = styled.div`
    display: flex;
    gap: 37px;

    .title {
        display: flex;
        white-space: nowrap;
        min-width: 145px;
        height: fit-content;
        ${mixinTypography.text.tMd.textMdMedium};
        color: ${colors.black};
        position: relative;
        width: fit-content;
        margin: -4.5px 0;
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-thickness: 0.79px;
        text-decoration-color: ${colors.orange.orange};
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-right: 23px;
        max-width: 692px;
        overflow: hidden;
        min-height: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: -5px 0;
    }

    p {
        word-break: break-word;
        white-space: pre-wrap;
        ${mixinTypography.text.tSmall.textSmallMedium};
        color: ${colors.grey.grey600};
        margin: -4px 0;
    }

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        gap: 24px;
    }
    @media screen and (${mediaScreen.tablet}) {
        .title {
            font-size: 18px;
            font-weight: 450;
            line-height: normal;
            letter-spacing: 0;
            margin: 0;
            text-underline-offset: 7px;
            height: 25px;
        }
        .content-wrapper {
            padding-right: 0;
        }
    }
`;
