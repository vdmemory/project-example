import styled from '@emotion/styled';
import { simpleAnimation } from '@breef/shared/assets';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledTeamMembers = styled.section`
    width: 850px;
    border: 1px solid ${colors.mainBlack};
    ${simpleAnimation};

    @media (${mediaScreen.tablet}) {
        width: calc(100% - 30px) !important;
    }
`;
