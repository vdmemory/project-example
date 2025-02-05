import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledServices = styled.div`
    display: flex;
    flex-direction: column;
    .title-section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        border-top: 1px solid ${colors.mainBlack};
        border-bottom: 1px solid ${colors.mainBlack};
        text-transform: uppercase;
        font-size: 32px;
        background-color: ${colors.darkPurple};
    }
`;
