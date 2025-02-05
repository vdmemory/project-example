import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

type StyledExpandedCardProps = {
    checked?: boolean;
    cardSize?: 'normal' | 'big';
    isEditable?: boolean;
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

export const StyledCustomExpandedCard = styled.label<StyledExpandedCardProps>`
    flex: 1;
    padding: 35px 30px 25px;
    background-color: ${colors.mainWhite};
    color: ${colors.mainBlack};
    display: flex;
    position: relative;
    cursor: ${({ isEditable }: StyledExpandedCardProps) =>
        isEditable ? 'auto' : 'pointer'};
    transition: all 300ms ease;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    outline: 1px solid ${colors.mainBlack};
    min-width: ${({ isEditable }: StyledExpandedCardProps) =>
        isEditable ? '440px' : '288px'};
    ${({ isEditable }: StyledExpandedCardProps) =>
        isEditable &&
        css`
            max-width: 100% !important;
        `}

    :hover {
        ${({ isEditable }: StyledExpandedCardProps) =>
            !isEditable &&
            css`
                background-color: ${colors.darkPurple};
            `};
    }

    .card-action-button {
        position: absolute;
        right: 20px;
        top: 27px;
        cursor: pointer;
        padding: 0;
        background-color: transparent;
        border: none;
        outline: none;
        svg {
            width: 31px;
            height: auto;
            transform: rotate(0);
            margin: 0;
        }
        :disabled {
            opacity: 0.2;
        }
    }

    .card-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
    }

    .bottom-card-section {
        height: ${({ isEditable }: StyledExpandedCardProps) =>
            isEditable ? 'auto' : '40%'};

        display: flex;
        flex-direction: column;

        .note-section {
            margin-top: auto;
            min-height: 60px;
            display: flex;

            .breef-most-popular-icon {
                margin: auto 0;

                path {
                    transition: all 300ms ease;
                    fill: ${colors.mainBlack};
                }
            }
        }

        .card-link-button {
            font-size: 24px;
            margin-top: 20px;
            text-transform: uppercase;
            &:disabled {
                color: ${colors.mainOrange};
                opacity: 0.25;
            }

            svg {
                width: 35px;
                height: 35px;
                margin-left: 0;
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
        margin-bottom: 35px;
        text-transform: uppercase;
    }

    .custom-card-textarea-wrapper {
        margin-top: 25px;
        display: flex;
        flex: 1;
        color: ${colors.mainBlack};

        > textarea {
            font-size: 24px;
            line-height: 29px;
        }

        > textarea {
            display: flex;
            flex: 1;

            ::placeholder {
                color: ${colors.mainPlaceholder};
            }
        }
    }

    .custom-content {
        white-space: pre-wrap;
        line-height: 29px;
        font-size: 24px;
        max-height: 175px;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 6;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-word;
    }

    ${({ checked = false }) => checked && checkedCss}
    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 0;
        height: 0;
    }

    @media screen and (${mediaScreen.tablet}) {
        :hover {
            background-color: initial;
        }
    }
`;
