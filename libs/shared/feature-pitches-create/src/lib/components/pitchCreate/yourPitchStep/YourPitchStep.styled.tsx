import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const YourPitchStepStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;

    .attention-note {
        margin: 40px 40px 0;
        cursor: default;
        ${mixinTypography.text.tMd.textMdMedium};
        border-radius: 4px;
        text-align: center;
        color: ${colors.grey.grey900};
    }
    .approach-label > span:first-of-type {
        gap: 16px;
        flex-wrap: wrap;
    }
    .approach-label .pill {
        background-color: ${colors.grey.grey50};
        font-family: 'NeueHaasDisplayWeb', sans-serif;
        letter-spacing: 0.01em;
    }
    .approach-links-wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;
        .input > span {
            padding-top: 5px;
        }
    }

    .budget-range-label .label-subtext {
        padding-bottom: 20px;
    }

    .budget-range-row {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 14px;
        font-weight: 450;
        line-height: 22px;
        height: 32px;
        letter-spacing: 0.025em;
        margin: 13px 0;
        text-transform: capitalize;
    }
    .label-subtext.subtext {
        display: flex;
        width: 100%;
        padding: 4px 0 12px;
    }

    .budget-range textarea {
        height: 81px;

        @media screen and (${mediaScreen.mobile}) {
            height: 125px;
        }
    }

    .suggested-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-height: 166px;
        margin-top: 24px;

        > h4 {
            margin: -4px 0;
            ${mixinTypography.label.lMd.labelMdMedium};
            color: ${colors.grey.grey400};
        }
    }

    .pill {
        padding-left: 12px;
        padding-right: 12px;
        height: 32px;
        background-color: ${colors.white};
    }

    .pills-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 20px;

        .pill:hover {
            background-color: ${colors.grey.grey900};
        }
    }

    .mobile-skills {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding-bottom: 16px;

        label.pill {
            height: 32px;
            background-color: ${colors.grey.grey50};
            font-family: 'NeueHaasDisplayWeb', sans-serif;
            letter-spacing: 0.01em;
        }
    }

    @media screen and (${mediaScreen.mobile}) {
        .attention-note {
            margin: 32px 0 0;
        }
        .range-wrapper label.pill {
            font-size: 16px;
        }

        .suggested-section .pill,
        .pills-wrapper label.pill {
            font-size: 14px;
            height: 32px;
            margin-left: 2px;
            margin-right: 2px;
        }
    }

    #makes-us-different-field .search-list {
        max-height: 290px;
    }
`;
