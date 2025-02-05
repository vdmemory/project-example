import styled from '@emotion/styled';
import { colors, mixinTypography, template } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPitchesMakeIntroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.beige};
    position: relative;

    .make-intro-content-wrapper {
        display: flex;
        flex: 1;

        @media (${mediaScreen.maxMobile}) {
            flex-direction: column;
            max-width: 650px;
            margin: auto;
            width: 100%;
        }

        .side-bar {
            height: calc(100vh - 141px);
            min-width: 400px !important;

            @media (${mediaScreen.maxMobile}) {
                min-width: 100% !important;
                height: auto;
                position: static;
                padding: 20px 16px 0;
                gap: 12px;
                border: none;
            }
        }

        .what-next-wrapper {
            display: flex;
            flex-direction: column;

            @media (${mediaScreen.maxMobile}) {
                display: none;
            }

            & .label {
                white-space: nowrap;
                ${mixinTypography.label.lMd.labelMdMedium};
                line-height: 12px;
                margin-bottom: 18px;
            }
        }
    }

    .button-next {
        height: 71px;
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
        font-size: 24px;
        font-weight: 450;
        line-height: 29px;
        letter-spacing: 0.015em;
        text-align: right;

        @media (${mediaScreen.maxMobile}) {
            height: 48px;
            font-size: 16px;
            border-left: none;
            border-right: none;
        }

        svg {
            width: 37px;
            height: auto;

            @media (${mediaScreen.maxMobile}) {
                width: 24px;
            }
        }
    }

    .button-save-exit {
        height: 100%;
        width: 155px;
        border-top: none;
        border-bottom: none;
        border-right: none;
        font-family: ${fonts.accent};
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0.05em;
        text-align: center;

        :hover span {
            color: ${colors.grey.grey900};
        }
        :disabled span {
            color: ${colors.grey.grey400};
        }
    }

    .navigation {
        justify-content: space-between;
        padding: 0 40px;
        padding: 0 9% 0 12%;

        @media (${mediaScreen.maxMobile}) {
            padding: 0 11% 0 8%;
        }

        .button-nav {
            font-size: 16px;
            width: 155px;
        }
    }

    .schedule-calls-btn:last-of-type {
        border: none;
        border-radius: 4px;
        height: 40px;
        font-size: 16px;

        .icon-wrapper svg {
            width: 24px;
            height: 20px;
        }
    }

    .mobile-arrow {
        width: 20px;
        height: 14px;
    }
`;

export const StyledPitchesMakeIntro = styled.div`
    display: flex;
    margin: 40px 0;
    padding: 0 75px;
    overflow: hidden;
    flex: 1;

    @media (${mediaScreen.maxMobile}) {
        padding: 41.5px 16px;
        margin: 0;
    }
    .table-wrapper {
        width: 100%;
        height: fit-content;
        margin: -20px 0;
        overflow-y: auto;
    }
    table {
        width: 100%;
        border-spacing: 0 20px;
        border-collapse: separate;
        height: fit-content;

        .company-content-wrapper h3 {
            max-width: unset;
            @media screen and (max-width: 1300px) {
                max-width: 400px;
            }
            @media screen and (max-width: 1200px) {
                max-width: 350px;
            }
            @media screen and (max-width: 1100px) {
                max-width: 300px;
            }
            @media screen and (max-width: 1024px) {
                max-width: 200px;
            }
            @media screen and (max-width: 512px) {
                max-width: 160px;
            }
        }

        @media (${mediaScreen.maxMobile}) {
            border-spacing: 0 12px;
        }
    }

    th {
        padding: 20px 10px 0;
        ${mixinTypography.label.lMd.labelMdMedium};
        white-space: nowrap;
        line-height: 10px;
        height: 10px;

        @media (${mediaScreen.maxMobile}) {
            font-size: 12px;
        }

        :first-of-type {
            text-align: left;
            padding-left: 20px;

            @media (${mediaScreen.maxMobile}) {
                padding-left: 0;
                padding-right: 0;
                padding-top: 0;
            }
        }
        :last-of-type {
            text-align: right;
            padding-right: 7px;

            @media (${mediaScreen.maxMobile}) {
                padding-right: 0;
                padding-left: 0;
                padding-top: 0;
            }
        }
    }

    tbody tr {
        background-color: white;
        border-radius: 4px;
        ${template.boxShadowGrey};
    }

    .decision-wrapper {
        position: relative;

        .decision {
            display: none;
            position: absolute;
            top: -25px;
            left: 28px;

            svg {
                width: 26.8px;
                height: 26.8px;
            }

            @media (${mediaScreen.maxMobile}) {
                display: flex;
            }
        }
    }

    td {
        padding: 19px 10px;
        height: fit-content;
        border-top: ${template.borderGrey};
        border-bottom: ${template.borderGrey};
        position: relative;

        :first-of-type {
            max-width: 50%;
            border-left: ${template.borderGrey};
            border-radius: 4px 0 0 4px;

            padding: 19px;
            padding-right: 0;
        }
        :last-of-type {
            border-right: ${template.borderGrey};
            padding-right: 60px;
            border-radius: 0 4px 4px 0;
            padding-left: 0;

            @media screen and (max-width: 512px) {
                padding-right: 30px;
            }
        }
    }

    .review-decision-cell {
        svg {
            display: flex;
            margin: auto;
            width: 26px;
            height: 26px;
        }
    }

    label:has(input[type='checkbox']) {
        margin-left: auto;
        border: ${template.borderGrey};

        svg {
            margin-left: 3px;
            margin-right: 1px;
        }
    }

    label:has(input[type='checkbox']:checked) {
        border: none;
    }

    .pitch-checkbox {
        margin-left: auto;
    }

    @media (${mediaScreen.maxMobile}) {
        .hideMobile {
            display: none;
        }
    }
`;
