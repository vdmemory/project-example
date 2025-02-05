import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledOurAgencyStep = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    .about-us-wrapper {
        display: flex;
        gap: 20px;

        textarea {
            height: 125px;
        }
    }

    .agency-links-wrapper {
        input {
            max-width: 200px;
        }

        .links-fields-row {
            display: flex;
            flex-wrap: wrap;
        }
    }

    input {
        padding-left: 20px;
        padding-right: 20px;
    }

    .mobile-agency {
        display: flex;
        gap: 14px;

        .logo-editor {
            .button-image {
                width: 63px;
                height: 64px;

                .image-cropped {
                    width: 59px;
                    height: 60px;
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .about-us-wrapper {
            gap: 4px;
        }
        .agency-links-wrapper .links-fields-row {
            > * {
                width: 100%;
            }
        }
        .agency-links-wrapper input {
            width: 100% !important;
            max-width: 100% !important;
        }
    }
`;

export const StyledFieldInfo = styled.div`
    margin-bottom: 30px;

    :first-of-type {
        margin-right: 20px;
    }

    > .field-info-content {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        span {
            ${mixinTypography.text.tMd.textMdMedium};
        }
        svg {
            width: 20px;
            min-width: 20px;
            height: 20px;
            path,
            circle {
                stroke: ${colors.grey.grey900};
            }
        }
        .instagram-icon {
            width: 24px;
            min-width: 24px;
            height: 24px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        max-width: 100%;

        :first-of-type {
            margin-right: 0;
        }
    }
`;

export const StyledView = styled.p`
    display: block;
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    padding: 14px 12px;
    background-color: ${colors.white};
    width: 100%;

    ${mixinTypography.mobile.display.mobileDisplayMd};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;

    @media screen and (max-width: 660px) {
        max-width: 350px;
    }
    @media screen and (max-width: 460px) {
        max-width: 280px;
    }
`;
