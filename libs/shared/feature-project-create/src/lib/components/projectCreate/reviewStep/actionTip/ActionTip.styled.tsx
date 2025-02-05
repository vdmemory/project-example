import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledActionTip = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 17px;
    background-color: ${colors.white};
    border: 1px solid ${colors.grey.grey50};
    border-radius: 4px;
    box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.1);

    .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;

        svg {
            width: inherit;
            height: inherit;
            min-width: inherit;
        }
        h3 {
            margin: 0;
            ${mixinTypography.text.tLg.textLgMedium};
            color: ${colors.grey.grey900};
            -webkit-text-stroke-width: 0.4px;
            -webkit-text-stroke-color: ${colors.grey.grey900};
        }
    }
    .description {
        ${mixinTypography.text.tSmall.textSmallMedium};
        color: #68737d;
        margin: -4px 0 16px 0;
    }

    button {
    }
`;
