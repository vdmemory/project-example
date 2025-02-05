import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledHeader = styled.div`
    display: flex;
    padding: 28px;
    background-color: ${colors.beige};
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${colors.grey.grey100};
    height: 106px;

    @media screen and (${mediaScreen.tablet}) {
        padding: 21px 16px;
        height: auto;
    }

    button {
        font-family: ${fonts.accent};
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 1px;
        background-color: transparent;
        padding: 10px 20px;
        height: 48px;
        color: #d96e34;
        border-color: #d96e34;

        @media screen and (${mediaScreen.tablet}) {
            height: 32px;
            min-width: 120px;
            padding: 6px 12px;
            font-size: 12px;
        }
    }
`;
