import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    .header {
        display: flex;
        position: relative;

        .label {
            position: absolute;
            top: -13px;
            left: 24px;
            background-color: transparent;
            padding: 0 10px;
            ${mixinTypography.label.lLg.labelLgMedium}
            z-index: 1;

            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background-color: ${colors.white};
                z-index: -1;
            }

            @media (${mediaScreen.tablet}) {
                left: 15px;
                padding: 0 5px;
            }
        }
    }

    .content {
        display: flex;
        flex: 1;
        padding: 24px;
    }

    button {
        width: 100%;
        border: none;
        border-top: 1px solid ${colors.grey.grey900};
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        height: 56px;
        text-transform: uppercase;

        span {
            font-size: 16px;
            line-height: 20px;
            transition: all 0.3s ease-in-out;

            @media (${mediaScreen.tablet}) {
                font-size: 18px;
            }
        }

        .label svg {
            width: 20px;
            min-width: 20px;
        }

        .label svg path {
            fill: ${colors.white};
            transition: all 0.2s ease-in-out;
        }
    }
`;
