import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPersonalizeScopeStep = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 40px;

    .project-overview-textarea {
        margin-bottom: 24px;

        & textarea {
            height: 200px;

            @media screen and (${mediaScreen.tablet}) {
                height: 250px;
            }
        }
    }

    .skills-field-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .additional-links-wrapper {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .files-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .skill-item {
        display: flex;
        flex-direction: column;

        + .skill-item {
            margin-top: 38px;
        }

        :first-of-type {
            margin-top: 8px;
        }

        + .button-add-skill {
            margin-top: 30px;
        }

        .dropdown .input > span {
            padding-top: 5px;
        }

        & textarea {
            height: 250px;
        }
    }

    .skill-label {
        ${mixinTypography.text.tSmall.textSmallMedium};
        color: ${colors.grey.grey600};
        margin-top: 20px;
        margin-bottom: 8px;
    }

    .button-add-skill {
        width: fit-content;
        background-color: transparent;
        height: 32px;
        font-family: ${fonts.accent};
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 1px;
    }
`;
