import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import Tag from '../tag/Tag';

export const StyledReviewProjectCreation = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.05),
        0px 12px 16px -4px rgba(16, 24, 40, 0.1);
    max-width: 1140px;
    width: calc(100vw - 80px);
    overflow: hidden;
    border: 1px solid ${colors.grey.grey50};
    border-radius: 2px;
    flex: 1;
    background-color: ${colors.white};
    padding: 40px;

    .review-block {
        position: relative;
    }

    .title-wrapper {
        display: inline-flex;
        align-items: center;
    }

    .tooltip {
        display: inline-flex;

        .tooltip-icon {
            width: 12px;
            height: 12px;
            margin-left: 4px;
        }
    }

    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid ${colors.grey.grey600};
        padding-bottom: 20px;

        > h1 {
            flex: 1;
            margin: -5.5px 0;
            ${mixinTypography.display.dXs.displayXsMedium};
            white-space: pre-wrap;
        }
    }

    .project-key-info-wrapper {
        display: flex;
        padding: 32px 0 0;

        .project-key-info-content {
            display: flex;
            gap: 40px;
            flex: 1;
            margin-right: 10px;
        }

        .key-info-item {
            display: flex;
            flex-direction: column;
            max-width: 180px;
            gap: 12px;
            min-width: 80px;

            &-wider {
                min-width: 138px;
            }

            .title,
            .value,
            .value-children {
                ${mixinTypography.text.tSmall.textSmallMedium};
                white-space: pre-wrap;
                word-break: break-word;
                margin: -4px 0;
            }

            .title {
                color: ${colors.grey.grey900};
                -webkit-text-stroke-width: 0.1px;
                -webkit-text-stroke-color: ${colors.grey.grey900};
                white-space: nowrap;
            }

            .value,
            .value-children {
                color: ${colors.grey.grey600};
            }

            .website-link {
                color: ${colors.primary.primary500};
                text-decoration: none;

                :hover {
                    text-decoration: underline;
                    color: ${colors.primary.primary300};
                }

                &-disabled {
                    color: #68737d;
                    cursor: not-allowed;
                }
            }

            :first-of-type .title {
                ${mixinTypography.text.tLg.textLgMedium};
                margin: -5.5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .underline {
        width: 130px;
    }

    .files-wrapper,
    .links-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid #e9ebed;
        width: calc(100% + 23px);
        max-width: calc(100% + 23px);
        margin-top: 20px;
        padding-top: 20px;
        @media (${mediaScreen.tablet}) {
            width: 100%;
            max-width: 100%;
            border: none;
            margin-top: 32px;
            padding-top: 0;
            gap: 16px;
            flex-direction: row;
            flex-wrap: wrap;

            + .links-wrapper {
                border-top: 1px solid #e9ebed;
                padding-top: 32px;
            }
        }
    }

    .skill-wrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;

        + .skill-wrapper {
            margin-top: 40px;
        }
    }

    .tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .ideal-agency-description {
        margin-top: 20px;
    }

    @media screen and (max-width: 1200px){
        .project-key-info-wrapper {
            .project-key-info-content {
                gap: 20px;
            }
    }

    @media screen and (${mediaScreen.tablet}) {
        box-shadow: none;
        border: none;
        width: 100vw;
        max-width: 100% !important;
        padding: 32px 16px;

        .header-section {
            > h1 {
                font-size: 26px;
                font-weight: 450;
                line-height: 30px;
                letter-spacing: -0.00042765619582496583px;
                text-align: left;
                white-space: pre-wrap;
            }
        }

        .project-key-info-wrapper {
            padding: 20px 0 0;

            .project-key-info-content {
                flex-direction: column;
            }

            .key-info-item {
                max-width: 100%;
                gap: 5px;

                &-wider {
                    gap: 4px;
                }

                .title,
                .value,
                .value-children {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 450;
                    line-height: normal;
                    letter-spacing: 0;
                    text-align: left;
                }

                :first-of-type .title {
                    font-size: 18px;
                    font-weight: 450;
                    line-height: normal;
                    min-height: 21px;
                    letter-spacing: 0;
                    margin: 0;
                    white-space: pre-wrap;
                    word-break: break-word;
                }
            }
        }

        .skill-wrapper {
            gap: 16px;
        }
    }
`;

export const StyledTag = styled(Tag)`
    color: #a85528;
    border: 1px solid #e8a885;
    background-color: #fbf0eb;
    ${mixinTypography.text.tSmall.textSmallMedium};
    text-transform: none;
    height: 28px;
    gap: 4px;
`;
