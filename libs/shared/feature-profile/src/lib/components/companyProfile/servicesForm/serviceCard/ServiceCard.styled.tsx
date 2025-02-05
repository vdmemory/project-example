import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';

export const StyledServiceCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.grey.grey900};
    background-color: ${colors.white};

    .header-section {
        display: flex;
        height: 48px;
        padding: 12px 20px;
        align-items: center;
        background-color: ${colors.secondary.secondary500};
        border-bottom: 1px solid ${colors.grey.grey900};
        justify-content: space-between;

        > span {
            ${mixinTypography.text.tXl.textXlMedium};
        }

        > button {
            outline: none;
            border: none;
            background-color: transparent;
            cursor: pointer;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            :hover {
                opacity: 0.7;
            }

            svg path,
            svg line {
                stroke: ${colors.error.error500};
            }
        }
    }

    .card-body-wrapper {
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 40px;
        max-width: 650px;
    }

    .work-card {
        background-color: ${colors.grey.grey50};
    }
    .link-button {
        width: fit-content;
    }
`;

export const StyledServiceField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    .label {
        font-size: 12px;
        font-weight: 400;
        line-height: 9px;
        letter-spacing: 0.05em;
        font-family: ${fonts.accent};
        color: ${colors.grey.grey400};
        text-transform: uppercase;
    }
`;
