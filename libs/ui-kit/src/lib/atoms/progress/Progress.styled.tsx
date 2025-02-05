import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledProgress = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    padding: 0 8px;
    gap: 12px;

    @media screen and (${mediaScreen.tablet}) {
        padding: 0 16px;
    }
`;
