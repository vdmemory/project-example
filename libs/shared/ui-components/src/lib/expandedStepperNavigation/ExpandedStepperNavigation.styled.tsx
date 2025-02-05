import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css, keyframes } from '@emotion/react';

interface StyledNavigationProps {
    isFieldError: boolean;
    isReadOnlyInput: boolean;
}

const backgroundPulse = keyframes`
    0% {
        background-color: transparent;
    }
    50% {
        background-color: rgb(255, 222, 181);
    }
`;

export const StyledExpandedStepperNavigation = styled.nav`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    z-index: 11 !important;
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    .expanded-navigation-title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        width: 300px;
        @media (${mediaScreen.tablet}) {
            width: 175px;
        }
        @media (${mediaScreen.mobile}) {
            width: 122px;
        }
        h1 {
            display: block;
            margin: 0;
            font-size: 24px;
            line-height: 28px;
            text-transform: uppercase;
            font-weight: 400;
            width: fit-content;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            span {
                padding: 15px;
            }

            @media (${mediaScreen.tablet}) {
                font-size: 18px;
                font-weight: 450;
                line-height: 120%;
                letter-spacing: 0.002em;
            }
        }
        > svg {
            min-width: 38px;
            margin-left: 15px;
        }
        &-estimation {
            font-weight: 450;
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0.01em;
            color: ${colors.mainOrange};
            margin-left: 15px;
        }
        @media (${mediaScreen.mobile}) {
            > svg {
                margin-top: -4px;
                margin-left: 0;
            }
        }
    }

    .icon-info {
        margin-bottom: 2px;
        &:hover {
            cursor: pointer;
        }
    }

    input.title-project {
        margin: 0;
        font-size: 24px;
        line-height: 28px;
        text-transform: uppercase;
        text-align: center;
        font-weight: 400;
        border: none;
        // max-width: 600px;
        max-width: 405px;
        width: ${({ isReadOnlyInput }: StyledNavigationProps) =>
            isReadOnlyInput ? 'auto' : '100%'};
        ${({ isFieldError }: StyledNavigationProps) =>
            isFieldError &&
            css`
                animation: ${backgroundPulse} 1.5s ease infinite;
            `}

        overflow: hidden;
        text-overflow: ellipsis;

        :focus-visible {
            outline: none;
        }
        ::placeholder {
            opacity: 0.5;
        }
        @media (${mediaScreen.tablet}) {
            font-size: 18px;
            line-height: 120%;
            text-align: initial;
            width: 100%;
        }
    }

    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        font-size: 24px;
        line-height: 28px;
        text-transform: uppercase;
        font-weight: 400;
        width: 100%;
        text-align: center;
        span {
            padding: 15px;
        }
    }
    .panel-navigation {
        height: 100%;
        display: flex;

        .small-accent {
            border-right: none;
            border-left: none;
            min-width: 155px;
            padding: 0;
            font-family: ${fonts.accent};
            font-size: 12px;
        }
        .mobile-action-button {
            width: 60px;
            min-width: 60px;
            border-left: 1px solid ${colors.mainBlack};
            svg {
                transform: rotate(0);
            }
        }
        .mobile-button-only-icon {
            border-left: 1px solid ${colors.mainBlack};
            .main-content > svg {
                margin-left: 0 !important;
            }
        }

        .btn-group {
            display: flex;
            border-left: 1px solid black;
            border-right: 1px solid black;
            padding: 0 15px 0 14px;

            &-only-icons {
                border-right: none;
            }

            .only-icon {
                padding: 0 15px;
                width: 38px;
                box-sizing: content-box;

                :hover svg#profile {
                    circle,
                    path {
                        stroke: ${colors.mainOrange};
                        transition: all 300ms ease;
                    }
                }
                :hover svg#chat {
                    circle#edit,
                    path#edit {
                        fill: ${colors.mainOrange};
                        transition: all 300ms ease;
                    }
                }
                :hover svg#phone {
                    path#edit {
                        stroke: ${colors.mainOrange};
                        transition: all 300ms ease;
                    }
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        h1 {
            font-size: 18px;
            line-height: 120%;
        }
    }

    .link button {
        font-size: 12px;
        font-family: 'SuisseIntlMono';
        padding: 0 14px;
        min-width: auto;

        .label {
            text-decoration: underline;
        }
    }
`;
