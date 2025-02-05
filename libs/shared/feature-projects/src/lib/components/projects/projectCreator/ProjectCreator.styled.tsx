import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledProjectCreator = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    .project-creator-wrapper {
        max-width: 1130px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;

        > h2 {
            margin: 0 0 20px;
            ${mixinTypography.display.dXs.displayXsMedium};
            line-height: 33px;

            @media (${mediaScreen.tablet}) {
                font-size: 20px;
                line-height: 28px;
            }
        }

        .project-creator-card {
            display: flex;
            min-height: 229px;
            border: 1px solid ${colors.grey.grey900};
            border-radius: 4px;
            background-color: ${colors.white};
            .image-wrapper {
                display: flex;
                position: relative;
                border-right: 1px solid ${colors.grey.grey900};
                width: 302px;
                min-height: 100%;
                overflow: hidden;
                img {
                    display: flex;
                    object-fit: cover;
                    transform: scale(1.01);
                    width: inherit;
                    height: 100%;
                }

                @media (${mediaScreen.laptop}) {
                    width: 100%;
                    height: 108px;
                    border-right: none;
                    border-bottom: 1px solid ${colors.grey.grey900};
                }
            }
            .project-creator-content-wrapper {
                display: flex;
                flex: 1;
                flex-direction: column;
                padding: 24px 82px 60px 24px;
                position: relative;

                @media (${mediaScreen.tablet}) {
                    padding: 24px 24px 12px 24px;
                }

                .project-creator-content-header {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid ${colors.grey.grey600};
                    margin-bottom: 24px;
                    h3 {
                        ${mixinTypography.text.tMd.textMdMedium};
                        font-size: 18px;
                        line-height: 13px;
                        margin: 0 0 16px;
                    }
                    span {
                        ${mixinTypography.text.tSmall.textSmallMedium};
                        line-height: 10px;
                        margin-bottom: 16px;

                        @media (${mediaScreen.tablet}) {
                            line-height: 20px;
                        }
                    }
                }

                .skills-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;

                    > label {
                        height: 33px;
                    }

                    @media (${mediaScreen.tablet}) {
                        margin-bottom: 15px;

                        > label {
                            min-width: 100%;
                        }
                    }
                }

                .button-add-details {
                    position: absolute;
                    right: 23px;
                    bottom: 12px;
                    height: 40px;
                    padding-right: 8px;
                    padding-top: 0;
                    padding-bottom: 0;
                    :hover:not(:disabled) {
                        background-color: ${colors.primary.primary400};
                        color: ${colors.white};
                        svg path {
                            fill: ${colors.white};
                        }
                    }

                    @media (${mediaScreen.tablet}) {
                        position: static;
                        justify-content: flex-end;
                        height: 40px;
                        padding: 0;
                        padding-left: 6px;
                        margin-left: auto;
                        min-width: auto;
                    }
                }
            }

            @media (${mediaScreen.laptop}) {
                flex-direction: column;
            }
        }
    }
`;
