import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledProgressBarTextProps {
    fillSize: string;
    isHideLabel: boolean;
}

const checkIsHideLabel = ({ isHideLabel }: StyledProgressBarTextProps) => {
    if (isHideLabel)
        return css`
            height: 10px;
            .progress-clipper {
                //height: 10px;
            }
            .progress-text-back {
                color: transparent;
            }
            .progress-text-front {
                color: transparent;
            }
        `;
    return null;
};

export const StyledProgressBarText = styled.div`
    width: 100%;
    height: 30px;
    border-bottom: 1px solid black;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: height 200ms;
    ${({ fillSize }: StyledProgressBarTextProps) =>
        fillSize &&
        css`
            width: ${fillSize};
        `};

    .progress-text {
        font-size: 14px;
        position: absolute;
        left: 0;
        line-height: 29px;
        display: flex;
        justify-content: space-around;
    }

    .progress-text-back {
        text-align: center;
        color: black;
        width: 100%;
        z-index: 1;
        background-color: ${colors.mainWhite};
    }

    .progress-text-front {
        text-align: center;
        color: white;
        background-color: ${colors.mainOrange};
        width: 100%;
        height: 100%;
    }

    .progress-clipper {
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        clip-path: inset(0% 100% 0% 0%);
        z-index: 2;
        transition: all 0.75s cubic-bezier(0.42, 0, 0, 1), height 0ms;
    }

    .govuk-visually-hidden {
        display: none;
    }

    .group-name {
        text-transform: uppercase;
        font-family: 'SuisseIntlMono', serif;
        font-size: 12px;
        margin: 0;
        text-align: center;
    }
    ${checkIsHideLabel}
`;
