import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

type StyledExpandedCardProps = {
    checked?: boolean;
    cardSize?: 'normal' | 'big';
};

const checkedCss = css`
    background-color: ${colors.darkPurple}!important;
    color: ${colors.mainOrange}!important;

    .breef-most-popular-icon {
        path {
            fill: ${colors.mainOrange}!important;
        }
    }
`;

const checkCardSize = ({ cardSize }: StyledExpandedCardProps) =>
    cardSize === 'big' &&
    css`
        padding: 35px 80px 35px;
        min-width: 300px;

        p {
            font-size: 48px;
            line-height: 53px;
        }

        .bottom-card-section > .note-section > span {
            font-size: 18px;
            line-height: 29px;
            max-width: 350px;
            letter-spacing: 0.002em;
        }
    `;

export const StyledExpandedCard = styled.label<StyledExpandedCardProps>`
    min-width: 288px;
    flex: 1;
    padding: 35px 30px 25px;
    background-color: ${colors.mainWhite};
    color: ${colors.mainBlack};
    display: flex;
    position: relative;
    cursor: pointer;
    transition: all 300ms ease;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    outline: 1px solid ${colors.mainBlack};

    .card-title {
        width: 100%;
    }

    .bottom-card-section {
        height: 40%;
        display: flex;
        flex-direction: column;

        .note-section {
            margin-top: auto;
            min-height: 60px;
            display: flex;

            > span {
                font-size: 14px;
                line-height: 19px;
                letter-spacing: 0.01em;
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .breef-most-popular-icon {
                margin: auto 0;

                path {
                    transition: all 300ms ease;
                    fill: ${colors.mainBlack};
                }
            }
        }
    }

    p {
        display: flex;
        align-items: center;
        white-space: break-spaces;
        font-size: 32px;
        line-height: 35.2px;
        letter-spacing: 0.002em;
        margin-top: 25px;
        color: ${colors.mainOrange};
        text-transform: uppercase;
    }

    ${({ checked = false }) => checked && checkedCss}
    :hover {
        background-color: ${colors.darkPurple};

        .breef-most-popular-icon {
            path {
                fill: ${colors.mainOrange};
            }
        }
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 0;
        height: 0;
    }

    ${checkCardSize}

    @media screen and (${mediaScreen.tablet}) {
        :hover {
            background-color: initial;
        }
    }
`;
