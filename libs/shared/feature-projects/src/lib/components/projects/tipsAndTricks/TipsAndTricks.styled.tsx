import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';

export const StyledTipsAndTricks = styled.div`
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
                text-decoration: none;

                @media (${mediaScreen.tablet}) {
                    width: 300px;
                }
                > p {
                    margin: 0;
                    white-space: break-spaces;
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 160%;
                    letter-spacing: 0.002em;
                    color: ${colors.mainBlack};
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
                margin-bottom: 15px;

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
                padding: 54px 0 80px;
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
            justify-content: space-between;
            min-width: 350px;
            max-width: 480px;
            width: 100%;
            border-left: 1px solid ${colors.mainBlack};
            padding: 50px 0 50px 45px;
            @media (${mediaScreen.tablet}) {
                border-left: unset;
                max-width: 100%;
                flex-direction: row;
                padding: 30px 0;
                align-items: center;
                min-width: 100%;
            }
            &--title {
                max-width: 274px;
                font-weight: 400;
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                color: ${colors.mainBlack};
                margin: 0;
                @media (${mediaScreen.tablet}) {
                    font-weight: 400;
                    font-size: 32px;
                    line-height: 110%;
                    max-width: fit-content;
                }
            }
            > a {
                position: relative;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                letter-spacing: 0.05em;
                text-decoration-line: underline;
                text-transform: uppercase;
                font-family: ${fonts.accent};
                color: ${colors.mainOrange};
                z-index: 9;
                @media (${mediaScreen.tablet}) {
                    white-space: pre-wrap;
                    min-width: 30%;
                    text-align: right;
                }
            }
            &--icon {
                position: absolute;
                top: -41px;
                right: -75px;
                pointer-events: none;
                @media (${mediaScreen.tablet}) {
                    display: none;
                }
            }
        }
    }
`;
