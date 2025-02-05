import styled from '@emotion/styled';
import { backgroundFinishProject } from '@breef/shared/assets';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledFinishProjectPopup = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 56px;
    background-image: url(${backgroundFinishProject.src});
    background-position: center;
    background-size: cover;
    background-color: ${colors.white};
    max-width: 743px;

    > h1 {
        ${mixinTypography.display.dMd.displayMdMedium};
        letter-spacing: 0.015em;
        margin: 0 0 12px;
    }
    > p {
        ${mixinTypography.text.tLg.textLgMedium};
        color: ${colors.grey.grey700};
        margin: 0;
        letter-spacing: 0.025em;
    }

    .finish-steps-wrapper {
        display: flex;
        gap: 9px;
        margin: 40px 0 40px;
    }

    @media screen and (${mediaScreen.laptop}) {
        padding: 40px 20px;
        > h1 {
            ${mixinTypography.mobile.display.mobileDisplayMd};
        }
        > p {
            ${mixinTypography.mobile.text.mobileTextSm};
        }

        .finish-steps-wrapper {
            flex-direction: column;
            gap: 12px;
            margin: 20px 0 36px;
        }
    }
`;
