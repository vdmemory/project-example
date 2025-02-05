import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledWorkCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 20px 24px;
    border-radius: 4px;
    border: 1px solid ${colors.grey.grey900};
    background: ${colors.grey.grey50};

    .title {
        display: flex;
        width: 100%;
        ${mixinTypography.text.tLg.textLgMedium};

        .folder,
        .coins {
            min-width: 25px;
            margin-right: 12px;
            margin-top: 1px;
            height: auto;
        }
        .coins {
        }
        .title-divider {
            margin: -2.5px 8px;
        }

        .group,
        .group-btn {
            display: flex;
            align-items: center;

            svg {
                cursor: pointer;
            }

            h4 {
                ${mixinTypography.text.tLg.textLgMedium};
                margin: -2.5px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: normal;
                -webkit-text-stroke-width: 0.4px;
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

            @media screen and (max-width: 490px) {
                width: 75%;
            }

            @media screen and (max-width: 428px) {
                width: 73%;
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

    .content-work-wrapper {
        margin-left: 4px;

        h4 {
            ${mixinTypography.text.tMd.textMdMedium};
            color: ${colors.grey.grey400};
            padding-top: 12px;
            padding-left: 36px;
            margin: -4.5px 0;
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
        padding-top: 20px;
        margin: -4.5px 0;
        color: ${colors.grey.grey900};
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
        padding-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        a {
            margin: -4.5px 0;

            :hover {
                color: ${colors.primary.primary300};
            }
        }
    }

    .documents-wrapper {
        padding-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .trash-btn > span:hover {
            text-decoration: underline;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        border: 1px solid ${colors.grey.grey100};
        background: ${colors.white};
        padding: 20px 12px 20px;

        .title {
            align-items: flex-start;
            padding-bottom: 4.5px;
        }

        .title .group h4 {
            margin: -4.5px 0;
            ${mixinTypography.text.tMd.textMdMedium};
            white-space: pre-wrap;
        }

        .title .folder,
        .title .coins {
            width: 12px;
            min-width: 12px;
            margin-right: 8px;
        }

        .content-work-wrapper {
            .description,
            .project-links-wrapper,
            .documents-wrapper,
            .rate,
            h4 {
                padding-left: 20px;
            }
        }

        .description {
            padding-top: 12px;
            color: ${colors.grey.grey600};
        }

        .project-links-wrapper,
        .documents-wrapper {
            padding-top: 16px;
        }
    }
`;
