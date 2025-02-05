import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledAddPaymentsPopup = styled.div`
    width: 990px;

    @media (${mediaScreen.laptop}) {
        width: 100%;
    }

    .modal-header {
        background: ${colors.mainPurple};
        font-weight: 450;
        font-size: 48px;
        line-height: 110%;
        letter-spacing: 0.002em;
        text-transform: uppercase;
        padding: 49px 69px;
        border-bottom: 1px solid ${colors.mainBlack};
    }

    .modal-body {
        padding: 0;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid transparent;
        gap: 1px;
    }

    .inner-fields-box {
        width: auto;
    }

    .add-milestone-button,
    .add-payment-button {
        margin: 45px auto;
    }

    @media screen and (${mediaScreen.tablet}) {
        width: auto;
        .modal-header {
            font-weight: 450;
            font-size: 32px;
            line-height: 110%;
            letter-spacing: 0.002em;
            padding: 20px 60px 20px 20px;
        }
    }
`;

interface StyledSectionProps {
    bottomSpace?: number;
}

export const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
    outline: 1px solid ${colors.mainBlack};
    padding: 0 71px
        ${({ bottomSpace }: StyledSectionProps) =>
            bottomSpace ? bottomSpace : 0}px;

    @media screen and (${mediaScreen.tablet}) {
        padding: 0 20px
            ${({ bottomSpace }: StyledSectionProps) =>
                bottomSpace ? bottomSpace : 0}px;
    }
`;
