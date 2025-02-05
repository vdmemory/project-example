import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@breef/shared/assets';

type StyledNavigationProps = {
    parent: 'header' | 'footer';
    type: 'normal' | 'float';
};

const header = css`
    .navigation {
        text-transform: uppercase;
        font-family: 'SuisseIntlMono', serif;
        font-size: 12px;
    }
`;

const footer = css`
    @media screen and (max-width: 1024px) {
        display: none;
    }
    .navigation {
        text-transform: initial;
        font-family: 'NeueHaasDisplay', sans-serif;
        font-size: 14px;
    }
`;

export const StyledNavigation = styled.nav<StyledNavigationProps>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;

    .navigation {
        color: black;
        display: flex;
        list-style: none;
        line-height: 16px;
        letter-spacing: 0.05em;
        margin: 0;
        padding: 0;
        height: 100%;
        > * + * {
            border-left: 1px solid ${colors.mainBlack};
        }
    }
    ${({ parent }) => parent === 'header' && header}
    ${({ parent }) => parent === 'footer' && footer}
`;

type StyledFloatNavigationProps = {
    parent: 'header' | 'footer';
};

const headerFloat = css`
    display: flex;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const footerFloat = css`
    display: none;
    @media screen and (max-width: 1024px) {
        display: flex;
    }
`;

export const StyledFloatNavigation = styled.nav<StyledFloatNavigationProps>`
    align-items: center;
    flex: 1;
    justify-content: center;

    @media screen and (max-width: 1024px) {
        width: 100%;
        padding: 0 13px;
    }
    .float-navigation {
        color: black;
        display: flex;
        list-style: none;
        line-height: 16px;
        letter-spacing: 0.05em;
        margin-bottom: 0;
        margin-top: 0;
        margin-left: 0;
        padding: 0;
        height: 100%;

        text-transform: uppercase;
        font-family: 'SuisseIntlMono', serif;
        font-size: 12px;

        @media screen and (max-width: 1024px) {
            width: 100%;
            justify-content: center;
        }
    }
    ${({ parent }) => parent === 'header' && headerFloat}
    ${({ parent }) => parent === 'footer' && footerFloat}
`;
