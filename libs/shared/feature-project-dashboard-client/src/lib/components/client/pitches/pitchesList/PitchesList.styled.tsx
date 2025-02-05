import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

export const StyledPitchesList = styled.div`
    display: flex;
    flex: 1;
    padding: 60px 0 40px;
    flex-wrap: wrap;
    gap: 25px;
    position: relative;
    width: 100%;
    max-width: 1130px;
    margin: -40px auto 0;

    @media screen and (max-width: 1100px) {
        padding: 110px 0 40px;
        margin-top: -90px;
    }

    @media screen and (max-width: 1024px) {
        padding: 20px 0 0;
        margin-top: 0;
    }

    @media screen and (max-width: 512px) {
        gap: 20px;
    }

    .pitch-shared-link {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 6px;
        top: 0;
        right: 0;

        @media screen and (max-width: 1100px) {
            left: 0;
            right: auto;
        }

        @media screen and (max-width: 1024px) {
            display: none;
        }

        :hover button {
            color: #eebba3;
            transition: none;
        }
        :hover svg path {
            stroke: #eebba3;
        }

        button {
            font-size: 12px;
            font-family: 'SuisseIntlMono';
            min-width: auto;
            padding: 0;
            color: #da6c37;
            transition: none;

            .label {
                text-decoration: underline;
            }
        }

        svg {
            margin-left: -3px;
        }
    }
`;

interface StyledReviewPitchesProps {
    readOnlyBadge?: boolean;
}

export const StyledPitchesCard = styled.div<StyledReviewPitchesProps>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 360px;
    width: 100%;
    padding: 24px 40px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #d3d3d3;
    position: relative;

    @media screen and (max-width: 512px) {
        max-width: 100%;
    }

    .badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background-color: #da6c37;
        border-radius: 100px;
        height: 19px;

        span {
            font-size: 12px;
            font-family: 'SuisseIntlMono';
            line-height: 14px;
            color: #ffffff;
            padding: 0 6px;
            font-weight: bold;
        }
    }

    .star-button {
        position: absolute;
        top: 13px;
        right: 13px;

        path {
            fill: transparent;
            stroke: #9f9f9f;
        }

        &.active path {
            fill: #e1895f;
            stroke: #e1895f;
        }

        &:hover {
            cursor: pointer;

            path {
                fill: #f4d1c1;
                stroke: #e2895f;
            }
        }

        ${({ readOnlyBadge }) =>
            readOnlyBadge &&
            css`
                pointer-events: none;
            `};
    }

    .company-info {
        display: flex;
        align-items: center;
        gap: 16px;

        .logo-wrapper {
            height: 60px;
            width: 60px;

            .logo {
                height: 60px;
                width: 60px;
                border-radius: 50%;
                box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
            }
        }

        .main-info-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;

            h3 {
                margin: 0;
                ${mixinTypography.text.tLg.textLgMedium};
                color: #2f2f2f;
                font-weight: bold;
            }

            .company-location {
                margin-left: -3px;
                ${mixinTypography.text.tXs.textXsMedium};
                color: #666666;
                align-items: center;
                display: flex;

                svg {
                    margin-bottom: 2px;
                }
            }
        }
    }

    .budget {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: -3px;

        .budget-range {
            font-size: 12px;
            line-height: 14px;
            font-family: 'SuisseIntlMono';
            min-width: auto;
            padding: 0;
            color: #2f2f2f;
            text-transform: uppercase;
        }
    }

    .status {
        ${mixinTypography.label.lS.labelSMedium};
        display: flex;
        align-items: center;
        gap: 12px;

        & .success {
            margin-left: -6px;
        }
    }

    .pitch-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 16px;

        .pill span {
            font-size: 12px;
        }

        @media screen and (max-width: 1024px) {
            .pill {
                padding: 5px 8px;
            }
        }
    }

    .review-pitch-btn {
        border-radius: 4px;
        border: none;
        margin-top: auto;
        height: 40px;
    }
`;
