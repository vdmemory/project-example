import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { mixinTypography } from '@breef/ui-kit';

export const StyledStepSection = styled.section`
    display: flex;
    flex: 1;
    padding: 48px 40px 64px;
    justify-content: center;

    .section-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 650px;
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 0;

        .progress-bar {
            gap: 6px;

            & > div {
                padding: 0;
            }

            .label {
                ${mixinTypography.mobile.label.mobileLabelXs};
            }
        }
    }
`;
