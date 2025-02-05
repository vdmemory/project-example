import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledEditableLink = styled.div`
    display: flex;
    flex: 1;
    gap: 20px;
    align-items: center;
    max-width: 100%;

    .input {
        flex: 1;
    }
    .input-title,
    .input-link {
        padding-left: 20px;
        padding-right: 20px;
        min-width: auto;
        max-width: 100% !important;
        width: 50px;
    }

    .fields-wrapper {
        display: flex;
        flex: 1;
        gap: 20px;
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

    .add-button {
        height: 48px;
        min-width: 74px;
        border: none;
        border-radius: 2px;
        ${mixinTypography.text.tMd.textMdMedium};
    }

    @media screen and (${mediaScreen.tablet}) {
        align-items: flex-end;
        .fields-wrapper {
            flex-direction: column;
        }

        a {
            align-self: center;
        }
    }
`;
