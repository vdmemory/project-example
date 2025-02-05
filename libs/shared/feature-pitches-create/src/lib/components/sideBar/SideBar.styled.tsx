import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledSideBar = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: start;
    flex-direction: column;
    width: 300px;
    padding: 32px;
    border-left: 1px solid ${colors.grey.grey100};
    background-color: ${colors.beige};

    h2.title {
        font-size: 22px;
        font-weight: 450;
        line-height: 20px;
        letter-spacing: 0.01em;
        margin: -2px 0 10px;
    }

    .link button {
        margin: 0 0 27px 0;
        padding: 0;
        justify-content: left;
        ${mixinTypography.label.lS.labelSMedium};

        .label {
            gap: 4px;

            svg {
                width: 16px;
                height: 16px;
                min-width: 16px;
            }
        }
    }

    .group-card {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 100%;
    }
`;

export const StyledBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 100%;

    .tooltip {
        margin-left: 4px;
        height: 14px;
        .tooltip-icon {
            width: 14px;
            height: 14px;
            margin-top: 2px;
        }
    }

    h3.title {
        display: inline-flex;
        width: fit-content;
        ${mixinTypography.text.tSmall.textSmallMedium};
        color: ${colors.grey.grey500};
        margin: -4px 0;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }
`;

export const StyledText = styled.p`
    ${mixinTypography.text.tSmall.textSmallMedium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: -4px 0;
`;
