import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';

export const StyledTrashIconButton = styled.button`
    cursor: pointer;
    width: 24px;
    height: 24px;
    border: none;
    outline: none;
    padding: 0;
    background-color: transparent;

    :hover {
        path,
        line {
            stroke: ${colors.error.error300};
        }
    }

    :disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    > svg {
        path,
        line {
            stroke: ${colors.error.error600};
        }
    }
`;
