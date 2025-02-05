import { colors, staticPagesHeaderBackgroundImage } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledHeaderPagesSupport = styled.div`
    padding: 35px 75px 40px;
    background-color: ${colors.darkPurple};
    background-image: url(${staticPagesHeaderBackgroundImage.src});
    background-size: cover;
    background-position: center;
    border-bottom: 1px solid ${colors.mainBlack};
    min-height: 220px;
    display: flex;
    align-items: center;
    > h1 {
        font-weight: 450;
        font-size: 72px;
        line-height: 72px;
        text-transform: uppercase;
        max-width: 770px;
        margin: 0;
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 20px;
        min-height: 100px;
        > h1 {
            font-size: 24px;
            line-height: 29px;
        }
    }
`;
