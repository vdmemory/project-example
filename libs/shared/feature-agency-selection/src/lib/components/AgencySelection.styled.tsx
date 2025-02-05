import { colors } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledSectionSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    .stepper {
        display: flex;
        flex: 1;
    }
    .footer {
        border-top: 1px solid ${colors.mainBlack};
        z-index: 1;
    }
`;
