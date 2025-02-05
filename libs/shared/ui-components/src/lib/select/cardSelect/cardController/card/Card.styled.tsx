import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

type StyledStyledCardProps = {
    checked?: boolean;
    preset?: 'big' | 'small';
};

const checkedCss = css`
    background-color: ${colors.darkPurple}!important;
    color: ${colors.mainOrange}!important;
`;

const presetSmall = css`
    min-width: 166px;
    min-height: 166px;
    height: 166px;
    p {
        line-height: 22px;
    }
`;

const presetSettings = ({ preset }: StyledStyledCardProps) => {
    switch (preset) {
        case 'small':
            return presetSmall;
        default:
            return null;
    }
};

export const StyledCard = styled.label<StyledStyledCardProps>`
    height: 200px;
    min-width: 207px;
    flex: 1;
    padding: 0 15px;
    background-color: ${colors.mainWhite};
    color: ${colors.mainBlack};
    display: flex;
    position: relative;
    cursor: pointer;
    transition: all 300ms ease;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    outline: 1px solid ${colors.mainBlack};

    :nth-of-type(4n + 4) {
        border-right: none;
    }

    p {
        font-size: 15px;
        text-align: center;
        line-height: 30px;
        white-space: pre-wrap;
    }

    :hover {
        background-color: ${colors.darkPurple};
        color: ${colors.mainOrange};
    }

    ${({ checked = false }) => checked && checkedCss}

    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 0;
        height: 0;
    }

    @media screen and (max-width: 1024px) {
        height: 100px;
        min-width: 180px;
        p {
            margin-top: 5px;
            margin-bottom: 5px;
            line-height: 22px;
        }
        :hover {
            background-color: ${colors.mainWhite};
            color: ${colors.mainBlack};
        }
    }
    ${presetSettings}
`;
