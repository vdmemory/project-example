import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

interface StyledLoaderWrapperProps {
    isMobile?: boolean;
}

export const StyledPaymentChoice = styled.section<StyledLoaderWrapperProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.white};

    .content-wrapper {
        display: flex;
        flex: 1;

        @media (${mediaScreen.laptop}) {
            flex-direction: column;
        }

        .left-section {
            display: flex;
            justify-content: center;
            width: 50%;
            padding: 40px 15px 50px;
            background-color: ${colors.beige};

            @media (${mediaScreen.laptop}) {
                padding: 24px 16px 46px;
                width: 100%;
            }

            ${props => props.isMobile && `display: none;`}
        }

        .right-section {
            display: flex;
            width: 50%;
            border-left: 1px solid ${colors.grey.grey900};
            flex-direction: column;
            padding: 40px 0 0;

            @media (${mediaScreen.laptop}) {
                width: 100%;
                border-left: none;
            }

            @media (${mediaScreen.maxMobile}) {
                padding: 24px 0 0;
                border-top: 1px solid ${colors.grey.grey900};
                border-left: none;

                ${props =>
                    props.isMobile &&
                    `border-top: none;
                padding: 0;
                flex: 1;`}
            }
        }
    }
`;

export const StyledPayment = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    color: ${colors.grey.grey900};

    h3,
    .section {
        padding: 0 15px;
    }

    .section {
        max-width: 496px;
        width: 100%;
    }

    .f-end {
        flex: 1;
        justify-content: flex-end;
    }

    .f-start {
        flex: 1;
        justify-content: flex-start;
    }

    .checkbox-section {
        padding-left: 40px;
    }

    .section-status-request {
        padding: 133px 0 0;
        max-width: 340px;

        @media screen and (${mediaScreen.tablet}) {
            padding: 0;
        }

        .body-text {
            padding: 0;
        }
    }

    button.medium {
        border-top: 1px solid ${colors.grey.grey900};
        margin: auto 0 0;

        svg {
            height: 26px;
            transform: rotate(180deg);
        }

        .arrow-left {
            right: calc(100% + 0px);
        }

        @media (${mediaScreen.maxMobile}) {
            height: 52px;
            ${mixinTypography.mobile.text.mobileTextMd}
        }
    }

    p.title {
        display: flex;
        ${mixinTypography.display.dSm.displaySmMedium};
        color: ${colors.grey.grey900};
        margin: 0 0 24px;
        max-width: 496px;
        width: 100%;
        padding: 0 15px;
        gap: 15px;

        svg {
            height: 32px;
            width: 32px;
            margin: 0;
        }

        :hover {
            text-decoration: none;
        }
    }

    h3.title {
        ${mixinTypography.display.dSm.displaySmMedium}
        margin: 0 0 12px;
        width: 100%;
        max-width: 496px;

        @media (${mediaScreen.maxMobile}) {
            display: none;
        }
    }

    .group-icon {
        display: flex;
        gap: 8px;
    }

    .list,
    .form,
    .stub-preview,
    .summery,
    .wire-section,
    .breef-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }
    .form {
        width: -webkit-fill-available;
    }
    .wire-section .title-section {
        height: 260px;
        @media (max-width: 1024px) {
            height: auto;
        }
    }
    .wire-section,
    .breef-section {
        width: 100%;
    }
    .breef-section .title-section {
        height: 320px;
        @media screen and (${mediaScreen.tablet}) {
            height: auto;
        }
    }

    .list,
    .summery {
        > button {
            border-top: 1px solid black;
            @media (max-width: 1024px) {
                text-transform: capitalize;
                font-size: 24px;
            }
        }
    }
`;
