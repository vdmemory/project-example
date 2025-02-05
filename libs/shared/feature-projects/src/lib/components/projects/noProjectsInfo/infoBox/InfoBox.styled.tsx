import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    padding: 100px 70px 30px;

    .label {
        text-transform: uppercase;
        font-size: 32px;
        line-height: 35px;
        font-weight: 450;
    }
    .note {
        font-weight: 450;
        font-size: 18px;
        line-height: 29px;
        margin-top: 5px;
    }

    svg {
        position: absolute;
        top: -20px;
    }

    @media (${mediaScreen.tablet}) {
        padding: 75px 15px 30px;
        svg {
            top: -20px;
            transform: scale(0.9);
        }
    }
`;
