import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { colors as colorsUiKit } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const fonts = {
    default: 'NeueHaasDisplay',
    accent: 'SuisseIntlMono',
};

export const StyledAcceptInvitation = styled.section`
    background-color: ${colors.mainPurple};
    display: flex;
    justify-content: center;
    flex: 1;
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
