import styled from '@emotion/styled';
import { arrowShortOrangeImage, colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInnerDatePicker = styled.div`
    cursor: pointer;

    > * {
        cursor: auto;
    }

    .react-datepicker__triangle {
        display: none !important;
    }

    .react-datepicker__input-container {
        input {
            width: 100%;
            border: none;
            outline: none;
            cursor: pointer;
            caret-color: transparent;

            ::placeholder {
                color: ${colors.mainPlaceholder};
            }
        }
    }

    .react-datepicker-popper {
        top: 100% !important;
        left: -1px !important;
        transform: none !important;
        padding: 0 !important;

        .react-datepicker {
            border-radius: 0 !important;
            border: 1px solid ${colors.mainBlack};

            .react-datepicker__current-month {
                text-align: left;
                font-family: ${fonts.default};
                font-size: 24px;
                font-weight: 450;
                letter-spacing: 0.015em;
                padding-bottom: 20px;
            }

            .react-datepicker__header {
                padding-top: 0;
                background-color: transparent;
                border: none;
            }

            .react-datepicker__month-container {
                padding: 40px;
            }

            .react-datepicker__day-name,
            .react-datepicker__day,
            .react-datepicker__time-name {
                width: 34px;
                height: 34px;
                margin: 0;
                font-family: ${fonts.accent};
                font-size: 12px;
                line-height: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                letter-spacing: 0.05em;
            }

            .react-datepicker__month {
                margin: 0 -8px -8px;
                display: flex;
                flex-direction: column;
                gap: 7px;
            }

            .react-datepicker__day-name {
                text-transform: uppercase;
            }

            .react-datepicker__day-names {
                margin: 0 -8px 0;
            }

            .react-datepicker__day-names,
            .react-datepicker__week {
                display: flex;
                gap: 13px;
            }

            .react-datepicker__day--today {
                border: 1px solid ${colors.mainOrange};
                background-color: transparent;
                color: ${colors.mainBlack};
                font-weight: normal;

                :hover {
                    background-color: #f0f0f0;
                }
            }

            .react-datepicker__day--keyboard-selected,
            .react-datepicker__month-text--keyboard-selected,
            .react-datepicker__quarter-text--keyboard-selected,
            .react-datepicker__year-text--keyboard-selected {
                background-color: transparent;
                color: ${colors.mainBlack};
            }

            .react-datepicker__day--selected {
                background-color: ${colors.mainOrange};
                color: ${colors.mainWhite};

                :hover {
                    background-color: ${colors.mainOrange};
                }
            }

            .react-datepicker__navigation--previous,
            .react-datepicker__navigation--next {
                background-image: url(${arrowShortOrangeImage});
                background-size: cover;
                border: none;
                top: 37px;
                display: block !important;

                span {
                    display: none;
                }
            }

            .react-datepicker__navigation--previous {
                transform: rotate(90deg);
                right: 72px;
                left: auto;
            }

            .react-datepicker__navigation--next {
                transform: rotate(-90deg);
                right: 36px;
            }

            .react-datepicker__day--outside-month {
                opacity: 0;
                pointer-events: none;
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .react-datepicker-popper {
            .react-datepicker {
                .react-datepicker__month-container {
                    padding: 20px;
                }

                .react-datepicker__navigation--previous,
                .react-datepicker__navigation--next {
                    top: 17px;
                }

                .react-datepicker__navigation--previous {
                    right: 52px;
                }

                .react-datepicker__navigation--next {
                    right: 16px;
                }

                .react-datepicker__day-names,
                .react-datepicker__week {
                    gap: 6px;
                }
            }
        }
    }
`;
