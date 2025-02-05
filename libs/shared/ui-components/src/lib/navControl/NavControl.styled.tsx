import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledNavControlProps {
    isStatic?: boolean;
    cut: 'cut-left' | 'cut-right' | '';
    noFlexLeft?: boolean;
    noFlexRight?: boolean;
    isChildren: boolean;
    isNewNav?: boolean;
}

export const StyledNavControl = styled.div`
    position: ${({ isStatic }: StyledNavControlProps) =>
        isStatic ? 'static' : 'fixed'};
    top: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.mainWhite};
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    z-index: 100;

    &.nav-control-sticky {
        position: -webkit-sticky;
        position: sticky;
        z-index: 10;
    }

    .left-section,
    .right-section {
        height: 100%;
        margin: auto 0;
        > a.link-logo {
            margin: auto 0;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 20px;
        }
        > button.button-help-center {
            font-size: 12px;
            text-transform: uppercase;
            font-family: ${fonts.accent};
            border-left: 1px solid ${colors.mainBlack};
            margin: 0;
            padding: 0;
            min-width: 130px;
            &:hover {
                text-decoration: line-through;

                @media screen and (max-width: 512px) {
                    text-decoration: unset;
                }
            }
        }
    }

    .control-btn {
        border: none;
        padding: 0;
        background: none;
        display: flex;
        height: 100%;
        align-items: center;
        width: 100%;
        flex: 1;
        cursor: pointer;
        padding: 0 30px;

        :disabled {
            cursor: not-allowed;
            opacity: 0.2;
        }
    }

    .left-section {
        flex: ${({ cut, noFlexLeft }: StyledNavControlProps) => {
            if (cut === 'cut-left') return 0.3;
            if (noFlexLeft) return 'none';
            return 1;
        }};
        padding: ${({ cut }: StyledNavControlProps) => cut !== 'cut-left' && 0};
        button {
            justify-content: flex-start;
            width: fit-content;
        }
    }
    .right-section {
        flex: ${({ cut, noFlexRight }: StyledNavControlProps) => {
            if (cut === 'cut-right') return 0.3;
            if (noFlexRight) return 'none';
            return 1;
        }};
        padding: ${({ cut }: StyledNavControlProps) =>
            cut !== 'cut-right' && 0};
        .control-btn {
            margin-left: auto;
            width: fit-content;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        height: 60px;
        .control-btn {
            padding: 0 15px;
        }

        .left-section {
            flex: 0.35 1 0%;
        }
        .right-section {
            flex: 1 1 0%;
            padding: 0px;

            ${(props: StyledNavControlProps) =>
                !props.isChildren &&
                css`
                    flex: none;
                `}
        }
    }

    @media screen and (${mediaScreen.maxMobile}) {
        background-color: ${({ isNewNav }: StyledNavControlProps) =>
            isNewNav ? '#F9F7F3' : '#fff'};
        .left-section {
            flex: 0.3 1 0%;
        }
    }
`;
