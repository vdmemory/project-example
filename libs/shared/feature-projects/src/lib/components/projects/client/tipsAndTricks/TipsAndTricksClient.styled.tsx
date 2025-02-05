import styled from '@emotion/styled';
import { colors as colorsUiKit, mixinTypography } from '@breef/ui-kit';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';

export const StyledTipsAndTricksClient = styled.div`
    display: flex;
    justify-content: center;
    border-top: 1px solid ${colors.mainBlack};
    border-bottom: 1px solid ${colors.mainBlack};
    overflow: visible;

    @media (${mediaScreen.tablet}) {
        flex-direction: column-reverse;
    }

    .scrollbar {
        .content {
            &-item {
                width: 300px;
                margin-right: 30px;
                border: 1px solid ${colorsUiKit.grey.grey900};
                text-decoration: none;
                background-color: ${colors.mainWhite};

                .tip-content-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 19px 16px;
                    > span {
                        ${mixinTypography.label.lS.labelSMedium};
                        color: ${colorsUiKit.grey.grey600};
                    }
                    > p {
                        margin: 0;
                        white-space: break-spaces;
                        ${mixinTypography.text.tMd.textMdMedium};
                        color: ${colors.mainBlack};
                    }
                }

                :hover {
                    p {
                        cursor: pointer;
                        color: #6c3010;
                    }
                    .content-image img {
                        scale: 1.1;
                    }
                }
            }
            &-image {
                position: relative;
                overflow: hidden;
                padding-bottom: 215px;

                > img {
                    border: 0;
                    max-width: 100%;
                    vertical-align: middle;
                    display: inline-block;
                    transition: all 300ms ease;

                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .tips {
        &-scroll {
            min-width: 860px;
            max-width: 100%;
            width: 100%;
            > div {
                outline: none;
                padding: 60px 0;
                @media (${mediaScreen.tablet}) {
                    padding: 0 0 40px;
                }
            }
            @media (max-width: 1280px) {
                min-width: 560px;
            }
            @media (${mediaScreen.tablet}) {
                min-width: calc(100% + 15px);
                max-width: 100%;
            }
        }
        &-sidebar {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 350px;
            max-width: 422px;
            width: 100%;
            border-left: 1px solid ${colors.mainBlack};
            padding: 40px;
            @media (${mediaScreen.tablet}) {
                border-left: unset;
                max-width: 100%;
                flex-direction: row;
                padding: 30px 0;
                align-items: center;
                min-width: 100%;
                justify-content: space-between;
            }
            &--title {
                max-width: 274px;
                font-weight: 400;
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                color: ${colors.mainBlack};
                margin: 0 0 12px;
                @media (${mediaScreen.tablet}) {
                    font-weight: 400;
                    font-size: 32px;
                    line-height: 110%;
                    max-width: fit-content;
                    margin: 0;
                }
            }
            > .tips-sidebar-label {
                color: ${colorsUiKit.grey.grey700};
                font-family: ${fonts.accent};
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                letter-spacing: 0.05em;
                margin-bottom: 12px;
                @media (${mediaScreen.tablet}) {
                    display: none;
                }
            }
            > .tips-sidebar-note {
                ${mixinTypography.text.tLg.textLgMedium};
                color: ${colorsUiKit.grey.grey700};
                margin-bottom: 32px;
                @media (${mediaScreen.tablet}) {
                    display: none;
                }
            }
        }
    }
`;
