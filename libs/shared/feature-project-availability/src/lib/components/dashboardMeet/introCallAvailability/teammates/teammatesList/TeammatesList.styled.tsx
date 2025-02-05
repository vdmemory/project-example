import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledTeammatesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    h3 {
        margin: 0;
        text-transform: uppercase;
        ${mixinTypography.label.lS.labelSMedium};
        color: ${colors.grey.grey400};
        line-height: 16px;
        font-weight: 400;
        font-size: 12px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .pill {
        height: 30px;
        padding: 9px 12px;

        & span {
            font-size: 12px;
        }

        & svg path {
            stroke-width: 1;
        }

        &.primary {
            background-color: ${colors.white};
        }

        &.secondary {
            background-color: ${colors.secondary.secondary300};
        }
    }
`;
