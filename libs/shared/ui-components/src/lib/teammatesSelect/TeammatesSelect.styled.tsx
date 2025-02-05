import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledTeammatesSelect = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.mainWhite};
    flex: 1;
    overflow: hidden;

    .row-item {
        max-height: 100px;
        min-height: 100px;
        flex: 1;
        padding: 10px 75px;
        display: flex;
        align-items: center;

        > * {
            font-size: 24px;
            line-height: 28.8px;
            letter-spacing: 0.015em;
        }
    }

    .row-item + .row-item {
        border-top: 1px solid ${colors.mainBlack};
    }
`;
