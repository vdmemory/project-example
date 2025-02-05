import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface StyledFooterProps {
    isStickyFooter: boolean;
    isIOSSafari?: boolean;
}

const checkIsStickyFooter = ({ isStickyFooter }: StyledFooterProps) =>
    isStickyFooter &&
    css`
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
    `;

const stylesForIOSSafari = css`
    position: static !important;
`;

export const StyledFooter = styled.footer`
    width: 100%;
    background: white;
    height: 50px;
    display: flex;
    margin-top: auto;
    justify-content: space-between;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    z-index: 99;

    @media screen and (max-width: 1024px) {
        justify-content: center;
    }

    .left-section {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 50px;
        font-size: 14px;

        @media screen and (max-width: 1024px) {
            display: none;
        }
    }

    img {
        height: 27px;
        width: 14px;
    }
    ${checkIsStickyFooter};

    @media screen and (max-width: 1024px) {
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;

        ${({ isIOSSafari }) => isIOSSafari && stylesForIOSSafari};
    }
`;
