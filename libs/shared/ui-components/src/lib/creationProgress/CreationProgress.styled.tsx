import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, ProgressBar } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { AnimationOpacity } from '../animation/AnimationOpacity';
import { css } from '@emotion/react';

export const StyledCreationProgress = styled(AnimationOpacity)`
    display: flex;
    flex: 1;
    max-width: 300px;
    @media screen and (${mediaScreen.tablet}) {
        max-width: 100%;
        margin-top: 14px;
        margin-bottom: 24px;
    }
`;

export const StyledProgressBar = styled(ProgressBar)`
    display: flex;
    flex: 1;
    padding: 48px 32px;
    background-color: ${colors.beige};
    border-right: 1px solid ${colors.grey.grey100};
    height: 100%;

    @media screen and (${mediaScreen.tablet}) {
        border-right: none;
        justify-content: center;
        padding: 5px 34px;
    }
`;
