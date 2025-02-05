import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledAgencyPreferencesStep = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 40px;
`;

export const StyledPillWrapper = styled.div`
    display: flex;
    gap: 16px;

    &.budget-range-pills-wrapper {
        margin-bottom: 12px;
    }
`;
