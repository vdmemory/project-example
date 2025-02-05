import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets/variables';

export const StyledSummary = styled.div`
    display: flex;
    flex-direction: column;

    .inner-fields-row {
        display: flex;
        gap: 1px;
        background-color: ${colors.mainBlack};
    }
    .read-only-wrapper {
        * {
            background-color: ${colors.mainPurple};
        }
    }
`;
