import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

type StyledStyledCardProps = {
    checked?: boolean;
};

const checkedCss = css`
    background-color: ${colors.darkPurple};
    color: ${colors.mainOrange};
    padding-top: 70px;
    .breef-suggestion {
        path {
            fill: ${colors.mainOrange};
        }
    }
`;

export const StyledCardTemplate = styled.label<StyledStyledCardProps>`
    height: 100%;
    min-width: 230px;
    flex: 1;
    padding: 80px 15px 0;
    background-color: ${colors.mainWhite};
    color: ${colors.mainBlack};
    display: flex;
    position: relative;
    cursor: pointer;
    transition: all 300ms ease;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    outline: 1px solid ${colors.mainBlack};
    .breef-suggestion {
        position: absolute;
        top: 25px;
        path {
            transition: all 300ms ease;
            fill: ${colors.mainBlack};
        }
    }

    .image-wrapper {
        display: flex;
        width: 200px;
        height: 120px;
        justify-content: center;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    p {
        display: flex;
        align-items: center;
        white-space: break-spaces;
        font-size: 15px;
        text-transform: uppercase;
        text-align: center;
        line-height: 18px;
        letter-spacing: 0.015em;
        margin-bottom: 10px;
        margin-top: 20px;
        min-height: 60px;
    }

    ${({ checked = false }) => checked && checkedCss}

    :hover {
        background-color: ${colors.darkPurple};
        color: ${colors.mainOrange};
        .breef-suggestion {
            path {
                fill: ${colors.mainOrange};
            }
        }
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 0;
        height: 0;
    }
`;
