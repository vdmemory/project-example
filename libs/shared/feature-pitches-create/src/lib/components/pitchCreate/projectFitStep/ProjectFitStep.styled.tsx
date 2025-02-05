import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledProjectFitStep = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    .label-subtext {
        letter-spacing: 0;
    }

    .client-fit-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const StyledFieldInfo = styled.div`
    + * {
        margin-top: 30px;
    }
    > .field-info-content {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        span {
            ${mixinTypography.text.tLg.textLgMedium};
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
    }
`;

export const StyledSelectButtonsWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    max-width: 520px;
    min-height: 132px;

    .loading-section {
        color: ${colors.grey.grey500};
    }

    @media screen and (${mediaScreen.maxMobile}) {
        & > label {
            min-width: unset;
            font-size: 12px;

            :hover {
                background-color: ${colors.white};
                color: inherit;
            }
        }
    }

    > * {
        flex: 0.5;
    }
`;
