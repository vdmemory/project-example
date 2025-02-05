import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';
import { simpleAnimation } from '@breef/shared/assets';

interface StyledRadioProps {
    variant: 'default' | 'error';
    disabled: boolean;
    small?: boolean;
}

const defaultRadio = css`
    color: ${colors.grey.grey900};

    &:active:hover {
        outline: 0;
    }

    &:active:hover .radio {
        outline: 0;
        background: transparent;
    }

    .radio {
        border: 1px solid ${colors.grey.grey900};
        &-selected {
            svg {
                opacity: 1;
            }

            &:hover {
                svg {
                    opacity: 1;
                }
            }
        }
        &:hover {
            background: ${colors.secondary.secondary200};
        }
    }
`;
const errorRadio = css`
    color: ${colors.error.error700};

    &:active:hover {
        outline: 0;
    }

    &:active:hover .radio {
        outline: 0;
        background: transparent;
        border: 1px solid ${colors.error.error900};
    }

    &:active:hover .radio-selected {
        svg {
            rect {
                fill: ${colors.error.error900};
            }
        }
    }

    .radio {
        border: 1px solid ${colors.error.error500};
        &-selected {
            svg {
                opacity: 1;
                rect {
                    fill: ${colors.error.error500};
                }
            }

            &:hover {
                svg {
                    opacity: 1;
                }
            }
        }
        &:hover {
            background: ${colors.error.error200};
        }
    }
`;

const disabledDefaultRadio = css`
    color: ${colors.grey.grey200};
    cursor: default;
    pointer-events: none;
    &:focus .radio {
        outline: 0;
    }
    .radio {
        border: 1px solid ${colors.grey.grey200};
        &-selected {
            svg {
                rect {
                    fill: ${colors.grey.grey200};
                }
            }
        }
    }
`;
const disabledErrorRadio = css`
    color: ${colors.grey.grey200};
    cursor: default;
    pointer-events: none;
    &:focus .radio {
        outline: 0;
    }

    .radio {
        border: 1px solid ${colors.error.error100};
        &-selected {
            svg {
                rect {
                    fill: ${colors.error.error200};
                }
            }
        }
    }
`;

const getRadioVariant = (props: StyledRadioProps) => {
    switch (props.variant) {
        case 'error':
            return errorRadio;
        default:
            return defaultRadio;
    }
};

const getRadioDisabled = (props: StyledRadioProps) => {
    if (props.disabled && props.variant === 'default') {
        return disabledDefaultRadio;
    } else if (props.disabled && props.variant === 'error') {
        return disabledErrorRadio;
    }
    return null;
};

const smallCss = css`
    .radio {
        min-width: 11px;
        height: 11px;

        &.radio-selected svg {
            font-size: 5px;
        }
    }
`;

export const StyledLabel = styled.label<StyledRadioProps>`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    vertical-align: middle;
    padding-top: 5px;
    padding-bottom: 5px;

    ${simpleAnimation};

    &:focus-within {
        outline: none;
    }

    .radio {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: transparent;
        outline: 0;
        border: 0;
        margin: 0;
        user-select: none;
        vertical-align: middle;
        text-decoration: none;
        max-width: 1.5rem;
        min-width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;

        > input {
            cursor: inherit;
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
            z-index: 1;
        }

        svg {
            margin: auto;
            width: 1em;
            height: 1em;
            font-size: 12px;
            overflow: hidden;
            pointer-events: none;
            position: absolute;
            z-index: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: inherit;
            opacity: 0;
        }

        &-label {
            ${mixinTypography.text.tMd.textMdRegular};
            margin-left: 8px;
        }
    }
    ${getRadioVariant};
    ${getRadioDisabled};
    ${({ small }) => small && smallCss};
`;
