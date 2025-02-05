import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';

interface StyledMultiProgressBarProps {
    isScrollableBarOnMobile: boolean;
}

const checkIsScrollableBarOnMobile = ({
    isScrollableBarOnMobile,
}: StyledMultiProgressBarProps) =>
    isScrollableBarOnMobile &&
    css`
        position: -webkit-sticky;
        position: sticky;
        top: 60px;
        z-index: 90;
        @media screen and (${mediaScreen.tablet}) {
            width: 100%;
            overflow-x: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }

            > * {
                min-width: 250px;
            }
        }
    `;

export const StyledMultiProgressBar = styled.div`
    display: flex;
    > div + div {
        border-left: 1px solid ${colors.mainBlack};
    }

    ${checkIsScrollableBarOnMobile};
`;
