import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledNavDefault = styled.header`
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    background: ${colors.white};
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 100;

    @media screen and (max-width: 1024px) {
        height: 74px;
        overflow: unset;
        border-bottom: none;
        background-color: ${colors.beige};
    }

    .logo {
        display: flex;
        align-items: center;
        margin-left: 16px;
        flex: 1;
        justify-content: flex-start;

        li {
            border: none;
            padding: 0;

            @media screen and (max-width: 1024px) {
                background-color: ${colors.beige};
            }
        }

        svg {
            padding: 0;
        }
    }

    .navigation {
        .button-logout {
            text-transform: uppercase;
            font-family: ${fonts.accent};
            border-left: 1px solid ${colors.black};
            margin: 0;
            padding: 0;
            min-width: 135px;
            &:hover {
                text-decoration: line-through;
            }
        }
        .small-accent {
            min-width: 136px;
            padding: 0;
            white-space: nowrap;
        }

        .only-icon {
            border-left: 1px solid ${colors.black};
        }
    }
`;
