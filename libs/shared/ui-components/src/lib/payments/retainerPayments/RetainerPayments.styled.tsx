import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets/variables';

export const StyledRetainerPayments = styled.div`
    display: flex;
    flex-direction: column;

    .retainer-action-button {
        font-size: 12px;
        font-family: ${fonts.accent};
        letter-spacing: 0.015em;
        line-height: 120%;
        text-transform: uppercase;
    }

    .inner-fields-row {
        display: flex;
        gap: 1px;
        background-color: ${colors.mainBlack};
    }

    .drop-list {
        left: 0 !important;
        right: auto !important;
        max-width: 425px;
    }

    .close-icon {
        width: 60px;
        height: 60px;
        margin: 0;
        margin-right: -15px;

        line {
            stroke: ${colors.mainBlack};
            transition: all 300ms ease;
        }
        :hover line {
            stroke: ${colors.mainOrange};
        }
    }
`;
