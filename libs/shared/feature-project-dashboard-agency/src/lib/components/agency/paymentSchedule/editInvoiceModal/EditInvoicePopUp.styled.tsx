import styled from '@emotion/styled';
import { colors, mediaScreen, fonts } from '@breef/shared/assets/variables';

export const StyledEditInvoicePopUp = styled.div`
    width: 990px;

    @media (${mediaScreen.laptop}) {
        width: 100%;
    }

    .modal-header {
        background: ${colors.mainPurple};
        font-weight: 450;
        font-size: 48px;
        line-height: 110%;
        letter-spacing: 0.002em;
        text-transform: uppercase;
        padding: 49px 69px;
        border-bottom: 1px solid ${colors.mainBlack};

        @media (${mediaScreen.tablet}) {
            font-weight: 450;
            font-size: 32px;
            line-height: 110%;
            letter-spacing: 0.002em;
            padding: 20px 60px 20px 20px;
        }
    }
    .modal-body {
        position: relative;
        padding: 21px 71px;

        > svg {
            position: absolute;
            bottom: 24px;
            right: 72px;
            &:hover {
                cursor: pointer;
            }
            > path {
                fill: ${colors.mainBlack};

                &: last-of-type {
                    stroke: unset;
                }
            }
        }

        &-label {
            font-family: ${fonts.accent};
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            margin: 0 0 10px;
        }

        > div {
            position: relative;
            font-weight: 450;
            font-size: 32px;
            line-height: 110%;
            letter-spacing: 0.002em;
            text-transform: uppercase;

            [class*='react-datepicker__month-container'] {
                position: absolute;
                top: -6px;
                left: -39px;
                background: inherit;
                border: 1px solid ${colors.mainBlack};
                z-index: 9999999;

                @media (${mediaScreen.tablet}) {
                    padding: 21.5px !important;
                    left: -22px;
                }
            }
            [class*='react-datepicker-popper'] {
                .react-datepicker {
                    .react-datepicker__navigation--next {
                        right: -319px;
                        z-index: 999999999;
                    }
                    .react-datepicker__navigation--previous {
                        right: -280px;
                        z-index: 9999999999;
                    }

                    @media (${mediaScreen.tablet}) {
                        .react-datepicker__navigation--next {
                            right: -270px;
                            top: 17px;
                        }
                        .react-datepicker__navigation--previous {
                            right: -240px;
                            top: 17px;
                        }
                    }
                }
            }
        }

        &-disabled {
            [class*='react-datepicker__month-container'] {
                .react-datepicker__month {
                    .react-datepicker__week {
                        .react-datepicker__day--today {
                            &:hover {
                                background: transparent;
                            }
                        }
                    }
                }
            }
        }
        @media (${mediaScreen.tablet}) {
            padding: 21px;
        }
    }
    .modal-btn {
        height: 80px;
        font-weight: 450;
        font-size: 24px;
        line-height: 120%;
        letter-spacing: 0.015em;
        border-top: 1px solid ${colors.mainBlack};
        z-index: 0;
    }
`;
