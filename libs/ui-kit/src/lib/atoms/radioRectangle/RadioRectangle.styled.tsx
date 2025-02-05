import styled from '@emotion/styled';
import { colors } from '../../styles';
import { css } from '@emotion/react';

interface StyledRadioRectangleProps {
    disabled: boolean;
    checked?: boolean;
    selectAreaView: 'radio' | 'checkbox';
    isError?: boolean;
}
export const StyledRadioRectangle = styled.label<StyledRadioRectangleProps>`
    display: flex;
    flex: 1;
    gap: 14px;
    padding: 16px;
    border: 1px solid ${colors.grey.grey100};
    border-radius: 2px;
    background-color: ${colors.white};
    cursor: pointer;

    :hover {
        background-color: ${colors.secondary.secondary200};
    }

    .radio {
        width: 16px;
        height: 16px;
        border: 1px solid #d8dcde;
        ${({ selectAreaView }) =>
            selectAreaView === 'radio' &&
            css`
                border-radius: 50%;
            `};
        background-color: ${colors.white};
        position: relative;

        > input {
            display: none;
        }

        > svg {
            display: none;
            position: absolute;
            top: -1px;
            left: -1px;
            width: 16px;
            height: 16px;
        }
    }

    .radio-label {
        font-size: 14px;
        font-weight: 450;
        line-height: 16px;
        letter-spacing: 0;
    }

    ${({ checked }) =>
        checked &&
        css`
            border: 1px solid ${colors.primary.primary500}!important;
            background-color: ${colors.primary.primary50};

            :hover {
                background-color: ${colors.primary.primary50};
            }

            .radio {
                svg {
                    display: flex;
                }
            }
        `};

    ${({ isError }) =>
        isError &&
        css`
            border: 1px solid #ff551f !important;
        `};
`;
