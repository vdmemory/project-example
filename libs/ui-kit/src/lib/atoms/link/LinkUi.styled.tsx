import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';
import { fontSize } from '../../styles/font';

type StyledLinkProps = {
    variant: 'standalone' | 'inline' | 'button' | 'decoration-none';
    size: 'medium' | 'small' | 'default';
};

const standaloneLink = css`
    &:focus:active {
        color: ${colors.grey.grey900};
        > svg {
            path {
                stroke: ${colors.grey.grey900};
            }
        }
        &:after {
            height: 0;
            transition: all 0s;
        }
    }

    &:hover {
        &:after {
            height: 1px;
        }
    }
`;

const inlineLink = css`
    &:focus:active {
        color: ${colors.grey.grey900};
        > svg {
            path {
                stroke: ${colors.grey.grey900};
            }
        }
        &:after {
            background: ${colors.grey.grey900};
        }
    }
    &:after {
        height: 1px;
    }
`;

const buttonLink = css`
    padding: 4px 0;

    :active {
        color: ${colors.grey.grey900};
        > svg {
            path {
                stroke: ${colors.grey.grey900};
            }
        }
    }
    :hover {
        background-color: ${colors.primary.primary100};
        border-radius: 4px;
    }
`;

const decorationNoneLink = css`
    text-decoration: none;
`;

const mediumSizeLink = css`
    ${mixinTypography.text.tMd.textMdMedium};
    font-size: ${fontSize.fs16};
`;
const smallSizeLink = css`
    ${mixinTypography.text.tXs.textXsMedium};
    font-size: ${fontSize.fs12};
`;
const defaultSizeLink = css`
    ${mixinTypography.text.tSmall.textSmallMedium};
`;

const getVariant = (props: StyledLinkProps) => {
    switch (props.variant) {
        case 'standalone':
            return standaloneLink;
        case 'button':
            return buttonLink;
        case 'decoration-none':
            return decorationNoneLink;
        default:
            return inlineLink;
    }
};

const getSize = (props: StyledLinkProps) => {
    switch (props.size) {
        case 'medium':
            return mediumSizeLink;
        case 'small':
            return smallSizeLink;
        default:
            return defaultSizeLink;
    }
};

export const LinkUiStyled = styled.a`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    vertical-align: middle;
    color: ${colors.primary.primary600};
    text-decoration: none;
    padding: 0;
    width: fit-content;
    outline: none;

    &.link-disabled {
        pointer-events: none;
        color: ${colors.grey.grey300};
        &:after {
            background: ${colors.grey.grey300};
        }
        svg {
            path {
                stroke: ${colors.grey.grey300};
            }
        }
    }

    &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 0;
        background: ${colors.primary.primary500};
        bottom: -1px;
        right: 0;
        left: 0;
        transition: all 0.1s;
    }

    &:focus {
        outline: none;
    }
    > svg {
        path {
            stroke: ${colors.primary.primary600};
        }
    }

    ${getVariant};
    ${getSize};
`;
