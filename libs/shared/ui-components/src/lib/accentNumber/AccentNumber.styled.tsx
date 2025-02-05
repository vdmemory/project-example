import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';

export const StyledAccentNumber = styled.div`
    display: flex;
    align-items: center;
    height: 20px;
    .round {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: ${colors.mainBlack};
    }
    .number {
        letter-spacing: 0.05em;
        margin-left: 6px;
        font-size: 12px;
        line-height: 12px;
        text-transform: uppercase;

        font-family: ${fonts.accent};
        color: ${colors.mainBlack}!important;
    }
`;
