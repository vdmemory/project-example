import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledFieldSelectLabelProps {
    isSelected: boolean;
}

export const StyledFieldSelect = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    @media screen and (max-width: 1024px) {
        margin-top: 20px;
    }
`;

const activeSelectStyle = css`
    margin-left: 50px;
    padding-left: 10px;
    color: ${colors.mainOrange};

    .arrow-img {
        opacity: 1;
    }
`;

export const StyledFieldSelectLabel = styled.label`
    text-transform: uppercase;
    transition: all 0.2s;
    padding: 15px 0;
    cursor: pointer;
    position: relative;
    font-size: 48px;

    .arrow-img {
        transition: all 0.2s;
        opacity: 0;
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        height: 25px;
        width: auto;

        path {
            fill: ${colors.mainOrange};
        }
    }

    ${({ isSelected }: StyledFieldSelectLabelProps) =>
        isSelected && activeSelectStyle}
    :hover {
        ${activeSelectStyle}
    }

    input {
        display: none;
    }

    @media screen and (max-width: 1024px) {
        font-size: 32px;
    }
`;
