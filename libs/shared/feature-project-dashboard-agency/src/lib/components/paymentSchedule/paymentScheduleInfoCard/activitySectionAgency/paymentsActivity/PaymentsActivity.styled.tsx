import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPaymentsActivity = styled.div`
    margin-top: 20px;
    font-size: 18px;
    line-height: 20px;
    max-width: 390px;
    margin-bottom: 27px;

    @media screen and (${mediaScreen.tablet}) {
        margin-top: 15px;
        margin-bottom: 23px;
    }
`;
