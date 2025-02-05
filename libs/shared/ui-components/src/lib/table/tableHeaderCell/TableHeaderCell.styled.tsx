import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';

export const StyledTableHeaderCell = styled.th`
    padding: 0 25px 0 40px;
    height: 60px;
    text-align: left;
    background-color: ${colors.mainPurple};

    & + th {
        border-left: 1px solid ${colors.mainBlack};
    }

    .cell-content-wrapper {
        display: flex;
        gap: 10px;
        align-items: center;

        .text {
            font-weight: 400;
            font-family: ${fonts.accent};
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
        > div {
            display: flex;
        }
    }
`;
