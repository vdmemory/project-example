import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface StyledInputFieldProps {
    isError?: boolean;
    isWarning?: boolean;
    isRightIcon?: boolean;
}

export const StyledInputField = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;

    input.input-field {
        height: 48px;
        font-size: 14px;
        font-weight: 450;
        line-height: 16.02px;
        letter-spacing: 0;
        width: 100%;
        border: ${(props: StyledInputFieldProps) => {
            if (props.isError) {
                return `1px solid ${colors.error.error500}`;
            }
            if (props.isWarning) {
                return `1px solid ${colors.orange.orange500}`;
            }
            return `1px solid rgba(216, 220, 222, 1)`;
        }};
        padding: 16px 12px;
        outline: none;
        background-color: transparent;
        font-family: 'NeueHaasDisplay', sans-serif;
        -webkit-appearance: none;
        border-radius: 0;
        ${({ isRightIcon }: StyledInputFieldProps) =>
            isRightIcon &&
            css`
                padding-right: 55px;
            `};

        :focus-visible {
            outline: none;
        }

        &::placeholder {
            color: rgba(194, 200, 204, 1);
        }
    }

    .password-icon {
        right: 12px;
        top: 16px;
    }

    .warning-icon {
        position: absolute;
        right: 12px;
        top: 7px;
        width: 30px;
        height: auto;
        path {
            stroke: ${colors.orange.orange500};
        }
        circle {
            fill: ${colors.orange.orange500};
        }
    }

    .field-error {
        padding-top: 5px;
    }
`;
