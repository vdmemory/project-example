import styled from '@emotion/styled';
import { colors, ProgressBar } from '@breef/ui-kit';
import { AnimationOpacity } from '@breef/shared/ui-components';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledProjectCreateProps {
    isReviewStep?: boolean;
}

export const StyledProjectCreate = styled.div<StyledProjectCreateProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${colors.beige};
    border-bottom: 1px solid ${colors.grey.grey100};

    ${({ isReviewStep }) =>
        isReviewStep &&
        css`
            .header-nav button {
                min-width: 80px;
            }
        `};

    .header-divider {
        border-top: 1px solid ${colors.grey.grey100};
    }

    .stepper {
        display: flex;
        flex: 1;
        justify-content: center;
    }

    .project-creation-body {
        display: flex;
        flex: 1;
    }

    button.save-exit-button {
        font-family: ${fonts.accent};
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 1px;
        background-color: transparent;
        padding: 10px 20px;
        height: 48px;

        :hover {
            color: #ffffff;
            background-color: #e69d79;
            border-color: #e69d79;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .header-divider {
            display: none;
        }

        .project-creation-body {
            flex-direction: column;
        }
    }
`;

export const StyledFlexRow = styled.div`
    display: flex;
    gap: 12px;
    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;
    }
`;

export const StyledFlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
