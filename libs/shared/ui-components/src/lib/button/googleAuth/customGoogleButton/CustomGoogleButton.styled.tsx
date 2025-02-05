import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';

export const StyledGoogleButton = styled.button`
    background-color: ${colors.mainWhite};
    color: ${colors.mainBlack};
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    text-align: center;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    padding: 1px;
    width: 50px;
    height: 50px;
    border: 1px solid transparent;

    ::before,
    ::after {
        content: '';
        position: absolute;
        width: inherit;
        height: inherit;
    }

    ::before {
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.17);
    }
    ::after {
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08);
    }

    &:hover {
        background-color: ${colors.mainPurple};
    }

    .sso-content {
        .sso-icon {
            border-radius: 20px;
            float: left;

            .sso-icon-container {
                width: auto;
                height: 29px;
                svg {
                    height: inherit;
                    width: inherit;
                }
            }
        }
    }

    .sso-button-content {
        font-size: 14px;
        line-height: 49px;
        letter-spacing: 0.22px;
        margin-left: 0;
        margin-right: 10px;
        vertical-align: top;
        width: 100%;
    }
`;
