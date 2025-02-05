import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledEmptyPage = styled.div`
    display: flex;
    flex: 1;
    padding: 100px 0;
    background: ${colors.mainPurple};
    @media (${mediaScreen.tablet}) {
        padding: 100px 20px;
    }
    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: inherit;
        margin: auto;
        max-width: 390px;
        &-image {
            margin-bottom: 50px;
        }
        &-title {
            font-weight: 450;
            font-size: 48px;
            line-height: 110%;
            text-align: center;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            margin: 0 0 10px 0;
        }
        &-text {
            font-style: normal;
            font-weight: 450;
            font-size: 18px;
            line-height: 160%;
            text-align: center;
            letter-spacing: 0.002em;
            margin: 0;
            max-width: 365px;
        }
    }
`;
