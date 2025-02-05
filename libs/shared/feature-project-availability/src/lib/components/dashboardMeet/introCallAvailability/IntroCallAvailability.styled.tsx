import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledIntroCallAvailability = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    background-color: ${colors.white};

    padding: 40px 30px 46px 40px;

    @media (max-width: 1024px) {
        padding: 20px;
    }

    .titles {
        display: flex;
        flex-direction: column;
        max-width: 912px;
        width: 100%;
        gap: 12px;
        margin-bottom: 20px;

        @media (max-width: 1024px) {
            gap: 8px;
        }

        & h3 {
            margin: 0;
            ${mixinTypography.display.dSm.displaySmMedium};

            @media (max-width: 1024px) {
                font-size: 18px;
                line-height: 24px;
            }
        }

        & p {
            margin: 0;
            ${mixinTypography.text.tMd.textMdMedium};
            color: ${colors.grey.grey700};
            white-space: pre-wrap;

            @media (max-width: 1024px) {
                font-size: 14px;
                line-height: 18px;
            }
        }
    }

    .sections {
        display: flex;
        gap: 8%;
        width: 100%;

        @media (max-width: 1120px) {
            gap: 20px;
        }

        @media (max-width: 1024px) {
            gap: 24px;
            flex-direction: column;
        }

        .section {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;

            &.left {
                display: flex;

                .dropdown.timezone {
                    padding-right: 16px;
                    border: 1px solid ${colors.grey.grey100};
                    border-radius: 4px;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);

                    .dropdown-input {
                        height: 38px;
                        color: ${colors.grey.grey900};

                        @media (max-width: 1024px) {
                            font-size: 14px;
                            line-height: 18px;
                        }
                    }

                    .chevron {
                        top: 20px;

                        path {
                            stroke: ${colors.grey.grey900};
                        }
                    }

                    .options.grouped {
                        top: 36px;
                        width: calc(100% + 2px);
                        border: 1px solid ${colors.grey.grey100};
                        border-radius: 4px;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
                        max-height: 244px;

                        .group-list .group-item {
                            display: flex;
                            align-items: center;
                            height: 48px;

                            &.selected {
                                background-color: transparent;
                                border: 1px solid ${colors.primary.primary500};
                            }
                        }
                    }
                }
            }
            &.right {
                max-width: 330px;
            }

            .block {
                display: flex;
                flex-direction: column;
                gap: 15px;

                & label.pill {
                    ${mixinTypography.text.tSmall.textSmallMedium};
                    font-size: 16px;
                    color: ${colors.grey.grey700};

                    &:hover {
                        color: ${colors.white};
                    }
                }
            }
        }
    }

    .buttons {
        display: flex;
        justify-content: flex-end;

        @media (max-width: 1024px) {
            justify-content: space-between;
        }

        & .left {
            display: flex;
            flex: 2;

            @media (max-width: 1024px) {
                display: none;
            }
        }
        & .right {
            display: flex;
            flex: 1;
            gap: 70px;
            margin-top: 20px;

            @media (max-width: 1024px) {
                gap: unset;
                justify-content: space-between;
            }

            & .back,
            & .submit {
                padding: 0 22px 0 36px;
                height: 48px;
                border-radius: 4px;
                border: none;

                @media (max-width: 1024px) {
                    min-width: 100px;
                }
            }

            & .back {
                svg {
                    transform: rotate(180deg);
                    margin-right: 4px;
                }

                @media (max-width: 1024px) {
                    padding: 0;
                    justify-content: flex-start;
                }
            }
            & .submit {
                svg {
                    margin-left: 4px;
                }

                @media (max-width: 1024px) {
                    padding: 0 20px 0 29px;
                    justify-content: flex-start;
                }
            }
        }
    }
`;
