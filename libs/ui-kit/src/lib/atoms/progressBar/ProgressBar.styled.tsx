import { colors } from '../../styles/colors';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledProgressBarProps {
    isVertical: boolean;
}
export const StyledProgressBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    height: 48px;
    width: 100%;
    padding: 0 34px;

    ${({ isVertical }: StyledProgressBarProps) =>
        isVertical &&
        css`
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 24px;
            padding: 0;
            width: fit-content;
            height: fit-content;
            border: none;
            border-radius: initial;
        `};

    @media screen and (${mediaScreen.tablet}) {
        padding: 0 16px;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }
`;
