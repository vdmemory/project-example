import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledCalendar = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        display: flex;
        align-items: center;
        padding: 0 73px 0 75px;
        font-size: 24px;
        line-height: 29px;
        height: 60px;
        margin: 0;
        background-color: ${colors.beige};
        font-weight: 400;
    }

    .days {
        width: 451px;
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid ${colors.black};

        .day {
            border: none;
            padding: 5px;
            width: 25%;
            min-height: 112px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 6px;
            background-color: ${colors.white};
            cursor: pointer;
            border-right: 1px solid ${colors.black};
            border-bottom: 1px solid ${colors.black};

            &:nth-of-type(4n) {
                border-right: none;
            }

            &:hover {
                background-color: ${colors.secondary.secondary100};
            }

            &:disabled {
                cursor: not-allowed;

                .day-name {
                    color: ${colors.grey.grey300};
                }

                .day-number {
                    color: ${colors.grey.grey300};
                }
            }

            .day-name {
                font-size: 12px;
                font-family: 'SuisseIntlMono';
                line-height: 16px;
                text-transform: uppercase;
                color: ${colors.grey.grey900};
            }

            .day-number {
                font-size: 24px;
                line-height: 29px;
                width: 42px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 6px;
                color: ${colors.grey.grey900};
            }
        }

        .day.selected {
            &:disabled .day-number {
                color: ${colors.grey.grey300};
            }

            .day-number {
                transition: background 0.2s ease-in-out;
                background-color: ${colors.primary.primary100};
                border-radius: 50%;
                width: 42px;
                height: 42px;
                border: 1px solid ${colors.primary.primary100};
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 6px;
                color: ${colors.grey.grey900};
            }
        }

        .day.selected.marked .day-number {
            background-color: ${colors.primary.primary500};
            border: 1px solid ${colors.primary.primary500};
            color: ${colors.white};
        }

        .day.blocked,
        .day.not-selected,
        .day.weekend {
            background: repeating-linear-gradient(
                -45deg,
                ${colors.grey.grey50} 0px,
                ${colors.grey.grey50} 1px,
                ${colors.beige} 1px,
                ${colors.beige} 6px
            );

            .day-number,
            .day-name {
                color: ${colors.grey.grey200};
            }
        }

        .day.weekend,
        .day.selected.not-active,
        .day.not-selected,
        .day:disabled {
            cursor: not-allowed;
        }

        .day.selected.marked.not-active {
            cursor: pointer;
        }

        .day.previous,
        .day.next {
            background-color: ${colors.beige};
        }

        .day.previous {
            svg {
                transform: rotate(180deg);
                transition: transform 0.2s ease-in-out;
            }
            &:hover svg {
                transform: rotate(180deg) translateX(7px);
            }
        }

        .day.next {
            svg {
                transition: transform 0.2s ease-in-out;
            }
            &:hover svg {
                transform: translateX(7px);
            }
        }
    }
`;
