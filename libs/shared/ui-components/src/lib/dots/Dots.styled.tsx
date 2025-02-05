import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledDots = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 60px;
    padding: 0 18px;
    > span {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: ${colors.mainBlack};
    }
`;
