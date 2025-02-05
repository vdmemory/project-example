import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledWorkCardOld = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 20px 26px;
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    background: ${colors.white};

    .title {
        display: flex;
        width: 100%;
        ${mixinTypography.text.tLg.textLgMedium};

        .folder,
        .coins {
            min-width: 25px;
            margin-right: 12px;
            margin-top: 1px;
        }
        .coins {
        }
        .title-divider {
            margin-left: 8px;
            margin-right: 8px;
        }

        .group,
        .group-btn {
            display: flex;
            align-items: center;

            svg {
                cursor: pointer;
            }

            h4 {
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .wrapper {
                display: flex;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .group {
            width: 86%;
            gap: 0;

            @media screen and (max-width: 720px) {
                flex-wrap: wrap;
                width: 80%;
            }

            svg {
                margin-right: 4px;
            }
        }

        .group-btn {
            gap: 4px;
            margin-right: -4px;
            margin-left: auto;

            @media screen and (max-width: 720px) {
                align-items: flex-start;
            }

            .trash-button {
                path,
                line {
                    stroke: ${colors.error.error500};
                }

                &:hover {
                    path,
                    line {
                        stroke: ${colors.grey.grey900};
                    }
                }
            }
        }
    }

    .description,
    .project-links-wrapper,
    .documents-wrapper,
    .rate {
        padding-left: 36px;
    }

    .description {
        white-space: pre-wrap;
        margin-top: 20px;
    }

    .rate {
        margin-top: calc(20px - 4px);
        margin-bottom: -4px;
        ${mixinTypography.text.tSmall.textSmallMedium};
        text-transform: capitalize;

        .rate-divider {
            margin: 0 8px;
        }
    }

    .project-links-wrapper {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .documents-wrapper {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .trash-btn > span:hover {
            text-decoration: underline;
        }
    }
`;
