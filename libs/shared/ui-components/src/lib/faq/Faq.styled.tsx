import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledFaq = styled.div`
    background: ${colors.mainPurple};
    padding: 0 75px 75px;

    .faq {
        &-navigate {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            padding: 75px 0;
            z-index: 1;
            background: ${colors.mainPurple};

            > ul {
                margin: 0;
                padding: 0;
                display: flex;
                list-style: none;
                justify-content: space-between;

                > li {
                    font-weight: 450;
                    font-size: 32px;
                    line-height: 110%;
                    letter-spacing: 0.002em;
                    text-transform: uppercase;

                    > a {
                        text-decoration: none;
                        color: ${colors.mainGray};
                        transition: color 0.5s easy;
                    }

                    &.active-tab {
                        > a {
                            color: ${colors.mainBlack};
                            transition: color 0.5s easy;
                        }
                    }
                }
            }
        }
        &-answer {
            position: relative;
            .anchor {
                position: relative;
                top: -200px;
            }
            margin-bottom: 79px;
            &-list {
                > div {
                    border-top: 1px solid ${colors.mainBlack};
                    padding: 35px 55px;
                    &:last-of-type {
                        border-bottom: 1px solid ${colors.mainBlack};
                    }

                    .answer-text-wrapper--open {
                        margin-top: 15px;
                        margin-bottom: 0;
                        max-width: 822px;
                        cursor: default;

                        > p {
                            margin-top: 0;
                            margin-bottom: 40px;
                            line-height: 160%;
                            &:last-of-type {
                                margin-bottom: 30px;
                            }

                            > a {
                                color: ${colors.mainOrange};
                                text-decoration: none;
                                &:hover {
                                    cursor: pointer;
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    > div {
        > h2 {
            font-weight: 450;
            font-size: 48px;
            line-height: 110%;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            margin: 0 0 40px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 0 20px 20px;

        .faq {
            &-navigate {
                top: 0;
                padding: 0;
                margin-right: -20px;

                > ul {
                    padding: 30px 20px 30px 0;
                    overflow-y: scroll;
                    gap: 15px;
                    -ms-overflow-style: none;
                    scrollbar-width: none;

                    ::-webkit-scrollbar {
                        display: none;
                    }

                    > li {
                        font-size: 18px !important;
                    }
                }
            }

            &-answer {
                margin-bottom: 40px;

                .anchor {
                    top: -150px;
                }

                &-list {
                    > div {
                        min-height: auto;
                        padding: 20px 10px;
                    }
                }
            }
        }

        > div {
            > h2 {
                font-size: 32px;
                margin: 0 0 20px;
            }
        }
    }
`;
