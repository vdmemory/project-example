import { colors, fonts } from '@breef/shared/assets';
import styled from '@emotion/styled';

type HeaderProps = {
    isSticky: boolean;
};

export const StyledHeader = styled.header`
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    background: white;
    position: ${({ isSticky }: HeaderProps) =>
        isSticky ? 'sticky' : 'initial'};
    top: 0;
    z-index: 10;
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        li {
            border: none;
            padding: 0;
        }
        svg {
            padding: 0;
        }
    }

    @media screen and (max-width: 1024px) {
        height: 60px;
    }

    .navigation {
        .button-logout {
            text-transform: uppercase;
            font-family: ${fonts.accent};
            border-left: 1px solid ${colors.mainBlack};
            margin: 0;
            padding: 0;
            min-width: 87px;
            &:hover {
                text-decoration: line-through;

                @media screen and (max-width: 512px) {
                    text-decoration: unset;
                }
            }
        }
        .small-accent {
            text-transform: uppercase;
            font-family: ${fonts.accent};
            border-left: 1px solid ${colors.mainBlack};
            padding: 0;
            min-width: 87px;
        }
    }

    &.hide {
        display: none;
    }
`;
