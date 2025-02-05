import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledSelectPaymentType = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > h2 {
        margin: 43px 0 42px;
        font-size: 32px;
        line-height: 35px;
        font-weight: 450;
        text-transform: uppercase;
    }

    .card-select-container {
        display: flex;
        gap: 1px;
        width: 100%;
        min-height: 280px;
        border-top: 1px solid ${colors.mainBlack};
        border-bottom: 1px solid ${colors.mainBlack};
    }

    @media screen and (${mediaScreen.tablet}) {
        > h2 {
            margin: 25px 15px 25px;
            font-size: 24px;
            line-height: 22px;
            text-align: center;
        }

        .card-select-container {
            flex-direction: column;
            overflow: hidden;
            max-width: 100%;
        }
    }
`;
