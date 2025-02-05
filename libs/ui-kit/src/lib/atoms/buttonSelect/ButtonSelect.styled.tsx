import styled from '@emotion/styled';
import { colors, mixinTypography } from '../../styles';

interface StyledPillProps {
    type: 'checkbox' | 'radio';
    isUppercase: boolean;
}

export const StyledButtonSelect = styled.label<StyledPillProps>`
    display: flex;
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    color: ${colors.grey.grey900};
    background-color: ${colors.white};
    padding: 18px 8px 18px 15px;
    min-width: 248px;
    gap: 16px;
    ${mixinTypography.label.lMd.labelMdMedium};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    align-items: center;
    user-select: none;

    .description {
        margin: 0;
    }

    :hover {
        background-color: ${colors.primary.primary500};
        color: ${colors.white};
    }

    label {
        padding: 0;
        height: 16px;
        width: 16px;
    }

    span.checkbox:hover {
        background-color: ${colors.white};
        svg {
            rect {
                stroke: ${colors.white};
            }
            path {
                fill: ${colors.grey.grey900};
            }
        }
    }

    span.checkbox.checkbox-selected:hover {
        svg {
            rect {
                stroke: ${colors.grey.grey900};
                fill: ${colors.primary.primary500};
            }
            path {
                fill: ${colors.white};
            }
        }
    }

    span.checkbox.checkbox-selected {
        min-width: auto;
        max-width: none;
        height: auto;
    }

    span.checkbox.checkbox-selected svg {
        width: 18px;
        height: 18px;
    }
`;
