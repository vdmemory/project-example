import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledEditableElem = styled.div`
    display: inline-flex;
    gap: 16px;
    color: ${colors.mainOrange};
    align-items: center;
    cursor: pointer;
    padding: 0 20px 0 30px;
    margin: 0 -20px 0 -30px;
    height: 100%;
    line-height: 19.2px;

    svg {
        min-width: 13px !important;
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 0;
        margin: 0;
        gap: 7px;
        max-width: 100%;

        > span {
            max-width: 100%;
        }

        svg {
            min-width: 12px !important;
            width: 12px;
        }
    }
`;
