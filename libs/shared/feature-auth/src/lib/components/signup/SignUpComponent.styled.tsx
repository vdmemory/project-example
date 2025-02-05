import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors as colorsUiKit } from '@breef/ui-kit';

export const StyledSignUp = styled.section`
    display: flex;
    flex: 1;
    justify-content: center;
    background-color: ${colors.mainPurple};
    padding-top: 25px;
    padding-bottom: 70px;
    border-bottom: 1px solid ${colorsUiKit.grey.grey100};

    .successScreen {
        .main-text {
            max-width: 342px;
        }
    }

    .label-field-role {
        margin-bottom: 16px;
    }
    .radio-role {
        border: 1px solid rgba(216, 220, 222, 1);
    }

    @media screen and (${mediaScreen.tablet}) {
        padding-top: 24px;
        padding-bottom: 40px;
    }
`;
