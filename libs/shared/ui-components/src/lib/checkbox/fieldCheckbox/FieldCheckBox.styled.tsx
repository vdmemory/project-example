import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets/variables';

interface StyledFieldCheckBoxProps {
    isChecked: boolean;
    isDisabled: boolean;
}

export const StyledFieldCheckBox = styled.label`
    display: flex;
    align-items: center;
    width: fit-content;
    line-height: 20px;
    font-size: 14px;
    opacity: ${({ isDisabled }: StyledFieldCheckBoxProps) =>
        isDisabled ? 0.3 : 1};
    &:hover {
        cursor: ${({ isDisabled }: StyledFieldCheckBoxProps) =>
            isDisabled ? 'not-allowed' : 'default'};
    }
    .checkbox {
        position: relative;
        display: inline-block;
        min-width: 18px;
        width: 18px;
        height: 18px;
        border: 1px solid ${colors.mainBlack};
        margin-right: 10px;
        border-radius: 1px;
        cursor: ${({ isDisabled }: StyledFieldCheckBoxProps) =>
            isDisabled ? 'not-allowed' : 'pointer'};

        &-disabled {
            opacity: 0.5;
        }
        .checkmark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: ${({ isChecked }: StyledFieldCheckBoxProps) =>
                isChecked ? 'block' : 'none'};
        }
        .checkstandard {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: auto;
            transform: translate(-50%, -50%);
            display: ${({ isChecked }: StyledFieldCheckBoxProps) =>
                isChecked ? 'block' : 'none'};
        }
        input {
            margin-right: 15px;
            display: none;
        }
    }
`;
