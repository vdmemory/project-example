import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';

export const StyledMobileRowItem = styled.div`
    display: flex;

    .title-row-wrapper,
    .value-row-text {
        display: flex;
        padding: 15px 20px;
        word-break: break-word;
    }

    .title-row-wrapper {
        flex: 0.4;
        gap: 10px;

        .title-row-text {
            font-weight: 400;
            font-family: ${fonts.accent};
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
    }

    .value-row-text {
        flex: 0.6;
    }

    &:nth-of-type(2) > * {
        padding-top: 25px;
    }
    &:last-of-type > * {
        padding-bottom: 25px;
    }

    .value-row-text {
        border-left: 1px solid ${colors.mainBlack};
    }
`;
