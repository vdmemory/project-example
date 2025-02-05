import styled from '@emotion/styled';
import { mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInputFieldPreview = styled.div`
    display: flex;
    gap: 15px;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 450;
    line-height: 16.02px;
    letter-spacing: 0;
    text-align: left;
    padding: 14px 12px;
    height: 48px;

    border: 1px solid rgba(233, 235, 237, 1);
    background-color: rgba(248, 249, 249, 1);
    color: rgba(194, 200, 204, 1);
    white-space: nowrap;

    > span {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    svg {
        cursor: pointer;
        width: 16px;
        min-width: 16px;
        height: 16px;
    }

    @media screen and (${mediaScreen.tablet}) {
        ${mixinTypography.mobile.text.mobileTextSm};
    }
`;
