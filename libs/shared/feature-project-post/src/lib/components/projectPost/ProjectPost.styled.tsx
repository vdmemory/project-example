import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import { backgroundProjectCheckout, fonts } from '@breef/shared/assets';

interface StyledProjectPostProps {
    hideRightSection?: boolean;
}

export const StyledProjectPost = styled.section<StyledProjectPostProps>`
    display: flex;
    flex-direction: column;
    flex: 1;

    .header-nav {
        height: 104px;
        border-top: none;
        border-bottom: none;
        width: 50%;

        @media (${mediaScreen.mobile}) {
            height: 74px;
            width: 100%;
        }

        .link-logo svg {
            width: 85px;
            height: 31px;

            @media (${mediaScreen.mobile}) {
                width: 74px;
            }
        }

        & button {
            padding: 10px 19px;
            min-width: auto;
        }
    }

    .terms-conditions {
        display: flex;
        align-items: center;
        margin-right: auto;
        height: fit-content;
        margin-top: 16px;
        justify-content: center;
        text-align: center;

        @media (${mediaScreen.mobile}) {
            margin-top: 28px;
        }

        label {
            padding: 0;
        }
        span {
            font-size: 14px;
            line-height: 16px;
            color: #68737d;
        }
        a {
            color: ${colors.primary.primary500};
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .content-wrapper {
        display: flex;
        flex: 1;

        @media (${mediaScreen.mobile}) {
            flex-direction: column;
        }

        .left-section {
            display: flex;
            width: 50%;
            flex-direction: column;
            background-color: ${colors.beige};
            background-size: cover;
            background-position: left;
            align-items: flex-end;
            padding: 33px 0 40px;

            button.medium.to-form {
                margin-top: 32px;
                ${mixinTypography.text.tLg.textLgMedium};
                border-radius: 4px;
                width: 100%;
            }

            @media (${mediaScreen.mobile}) {
                width: 100%;
                border-bottom: none;
                padding: 24px 16px 24px;
                align-items: center;

                ${({ hideRightSection }) =>
                    hideRightSection &&
                    css`
                        border-bottom: none;
                        margin-bottom: 0;
                        flex: 1;
                        padding: 20px 16px;
                    `};
            }
        }

        .right-section {
            display: flex;
            width: 50%;
            border-left: none;
            flex-direction: column;

            background-color: ${colors.white};

            @media (${mediaScreen.mobile}) {
                flex: 1;
                width: 100%;
                border-left: none;
                align-items: center;

                ${({ hideRightSection }) =>
                    hideRightSection &&
                    css`
                        display: none;
                    `};
            }
        }
    }
`;

const titleStyles = css`
    ${mixinTypography.display.dMd.displayMdMedium};
    font-size: 26px;
    line-height: 30px;
    width: 100%;
    margin: 0;

    @media (${mediaScreen.mobile}) {
        font-size: 22px;
        line-height: 25px;
    }
`;

export const StyledPayment = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    color: ${colors.grey.grey900};
    padding: 33px 72px;

    @media (${mediaScreen.mobile}) {
        padding: 20px 16px;
        width: 100%;
        max-width: 700px;
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;

        .form-card {
            align-items: flex-start;

            .section .label {
                color: #2f3941;
                font-weight: 400;
                margin: 0 0 8px;
            }

            .section .wrapper {
                border: 1px solid #d8dcde;
                border-radius: 0;
                height: 48px;
                padding: 16px 12px;
            }

            .section .content-section {
                gap: 0;

                @media (${mediaScreen.mobile}) {
                    gap: 20px;
                }
            }
            .switch {
                & .wrapper .toggle,
                & .wrapper .toggle:before {
                    border: none;
                }

                & .wrapper .toggle {
                    width: 40px;
                    height: 20px;

                    background-color: #bdbdc1;
                }

                & .wrapper .toggle:before {
                    width: 12px;
                    height: 12px;

                    background-color: #fff;
                    left: 4px;

                    :hover {
                        transform: scale(1.1);
                    }
                }

                & .wrapper .input:checked + .toggle {
                    background: #da6c37;
                }

                & .wrapper .input:checked + .toggle:before {
                    left: 23px;
                }

                & .label {
                    white-space: pre-wrap;
                    font-size: 14px;
                    line-height: 16px;
                }
            }
        }
    }

    .form-add-header,
    .list-container {
        & .title {
            ${titleStyles};
        }

        & .divider {
            width: 100%;
            height: 1px;
            background-color: #e0dedb;
            margin: 16px 0 40px;

            @media (${mediaScreen.mobile}) {
                height: 0;
                margin: 16px 0 12px;
            }
        }
    }

    .form-add-header {
        display: flex;
        flex-direction: column;
        width: 100%;

        .group {
            display: flex;

            > svg {
                min-width: 32px;
                min-height: 32px;
                margin-right: 15px;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        @media (${mediaScreen.mobile}) {
            margin-top: 10px;
        }
    }

    .section.default-card {
        padding-bottom: 15px;
        margin-bottom: 0;
    }

    .default-card-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    @media (${mediaScreen.mobile}) {
        .section.accounts-list {
            padding-bottom: 15px;
        }
    }

    .section {
        flex: 1;

        .account-list {
            flex: 0;
        }
    }

    .default-group {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;

        @media (${mediaScreen.mobile}) {
            padding: 0;
        }

        .label-section {
            font-family: 'NeueHaasDisplay';
            font-size: 14px;
            color: #2f3941;
            font-weight: 400;
            margin: 0 0 8px;
            text-transform: capitalize;
        }

        .billing-detail-wrapper,
        .account-item {
            border-radius: 0;
            border-width: 1px;
            border-color: #d8dcde;
            transition: border-color 0.3s;

            &:hover {
                border-color: #a0a4a6;
            }
        }
    }

    .list-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        align-items: flex-start;

        .label-section {
            font-family: 'NeueHaasDisplay';
            font-size: 14px;
            color: #2f3941;
            font-weight: 400;
            margin: 0 0 8px;
            text-transform: capitalize;
        }

        @media (${mediaScreen.mobile}) {
            padding: 0;
        }

        .section {
            width: 100%;

            @media (${mediaScreen.mobile}) {
                margin-bottom: 0;
            }

            .account-list .list-inner {
                max-height: 380px;
            }

            .button-add {
                padding: 20px 0 5px;
                font-family: 'NeueHaasDisplay';
                font-size: 18px;
                text-transform: capitalize;

                svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
            }

            .account-item {
                border-radius: 0;
                border-width: 1px;
                border-color: #d8dcde;
                transition: border-color 0.3s;

                &:hover {
                    border-color: #a0a4a6;
                }
            }
        }

        .f-end {
            flex: 1;
            justify-content: flex-end;
        }

        .f-start {
            flex: 1;
            justify-content: flex-start;
        }
    }

    .section-status-request button.button,
    .default-card button.medium,
    .list-container button.medium,
    .form-wrapper .form-card button.medium,
    .form-wrapper .form-card button.submit {
        height: 48px;
        min-height: 48px;
        margin-top: 76px;
        border-radius: 0;
        border: 1px solid ${colors.grey.grey900};
        font-weight: 400;
        font-family: ${fonts.accent};
        font-size: 14px;
        line-height: 20px;
        background-color: #d96e34;
        letter-spacing: 1px;

        @media (${mediaScreen.mobile}) {
            margin-top: 28px;
        }

        &.edit {
            margin-top: 55px;

            @media (${mediaScreen.mobile}) {
                margin-top: 16px;
            }
        }

        .label {
            text-transform: uppercase;
        }

        &:hover {
            background-color: #e69d79;
        }

        &:active {
            background-color: #e69d79;
        }

        @media (${mediaScreen.mobile}) {
            &:active {
                background-color: #e69d79;
            }

            &:hover {
                background-color: #d96e34;
            }
        }

        svg {
            height: 26px;
            transform: rotate(180deg);
        }
        .arrow-left {
            right: calc(100% + 0px);
        }
    }

    .section-status-request button.button {
        margin-top: 30px;
    }

    .list-container button.medium {
        margin-top: 45px;

        @media (${mediaScreen.mobile}) {
            margin-top: 16px;
        }
    }
`;
