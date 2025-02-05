import styled from '@emotion/styled';
import { colors } from '../../styles/colors';

export const StyledList = styled.ul`
    padding: 0;
    margin: 0;
    border: 1px solid ${colors.grey.grey100};
    border-radius: 4px;
    overflow: auto;
    background-color: ${colors.white};
    transition: all 200ms ease;
    max-height: 225px;
    animation: emergence;
    animation-duration: 100ms;

    // > li + li {
    //     border-top: 1px solid ${colors.grey.grey900};
    // }

    @keyframes emergence {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;
