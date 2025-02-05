import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledInnerFieldWrapperProps {
    isCursorPointer: boolean;
    isError: boolean;
    isReadOnly: boolean;
}

const checkIsReadonlyField = ({ isReadOnly }: StyledInnerFieldWrapperProps) =>
    isReadOnly &&
    css`
        background-color: ${colors.mainPurple};
        pointer-events: none;
        cursor: auto;
        .tooltip {
            pointer-events: auto;
        }
        * {
            background-color: ${colors.mainPurple};
        }
    `;

export const StyledInnerFieldWrapper = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${colors.mainWhite};
    outline: ${({ isError }: StyledInnerFieldWrapperProps) =>
        isError ? `1px solid ${colors.mainError}` : 'none'};
    min-height: 90px;
    font-size: 24px;
    cursor: ${({ isCursorPointer }: StyledInnerFieldWrapperProps) =>
        isCursorPointer && 'pointer'};

    position: relative;

    textarea {
        ::placeholder {
            font-size: 15px;
        }
    }

    > * {
        padding: 0 20px 16px;
        @media (${mediaScreen.tablet}) {
            padding: 0 15px 16px;
        }
    }

    .label-container {
        display: flex;
        margin-bottom: auto;
        padding-top: 20px;
        padding-bottom: 4px;
        font-size: 12px;

        .label-text {
            display: flex;
            font-family: ${fonts.accent};
            text-transform: uppercase;
            color: #8d8d8d;
            letter-spacing: 0.05em;
            line-height: 16px;
        }
    }
    ${checkIsReadonlyField}

    @media (${mediaScreen.tablet}) {
        font-size: 22px;

        textarea {
            ::placeholder {
                font-size: 22px;
            }
        }

        > * {
            padding: 0 15px 18px;
        }
    }
`;
