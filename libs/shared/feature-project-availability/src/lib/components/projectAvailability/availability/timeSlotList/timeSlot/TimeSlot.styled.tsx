import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const getSimpleAnimation = (duration: number) => css`
    ${simpleAnimation}
    animation-duration: ${duration}s;
`;

export const StyledTimeSlot = styled.div`
    display: flex;
    min-height: 140px;
    border-bottom: 1px solid ${colors.black};
    width: 100%;
    transition: all 0.1s ease-in-out;

    .day {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 40px;
        flex: 1;
        width: 25%;
        border-right: 1px solid ${colors.black};
        min-width: 200px;

        .day-name {
            font-size: 14px;
            line-height: 19px;
            color: ${colors.black};
        }
        .day-number {
            font-size: 32px;
            line-height: 35px;
            color: ${colors.black};
        }
    }

    .group {
        display: flex;
        justify-content: space-between;
        width: 75%;
    }

    .time-slots {
        padding: 40px 40px 26px;
        display: flex;
        flex-direction: column;

        .time-slot {
            display: flex;
            align-items: flex-start;
            gap: 22px;
            margin-bottom: 10px;

            &.error {
                margin-bottom: 30px;
            }

            &:last-child {
                margin-bottom: 10px;
            }

            .text {
                font-size: 18px;
                line-height: 24px;
                word-break: normal;
            }
        }
    }

    .add,
    .time-slot .delete {
        border: none;
        background: none;
        border-radius: 50%;
        margin: 15px 0;
        cursor: pointer;

        @media (${mediaScreen.maxMobile}) {
            padding-left: 3px;
            width: 30px;
        }

        &:hover svg {
            path,
            circle {
                stroke: ${colors.primary.primary500};
            }
        }
    }

    .add {
        display: flex;
        align-items: flex-start;
        margin: 55px 0;
        padding: 0;
        margin-right: 10%;
        height: 25px;
    }

    .dropdown {
        max-width: 230px;
        min-width: 180px;

        input.dropdown-input {
            background: ${colors.white};
            border-radius: 0;

            @media (${mediaScreen.maxMobile}) {
                padding: 10px 25px 10px 10px;
                font-size: 22px;
                line-height: 26px;
            }
        }

        .chevron {
            right: 6px;
        }

        .error {
            position: absolute;
            white-space: pre;
        }
    }
`;
