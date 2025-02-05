import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

type StyledProgressProps = {
    progress?: number;
};

export const StyledProgress = styled.div<StyledProgressProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colors.mainBlack};
    position: relative;
    height: 10px;
    width: 100%;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: ${colors.mainOrange};
        transition: width 0.75s cubic-bezier(0.42, 0, 0, 1);

        ${({ progress }) => progress && `width: ${progress}%`};
    }
`;

export const StyledButtonClose = styled.button`
    border: none;
    background: none;
    position: absolute;
    cursor: pointer;
    z-index: 5;
    top: 10px;
    right: 10px;
    padding: 0;

    @media screen and (${mediaScreen.tablet}) {
        top: 13px;
        right: 4px;
        svg {
            height: 30px;
            width: 30px;
        }
    }
`;

export const StyledGetStartedWelcomeBack = styled.div`
    background-color: ${colors.mainPurple};

    h2 {
        font-family: ${fonts.default};
        font-weight: 400;
        margin: 5px 0;
    }

    .header-modal {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        justify-content: flex-end;
    }

    .main-content-modal {
        display: flex;
        width: 835px;
        max-width: 100%;
        flex-direction: column;
        position: relative;
        padding: 45px;
        min-height: 475px;
    }

    .footer-modal {
        border-top: 1px solid ${colors.mainBlack};

        button {
            text-transform: uppercase;

            @media screen and (${mediaScreen.tablet}) {
                :hover {
                    background-color: ${colors.mainOrange};
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .main-content-modal {
            padding: 25px 15px;
        }

        .main-content-modal.screen-1 {
            padding: 125px 15px 25px;
        }

        .main-content-text {
            font-size: 18px;

            svg.arrow-right {
                height: 26px;
            }
        }
    }
`;
