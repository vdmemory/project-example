import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors as colorsUiKit } from '@breef/ui-kit';

export const StyledSignin = styled.section`
    display: flex;
    flex: 1;
    justify-content: center;
    font-family: ${fonts.default}, sans-serif;
    padding-top: 25px;
    padding-bottom: 70px;
    background-color: ${colors.mainPurple};
    border-bottom: 1px solid ${colorsUiKit.grey.grey100};

    @media screen and (${mediaScreen.tablet}) {
        padding-top: 24px;
        padding-bottom: 40px;
    }
`;
