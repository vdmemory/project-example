import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledSuccessPopup = styled.div`
    padding: 64px;

    .popup-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        svg {
            width: 40px;
            min-width: 40px;
            height: 40px;
        }

        h3 {
            ${mixinTypography.display.dSm.displaySmMedium};
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.grey.grey900};
            margin: -6.5px 0;
        }
        span {
            ${mixinTypography.text.tSmall.textSmallMedium};
            color: ${colors.grey.grey600};
            margin: -4px 0;
        }
    }

    .close-wrapper {
        display: flex;
        width: 28px;
        height: 28px;
        border: none;
        background-color: transparent;
        position: absolute;
        top: 20px;
        right: 20px;

        :hover {
            opacity: 0.6;
        }

        .close-button {
            cursor: pointer;
            width: 28px;
            height: 28px;
        }
    }

    .button-save {
        height: 42px;
        width: 100%;
        border-radius: 2px;
        border: none;
        margin-top: 32px;

        span.label {
            ${mixinTypography.text.tSmall.textSmallMedium};
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.white};
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 20px 20px 32px;

        .popup-body {
            gap: 12px;

            h3 {
                ${mixinTypography.mobile.display.mobileDisplayMd};
                margin: 0;
            }

            span {
                ${mixinTypography.mobile.text.mobileTextSm};
                margin: 0;
            }
        }

        .close-wrapper {
            top: 5px;
            right: 5px;
        }

        .button-save {
            height: 40px;
            span.label {
                ${mixinTypography.text.tMd.textMdMedium};
                -webkit-text-stroke-width: 0.1px;
            }
        }
    }
`;

export const getPopupStylePreset = (isMobile?: boolean) => {
    return {
        overflow: !isMobile ? 'visible' : 'auto',
        maxWidth: '788px',
        minWidth: '320px',
        maxHeight: '100%',
        width: '100%',
        borderRadius: '4px',
        boxShadow: isMobile
            ? '0px 4px 8px 0 rgba(0, 0, 0, 0.15)'
            : '0px 20px 28px 0 rgba(47, 57, 65, 0.35)',
        border: 'none',
    } as React.CSSProperties;
};
