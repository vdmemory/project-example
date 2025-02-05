import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { AnimationOpacity } from '@breef/shared/ui-components';
import { css } from '@emotion/react';

interface StepWrapperProps {
    isLoading?: boolean;
}

export const StyledStepWrapper = styled(AnimationOpacity)`
    display: flex;
    flex: 1;
    min-width: 525px;
    max-width: 650px;
    width: 525px;
    padding: 48px 40px 64px;
    flex-direction: column;

    > h2 {
        margin: 0 0 8px;
        font-size: 56px;
        font-weight: 450;
        line-height: 64px;
        letter-spacing: 0;
        text-align: left;
    }

    > p.description {
        margin: 0 0 30px;
        font-family: 'NeueHaasDisplay';
        font-style: normal;
        font-size: 22px;
        line-height: 25px;
        color: #68737d;
    }

    .divider {
        border-bottom: 1px solid ${colors.grey.grey100};
    }

    textarea {
        height: 125px;
    }

    .skill-item .skill-textarea.loading {
        pointer-events: none;
        opacity: 0.5;
    }

    // .skill-item .skill-label.loading {
    //     pointer-events: none;
    //     opacity: 0.5;
    // }

    .step-body {
        display: flex;
        flex: 1;
        flex-direction: column;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
        pointer-events: auto;

        ${({ isLoading }: StepWrapperProps) =>
            isLoading &&
            css`
                pointer-events: none;
                opacity: 0.5;
            `}

        > div {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 40px;
            margin: 43px 0;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        min-width: auto;
        padding: 24px 16px 70px;
        margin: 0;

        > h2 {
            ${mixinTypography.display.dSm.displaySmMedium};
            margin-bottom: 12px;
        }

        > p.description {
            font-size: 16px;
            line-height: 18px;
            margin-bottom: 12px;
        }

        .progress-bar {
            gap: 6px;

            & > div {
                padding: 0;
            }

            .label {
                ${mixinTypography.mobile.label.mobileLabelXs};
            }
        }

        .step-body {
            > div {
                margin: 24px 0;
            }
        }
    }
`;
