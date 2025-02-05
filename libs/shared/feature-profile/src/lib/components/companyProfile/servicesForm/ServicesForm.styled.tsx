import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';

export const StyledServicesForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .services-dropdown-wrapper {
        border-left: 1px solid ${colors.black};
        border-right: 1px solid ${colors.black};
        border-bottom: 1px solid ${colors.black};
    }

    .save-button {
        border-top: 1px solid ${colors.grey.grey900};
    }
`;
