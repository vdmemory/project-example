import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography, template } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledBoxInfo = styled.div`
    display: none;
    flex-direction: column;
    gap: 20px;
    ${template.boxShadowGrey};
    border-radius: 4px;
    padding: 20px;
    background-color: ${colors.white};

    &.show {
        display: flex;
    }

    @media (${mediaScreen.maxMobile}) {
        padding: 12px;
    }

    img {
        width: 100%;
    }

    .box-label {
        ${mixinTypography.label.lS.labelSMedium};
        color: ${colors.grey.grey500};
    }

    .agency {
        display: flex;
        padding: 2px 0;
        gap: 10px;
        align-items: flex-start;

        @media (${mediaScreen.maxMobile}) {
            display: none;
        }

        .agency-logo {
            min-width: 30px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }

        .agency-name {
            ${mixinTypography.text.tXl.textXlMedium};
            font-weight: 600;
            min-height: 100%;
            display: inline-flex;
            align-items: center;
        }
    }

    .note {
        ${mixinTypography.text.tSmall.textSmallMedium};
        white-space: pre-wrap;
        word-wrap: break-word;

        @media (${mediaScreen.maxMobile}) {
            ${mixinTypography.mobile.text.mobileTextMd};
        }
    }

    .brand-lead {
        margin-top: 17px;
        display: flex;
        justify-content: flex-start;

        @media (${mediaScreen.maxMobile}) {
            margin-top: 0;
        }

        .brand-lead-avatar {
            height: 80px;
            width: 80px;
            border-radius: 50%;
            box-shadow: 0px 0px 0px 3px #f0f0f0;
        }

        .group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            gap: 2px;

            .brand-lead-name {
                font-family: ${fonts.biroScriptPlus};
                font-size: 22px;
                font-weight: 400;
                line-height: 28.6px;
                width: max-content;
            }

            .brand-lead-label {
                ${mixinTypography.text.tSmall.textSmallMedium};
                font-size: 12px;
                color: ${colors.grey.grey500};
            }
        }
    }

    @media (${mediaScreen.maxMobile}) {
        width: 100%;
    }
`;
