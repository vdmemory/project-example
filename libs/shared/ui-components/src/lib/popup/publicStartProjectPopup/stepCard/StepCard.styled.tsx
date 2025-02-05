import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledStepCard = styled.div`
    background-color: #fcf6f3;
    border: 1px solid ${colors.grey.grey900};
    position: relative;
    border-radius: 4px;
    padding: 29px 13px;
    min-width: 204px;
    margin-top: 5px;

    .step-number {
        position: absolute;
        z-index: 1;
        bottom: 100%;
        left: 14px;
        transform: translateY(50%);
        padding: 0 2px;
        background-color: transparent;
        ${mixinTypography.label.lMd.labelMdMedium};

        ::before {
            position: absolute;
            z-index: -1;
            bottom: 1px;
            height: 50%;
            width: 100%;
            left: 0;
            background-color: #fcf6f3;
            content: '';
        }
    }

    .label {
        display: block;
        ${mixinTypography.display.dXs.displayXsMedium};
        margin-bottom: 10px;
    }

    > p {
        margin: 0;
        ${mixinTypography.text.tSmall.textSmallMedium};
    }

    @media screen and (${mediaScreen.laptop}) {
        .step-number {
            ${mixinTypography.label.lS.labelSMedium};
        }
        .label {
            ${mixinTypography.text.tLg.textLgMedium};
        }
        > p {
            ${mixinTypography.text.tSmall.textSmallMedium};
        }
    }
`;
