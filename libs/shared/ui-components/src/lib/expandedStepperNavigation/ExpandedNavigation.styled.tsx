import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { mixinTypography } from '@breef/ui-kit';

export const StyledExpandedNavigation = styled.nav`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    .expanded-navigation-title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        width: 30%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        @media (${mediaScreen.tablet}) {
            display: none;
        }

        h1 {
            display: block;
            margin: 0;

            ${mixinTypography.text.tXl.textXlMedium};
            text-transform: unset;

            width: fit-content;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: bolder;
            span {
                padding: 15px;
            }

            @media (${mediaScreen.tablet}) {
                font-size: 18px;
                font-weight: 450;
                line-height: 120%;
                letter-spacing: 0.002em;
                min-width: 400px;
            }

            @media (max-width: 660px) {
                min-width: 300px;
            }
            @media (max-width: 514px) {
                min-width: 180px;
            }
            @media (max-width: 430px) {
                min-width: 130px;
            }
        }
        > svg {
            min-width: 38px;
            margin-left: 15px;
        }
        @media (${mediaScreen.mobile}) {
            > svg {
                margin-top: -4px;
                margin-left: 0;
            }
        }
    }

    .panel-navigation {
        height: 100%;
        display: flex;

        .right-section-wrapper {
            display: flex;
            align-items: center;
        }

        .wrapper {
            display: flex;
            align-items: center;
            gap: 30px;
            padding: 0 30px;

            .btn-group {
                display: flex;
                gap: 30px;

                .only-icon {
                    padding: 0;
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
    }

    @media screen and (${mediaScreen.tablet}) {
        h1 {
            font-size: 18px;
            line-height: 120%;
        }
    }

    .link {
        display: flex;
        padding: 0 14px;
        gap: 6px;

        button {
            font-size: 12px;
            font-family: 'SuisseIntlMono';
            min-width: auto;
            padding: 0;

            .label {
                text-decoration: underline;
            }
        }
    }
`;
