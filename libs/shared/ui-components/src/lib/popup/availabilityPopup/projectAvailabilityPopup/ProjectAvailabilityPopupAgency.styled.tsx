import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export type ImagePreset = {
    size?: number;
    position?: {
        top?: number;
        right?: number;
    };
};
interface StyledTipsPopupProps {
    imagePreset?: ImagePreset;
}

const getImageCss = ({ imagePreset }: StyledTipsPopupProps) => css`
    width: ${imagePreset?.size ?? 180}px;
    top: ${imagePreset?.position?.top ?? 0}px;
    right: ${imagePreset?.position?.right ?? 0}px;
`;

export const StyledTipsPopup = styled.div`
    .header-modal:not(:has(.header-right-container)) {
        padding-right: 255px;
    }
    .header-modal .header-right-container img {
        height: auto;
        ${getImageCss};
    }
    @media screen and (${mediaScreen.tablet}) {
        .header-modal:not(:has(.header-right-container)) {
            padding-right: 20px;
        }
    }
    @media screen and (${mediaScreen.maxMobile}) {
        .header-modal .label {
            font-size: 26px;
            line-height: 30px;
            padding-right: 38px;
        }
        .header-modal .note {
            line-height: 24px;
        }
    }
`;

export const StyledTipsPopupBody = styled.div`
    display: flex;
    .expanded-card {
        padding: 39px 40px 102px 60px;
        background: ${colors.mainWhite};
        min-width: calc(100% / 3);
    }
    .title {
        font-style: normal;
        font-weight: 450;
        font-size: 32px;
        line-height: 110%;
        letter-spacing: 0.002em;
        text-transform: uppercase;
        margin: 16px 0 22px;
        max-width: 250px;
        white-space: pre-line;
    }
    .text {
        font-style: normal;
        font-weight: 450;
        font-size: 18px;
        line-height: 160%;
        letter-spacing: 0.002em;
        margin: 0;
        max-width: 220px;
    }

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;
        flex: 1;

        .expanded-card {
            padding: 30px 15px;
            min-width: 100%;

            .card-content {
                .list-pitch-footer {
                    &-title {
                        font-size: 32px;
                        line-height: 110%;
                        letter-spacing: 0.002em;
                        margin: 14px 0;
                        min-width: 100%;
                    }
                    &-text {
                        line-height: 120%;
                    }
                }
            }
        }
    }

    @media screen and (${mediaScreen.maxMobile}) {
        .expanded-card {
            padding: 20px;
        }
        .card-content .title {
            margin: 0;
            font-size: 24px;
            line-height: 28px;
        }
        .card-content .text {
            margin: 8px 0 3px;
            font-size: 16px;
            line-height: 19px;
        }
    }
`;
