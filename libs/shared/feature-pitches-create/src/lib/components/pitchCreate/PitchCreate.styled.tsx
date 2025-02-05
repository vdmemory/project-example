import styled from '@emotion/styled';
import { colors, mixinTypography, ProgressBar } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { AnimationOpacity, StartPitchPopup } from '@breef/shared/ui-components';

export const StyledPitchCreateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    background-color: ${colors.beige};
    border-bottom: 1px solid ${colors.grey.grey100};

    .stepper {
        display: flex;
        flex: 1;
    }

    .pitch-content-wrapper {
        display: flex;
        border-top: 1px solid ${colors.grey.grey100};
    }

    .content-wrapper .skill span {
        padding-top: 6px;
    }

    .navigation-animation-wrapper {
        margin-top: auto;
    }

    @media screen and (${mediaScreen.tablet}) {
        .pitch-content-wrapper {
            border-top: none;
        }

        .content-wrapper .dropzone-wrapper {
            max-width: 100%;
        }
    }
`;

export const StyledSuccessPopupContent = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 0 22px;
    margin: auto 0;
    flex-wrap: wrap;

    @media screen and (max-width: 1024px) {
        justify-content: center;
        padding: 0 0 26px;
    }

    .label {
        font-family: SuisseIntlMono;
        font-size: 12px;
        line-height: 18px;
        color: #49545c;
        text-transform: uppercase;
        margin-bottom: 13px;
        margin-top: 3px;
    }

    .item {
        width: 100%;
        height: fit-content;
        padding: 16px;
        min-height: 75px;
        display: flex;
        align-items: center;

        gap: 24px;

        @media screen and (max-width: 512px) {
            max-width: 100%;
        }

        .order {
            border-radius: 50%;
            width: 28px;
            min-width: 28px;
            height: 28px;
            background-color: #f5dbcc;
            color: #d96e34;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
        }

        .group {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .title {
            ${mixinTypography.text.tLg.textLgMedium};
            font-size: 22px;
            line-height: 25px;
            text-transform: none;
            color: ${colors.black};
            margin: 0;
        }

        .description {
            ${mixinTypography.text.tLg.textLgMedium};
            font-size: 12px;
            line-height: 14px;
            text-transform: none;
            color: #49545c;
            letter-spacing: unset;
        }
    }
`;

export const StyledProgressBarWrapper = styled(AnimationOpacity)`
    display: flex;
    flex: 1;
    max-width: 300px;
    @media screen and (${mediaScreen.tablet}) {
        display: none;
    }
`;
export const StyledProgressBar = styled(ProgressBar)`
    display: flex;
    flex: 1;
    padding: 48px 32px;
    background-color: ${colors.beige};
    border-right: 1px solid ${colors.grey.grey100} !important;
    height: 100%;
`;
