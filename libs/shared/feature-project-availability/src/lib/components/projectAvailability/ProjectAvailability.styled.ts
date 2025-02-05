import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledProjectAvailability = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 60px;
    background-color: ${colors.beige};

    @media screen and (${mediaScreen.maxMobile}) {
        button.normal .main-content-text {
            margin-right: 30px;
        }
    }
`;
