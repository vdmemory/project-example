import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { mixinTypography } from '@breef/ui-kit';

export const StyledPayments = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 850px;
    min-width: 450px;
    width: 100%;

    .btn-back {
        position: absolute;
        top: 30px;
        left: 80px;
    }

    h3.card-form-title {
        text-transform: uppercase;
        ${mixinTypography.display.dSm.displaySmMedium};
        color: ${colors.mainBlack};
        max-width: 600px;
        margin: 20px auto 0;
        display: block;
    }

    .spinner-loader {
        margin-top: 20px;
    }

    .form-card {
        border: 1px solid ${colors.mainBlack};
        max-width: 600px;
        display: flex;
        margin: 20px auto 0;
        background-color: ${colors.mainWhite};

        .section {
            padding: 16px 16px 0;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        min-width: auto;
        width: calc(100% - 30px) !important;

        .btn-back {
            top: 5px;
            left: 0;
        }
    }
`;
