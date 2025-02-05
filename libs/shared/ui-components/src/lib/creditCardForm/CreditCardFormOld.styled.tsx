import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledCreditCardFormOld = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    align-items: center;
    ${simpleAnimation};

    button.medium {
        min-height: 80px;
        border-top: 1px solid ${colors.black};
        margin: auto 0 0;

        @media (${mediaScreen.tablet}) {
            text-transform: capitalize;
            font-size: 24px;
        }

        @media (${mediaScreen.maxMobile}) {
            height: 52px;
            min-height: 52px;
            ${mixinTypography.mobile.text.mobileTextMd}
        }
    }
`;

export const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const StyledPoweredByStripe = styled.p`
    ${mixinTypography.label.lS.labelSMedium};
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    justify-content: flex-end;
    padding: 0 16px;
    margin: auto 0 16px;
`;
