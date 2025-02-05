import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export interface StyledButtonProps {
    isSubmitting: boolean;
    isSuccess: boolean;
}

const checkState = ({ isSuccess, isSubmitting }: StyledButtonProps) => {
    if (isSubmitting) {
        return css`
            transition: all 300ms ease;
            background-color: ${colors.mainSave}!important;

            .main-content {
                opacity: 1;
                span {
                    color: ${colors.mainBlack};
                }

                .three-dots-icon {
                    opacity: 1;
                }
            }
        `;
    }
    if (isSuccess) {
        return css`
            transition: all 300ms ease;
            background-color: ${colors.mainSave}!important;

            .main-content {
                opacity: 1;
                span {
                    color: ${colors.mainBlack};
                }

                .check-icon {
                    opacity: 1;
                }
            }
        `;
    }
    return null;
};

export const StyledSaveButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: auto;
    border: none;
    font-family: ${fonts.default}, sans-serif;
    width: 100%;
    height: 80px;
    font-size: 24px;
    overflow: hidden;
    background-color: ${colors.mainOrange};
    transition: background-color 300ms ease;

    &:disabled {
        background-color: ${colors.mainWhite};
        cursor: auto;
        .main-content > span {
            color: ${colors.mainBlack};
        }

        > * {
            opacity: 0.2;
        }
    }

    .main-content {
        position: relative;
        display: flex;
        margin: 0 50px;

        span {
            color: ${colors.mainWhite};
            min-width: 70px;
            text-transform: uppercase;
        }

        .check-icon,
        .three-dots-icon {
            opacity: 0;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            transition: opacity 300ms ease;
        }

        .check-icon {
            left: calc(100% + 12px);
        }

        .three-dots-icon {
            right: calc(100% + 12px);
        }
    }

    ${checkState};
`;
