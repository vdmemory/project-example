import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledInnerInvitesMembers = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    border-top: 1px solid ${colors.mainBlack};
    gap: 1px;

    .add-colleague-button {
        text-transform: uppercase;
    }

    > * {
        padding: 0 40px;
    }
`;
