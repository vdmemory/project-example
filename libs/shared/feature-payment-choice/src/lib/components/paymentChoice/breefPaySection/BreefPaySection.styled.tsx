import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledBreefPaySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 470px;
    width: 100%;
    padding: 16px 65px;
    color: ${colors.grey.grey900};
    ${simpleAnimation};

    @media (${mediaScreen.tablet}) {
        padding: 24px 18px;
    }

    .breef-pay {
        &-title {
            ${mixinTypography.display.dSm.displaySmMedium};
            margin: 32px 0;

            @media (${mediaScreen.tablet}) {
                ${mixinTypography.mobile.display.mobileDisplaySm};
                margin: 24px 0 8px;
            }
        }
        &-subtitle {
            ${mixinTypography.text.tSmall.textSmallMedium};
            text-align: center;
            color: ${colors.grey.grey600};
            margin: 0 0 32px;

            @media (${mediaScreen.tablet}) {
                ${mixinTypography.mobile.text.mobileTextSm};
                margin: 0 0 24px;
            }
        }
    }

    button.normal {
        border: 1px solid ${colors.grey.grey900};
        height: 56px;
        color: ${colors.grey.grey900};
        .main-content-text {
            ${mixinTypography.text.tMd.textMdMedium};
            text-transform: uppercase;

            svg {
                margin-left: 5px;
            }
        }
    }
`;
