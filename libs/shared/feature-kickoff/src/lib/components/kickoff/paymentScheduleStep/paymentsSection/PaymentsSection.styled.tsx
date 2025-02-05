import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets/variables';

interface StyledPaymentsSection {
    paddingBottomSize: number;
}

export const StyledPaymentsSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    outline: 1px solid ${colors.mainBlack};
    padding-bottom: ${({ paddingBottomSize }: StyledPaymentsSection) =>
        paddingBottomSize}px;
    padding-left: 15px;
    padding-right: 15px;

    .content-wrapper {
        width: 100%;
        max-width: 850px;
    }

    .drop-list {
        left: 0 !important;
        right: auto !important;
        max-width: 425px;
    }
`;
