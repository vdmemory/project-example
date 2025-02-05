import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import { mixinTypography } from '@breef/ui-kit';

interface StyledProjectsViewSettingsBarProps {
    isClient: boolean;
}

const clientStyles = css`
    padding-top: 0;
    padding-bottom: 20px;

    .filter-label {
        ${mixinTypography.display.dXs.displayXsMedium};
    }

    @media (${mediaScreen.tablet}) {
        padding-top: 0;
        padding-bottom: 20px;
        .filter-label {
            ${mixinTypography.display.dXs.displayXsMedium};
        }
    }
`;
export const StyledProjectsViewSettingsBar = styled.div`
    display: flex;
    padding-top: 40px;
    padding-bottom: 50px;

    .filter-label {
        text-transform: uppercase;
        font-size: 32px;
        line-height: 35px;
        letter-spacing: 0.002em;
    }
    @media (${mediaScreen.tablet}) {
        padding-top: 20px;
        padding-bottom: 30px;
        .filter-label {
            line-height: 150%;
        }
    }

    ${({ isClient }: StyledProjectsViewSettingsBarProps) =>
        isClient && clientStyles};
`;
