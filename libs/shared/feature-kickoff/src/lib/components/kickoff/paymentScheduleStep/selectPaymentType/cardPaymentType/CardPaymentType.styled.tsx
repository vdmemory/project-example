import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledCardPaymentTypeProps {
    isSelected: boolean;
}

export const StyledCardPaymentType = styled.label`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: 1px solid ${colors.mainBlack};
    text-align: center;
    padding: 20px 40px;
    transition: background-color 200ms ease;

    > * {
        font-weight: 450;
        letter-spacing: 0.002em;
        transition: all 200ms ease;
        max-width: 300px;
    }

    > h2 {
        font-size: 32px;
        line-height: 35px;
        text-transform: uppercase;
        margin: 0 0 8px;
        white-space: pre-wrap;
    }

    > span {
        font-size: 18px;
        line-height: 29px;
        max-width: 300px;
    }

    .check-icon {
        opacity: 0;
        height: 0;
    }

    ${({ isSelected }: StyledCardPaymentTypeProps) =>
        isSelected &&
        css`
            background-color: ${colors.darkPurple};
            color: ${colors.mainOrange};
            .check-icon {
                margin-top: 17px;
                opacity: 1;
                height: 42px;
                width: auto;
            }
        `}

    @media screen and (${mediaScreen.tablet}) {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 30px 15px;
        text-align: left;

        > h2 {
            margin-top: 3px;
            margin-bottom: 0;
            margin-right: 10px;
            min-width: 168px;
            font-size: 24px;
            line-height: 22px;
            letter-spacing: 0.015em;
        }

        > span {
            font-size: 18px;
            line-height: 120%;
            letter-spacing: 0.002em;
            min-width: calc(100vw - 30px - 10px - 168px);
        }

        .check-icon {
            margin-top: 0;
            width: 0;
            display: flex;
            align-self: center;
            ${({ isSelected }: StyledCardPaymentTypeProps) =>
                isSelected &&
                css`
                    width: 40px;
                    min-width: 40px;
                    margin-right: 20px;
                `};
        }
    }
`;
