import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledEditableLinkOld = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    max-width: 100%;

    .input-title,
    .input-link {
        padding-left: 20px;
        padding-right: 20px;
    }

    .input-title {
        min-width: auto;
        max-width: 170px;
    }

    .input-link {
        min-width: auto;
        max-width: 220px;
    }

    a {
        font-size: 16px;
        font-weight: bolder;
        line-height: 20px;
        letter-spacing: 0.01em;
        text-decoration: underline;
        color: ${colors.primary.primary500};
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .control-wrapper {
        display: flex;
        gap: 12px;

        svg {
            cursor: pointer;
            :hover {
                path,
                line {
                    stroke: ${colors.grey.grey300};
                }
            }
        }

        svg.trash-icon {
            path,
            line {
                stroke: ${colors.error.error600};
            }
            :hover {
                path,
                line {
                    stroke: ${colors.error.error300};
                }
            }
        }
    }
`;
