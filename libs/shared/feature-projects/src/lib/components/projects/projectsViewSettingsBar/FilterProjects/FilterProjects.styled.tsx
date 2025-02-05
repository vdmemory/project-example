import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { colors as colorsUiKit } from '@breef/ui-kit';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';

type StyledFilterProjectsType = {
    isAgency: boolean;
};

export const StyledFilterProjects = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${({ isAgency }: StyledFilterProjectsType) =>
        isAgency ? 'space-between' : 'flex-start'};

    .filter-projects-left-section {
        > * + * {
            margin-left: 30px;
        }
    }
    > * + * {
        margin-left: ${({ isAgency }: StyledFilterProjectsType) =>
            isAgency ? '0' : '12px'};
    }
    @media (${mediaScreen.tablet}) {
        flex-direction: ${({ isAgency }: StyledFilterProjectsType) =>
            isAgency ? 'column' : 'row'};
        .filter-projects-left-section {
            display: flex;
            flex-direction: column;
            > * + * {
                margin-left: 0;
            }
        }
        > * + * {
            margin-left: 0;
        }

        ${({ isAgency }: StyledFilterProjectsType) =>
            !isAgency &&
            `
                .filter-label {
                    font-size: 20px;
                }
                .divider {
                    margin: 0 10px;
                }
            `};
    }
`;

type StyledFilterItemProps = {
    isActive: boolean;
    isHovered: boolean;
    isClient?: boolean;
    isSingleFilter?: boolean;
};

const checkIsActive = ({
    isActive,
    isClient,
    isSingleFilter,
}: StyledFilterItemProps) =>
    isActive &&
    css`
        color: ${colors.mainBlack};
        ${isClient &&
        css`
            color: ${colorsUiKit.grey.grey900};
            ${isSingleFilter &&
            css`
                pointer-events: none;
            `};
            ${!isSingleFilter &&
            css`
                ::after {
                    border-bottom: 1px solid ${colorsUiKit.grey.grey900};
                }
            `};
        `};
    `;
const checkIsHovered = ({
    isHovered,
    isClient,
    isActive,
}: StyledFilterItemProps) =>
    isHovered &&
    css`
        cursor: pointer;

        :hover {
            ${isClient &&
            !isActive &&
            css`
                color: ${colorsUiKit.primary.primary400};
            `};
        }
    `;

export const StyledFilterItem = styled.span`
    cursor: default;
    color: ${colors.strokeGray};
    ${({ isClient }: StyledFilterItemProps) =>
        isClient &&
        css`
            padding-top: 2px;
            height: 33px;
            position: relative;
            display: flex;
            align-items: center;
            color: ${colorsUiKit.grey.grey400};
            ::after {
                position: absolute;
                content: '';
                border-bottom: 1px solid transparent;
                left: 0;
                bottom: 0;
                width: 100%;
            }
        `}

    ${checkIsActive};
    ${checkIsHovered};
`;
