import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';

export const StyledCheckbox = styled.label`
    display: flex;
    width: 26px;
    height: 26px;
    border: 1px solid ${colors.black};
    background-color: transparent;
    cursor: pointer;
    border-radius: 2px;

    svg {
        margin-top: 4px;
        margin-left: 2px;
    }

    input {
        display: none;
    }

    :has(input:checked) {
        border-color: ${colors.primary.primary500};
        background-color: ${colors.primary.primary500};
    }
`;
