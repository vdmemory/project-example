import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledDashboardMeet = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    padding: 20px 0 40px;
    width: 100%;
    max-width: 1130px;
    margin: 0 auto;

    @media screen and (${mediaScreen.mobile}) {
    }
`;

export const StyledLoaderWrapper = styled.div`
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 100px;
    position: absolute;

    .loader-container {
        height: 100%;
    }
`;
