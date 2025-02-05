import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { simpleAnimation } from '@breef/shared/assets';

export const StyledAccountBillingDetail = styled.div`
    display: flex;
    min-height: 90px;
    border: 1px solid ${colors.grey.grey900};
    position: relative;
    padding: 10px 16px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    transition: width 200ms ease;
    gap: 15px;
    border-radius: 4px;

    :hover {
        cursor: pointer;
    }

    .item-group {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
    }

    .item-label {
        color: ${colors.grey.grey600};
        ${mixinTypography.label.lS.labelSMedium};
        margin-bottom: 5px;
    }

    .item-street,
    .item-location {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .item-street {
        color: ${colors.grey.grey900};
        ${mixinTypography.text.tMd.textMdMedium};
    }

    .item-location {
        color: ${colors.grey.grey600};
        ${mixinTypography.text.tSmall.textSmallMedium};
    }

    svg {
        min-width: 24px;
    }

    ${simpleAnimation};
`;
