import { replaceAmountToString } from '@breef/shared/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

const StyledTotalNote = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 50px;
    background: ${colors.secondary.secondary500};
    width: 100%;
    margin-bottom: 24px;
    border-bottom: 1px solid ${colors.grey.grey900};

    .label {
        ${mixinTypography.mobile.label.mobileLabelXs};
        margin: 0;
    }

    .amount {
        ${mixinTypography.display.dXs.displayXsSemibold};
        margin: 0;
        font-size: 14px;
    }
`;

export const TotalNote = ({ total }: { total: number }) => {
    return (
        <StyledTotalNote className="total">
            <p className="label">Payment total</p>
            <p className="amount">{replaceAmountToString(total)}</p>
        </StyledTotalNote>
    );
};
