import { colors } from '../../styles/colors';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledProgressBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    height: 48px;
    width: 100%;
    padding: 0 34px;

    @media screen and (${mediaScreen.tablet}) {
        padding: 0 16px;
    }
`;
