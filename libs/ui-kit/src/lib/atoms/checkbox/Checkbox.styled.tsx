import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';

interface StyledCheckboxProps {
    variant: 'default' | 'error';
    disabled: boolean;
}

interface StyledIndeterminateProps {
    variant: 'default' | 'error';
}

const defaultCheckbox = css`
    color: ${colors.grey.grey900};

    &:active:hover .checkbox {
        background: ${colors.white};
        border: 1px solid ${colors.grey.grey900};
        outline: 0;
        svg {
            opacity: 0;
        }
    }

    &:active:hover .checkbox-selected {
        border: none;
        svg {
            opacity: 1;
            rect {
                fill: ${colors.primary.primary500};
            }
            path {
                fill: ${colors.white};
            }
        }
    }

    &:hover:active .checkbox-indeterminate {
        background: ${colors.white};
    }
    &:hover:active .checkbox-indeterminate .indeterminate {
        background-color: ${colors.primary.primary500};
    }

    .checkbox {
        border: 1px solid ${colors.grey.grey900};
        &-selected {
            border: none;
            svg {
                opacity: 1;
            }
        }

        &:hover {
            background: ${colors.secondary.secondary200};
            svg {
                rect {
                    fill: ${colors.secondary.secondary200};
                }
                path {
                    fill: ${colors.black};
                }
            }
        }

        &-indeterminate:hover .indeterminate {
            background-color: ${colors.grey.grey900};
        }
    }
`;

const errorCheckbox = css`
    color: ${colors.error.error700};

    &:active:hover .checkbox {
        background: ${colors.white};
        border: 1px solid ${colors.error.error700};
        outline: 0;
        svg {
            opacity: 0;
        }
    }

    &:active:hover .checkbox-selected {
        border: none;
        outline: 0;
        svg {
            opacity: 1;
            rect {
                fill: ${colors.error.error700};
                stroke: ${colors.grey.grey900};
            }
            path {
                fill: ${colors.white};
            }
        }
    }

    &:active:hover .checkbox-indeterminate {
        background: ${colors.white};
        border: 1px solid ${colors.grey.grey900};
    }

    &:active:hover .checkbox-indeterminate .indeterminate {
        background-color: ${colors.error.error700};
    }

    .checkbox {
        border: 1px solid ${colors.error.error700};

        &:hover {
            background: ${colors.error.error200};
            border: 1px solid ${colors.error.error500};
            svg {
                rect {
                    fill: ${colors.error.error200};
                    stroke: ${colors.error.error500};
                }
                path {
                    fill: ${colors.error.error500};
                }
            }
        }

        &-selected {
            border: none;
            svg {
                opacity: 1;
                rect {
                    fill: ${colors.error.error500};
                    stroke: ${colors.error.error700};
                }
                path {
                    fill: ${colors.white};
                }
            }
            &:hover {
                border: none;
            }
        }
    }
`;

const disabledDefaultCheckbox = css`
    color: ${colors.grey.grey200};
    cursor: default;
    pointer-events: none;
    &:focus .checkbox {
        outline: 0;
    }
    .checkbox {
        border: 1px solid ${colors.grey.grey200};

        &-selected {
            border: none;
            svg {
                opacity: 1;
                rect {
                    fill: ${colors.grey.grey200};
                    stroke: ${colors.grey.grey100};
                }
                path {
                    fill: ${colors.white};
                }
            }
        }

        .indeterminate {
            background-color: ${colors.grey.grey200};
        }
    }
`;

const disabledErrorCheckbox = css`
    color: ${colors.grey.grey200};
    cursor: default;
    pointer-events: none;
    &:focus .checkbox {
        outline: 0;
    }
    .checkbox {
        border: 1px solid ${colors.error.error100};
        &-selected {
            border: none;
            svg {
                opacity: 1;
                rect {
                    fill: ${colors.error.error200};
                    stroke: ${colors.error.error100};
                }
                path {
                    fill: ${colors.white};
                }
            }
        }

        .indeterminate {
            background-color: ${colors.error.error200};
        }
    }
`;

const getCheckboxVariant = (props: StyledCheckboxProps) => {
    switch (props.variant) {
        case 'error':
            return errorCheckbox;
        default:
            return defaultCheckbox;
    }
};

const getCheckboxDisabled = (props: StyledCheckboxProps) => {
    if (props.disabled && props.variant === 'default') {
        return disabledDefaultCheckbox;
    } else if (props.disabled && props.variant === 'error') {
        return disabledErrorCheckbox;
    }
    return null;
};

export const StyledLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    vertical-align: middle;
    padding-top: 5px;
    padding-bottom: 5px;

    background: ${colors.white};

    &:focus-within {
        outline: none;
    }

    &:focus span.indeterminate {
        background-color: ${colors.primary.primary500};
    }

    .checkbox {
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
        min-width: 1rem;
        max-width: 1rem;
        height: 1rem;

        &-label {
            ${mixinTypography.text.tMd.textMdRegular};
            margin-left: 8px;
        }

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
            opacity: 0;
            width: 1em;
            height: 1em;
            font-size: 16px;
        }
    }
    ${getCheckboxVariant};
    ${getCheckboxDisabled};
`;

export const StyledChildren = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
`;

export const StyledIndeterminate = styled.span`
    width: 8px;
    height: 1px;
    background-color: ${({ variant }: StyledIndeterminateProps) =>
        variant === 'default'
            ? `${colors.primary.primary500}`
            : `${colors.error.error500}`};
`;
