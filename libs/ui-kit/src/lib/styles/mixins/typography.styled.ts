import { fontSize, lineHeight } from '../font';
import { css } from '@emotion/react';

const display2xl = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs72};
    line-height: ${lineHeight.lh90};
    letter-spacing: -0.02em;
`;

const displayXl = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs60};
    line-height: ${lineHeight.lh72};
    letter-spacing: -0.02em;
`;

const displayLg = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs48};
    line-height: ${lineHeight.lh60};
    letter-spacing: -0.02em;
`;

const displayMd = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs36};
    line-height: ${lineHeight.lh44};
    letter-spacing: -0.02em;
`;

const displaySm = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs30};
    line-height: ${lineHeight.lh38};
`;

const displayXs = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs24};
    line-height: ${lineHeight.lh32};
`;

const mobileDisplay = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
`;

const mobileText = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-weight: 500;
`;

const mobileLabel = css`
    font-family: 'SuisseIntlMono';
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
`;

const mobileDisplayXl = css`
    ${mobileDisplay};
    font-size: ${fontSize.fs36};
    line-height: ${lineHeight.lh44};
    font-weight: 600;
`;

const mobileDisplayLg = css`
    ${mobileDisplay};
    font-size: ${fontSize.fs32};
    line-height: ${lineHeight.lh40};
    font-weight: 600;
`;
const mobileDisplayMd = css`
    ${mobileDisplay};
    font-size: ${fontSize.fs28};
    line-height: ${lineHeight.lh36};
    font-weight: 500;
`;
const mobileDisplaySm = css`
    ${mobileDisplay};
    font-size: ${fontSize.fs24};
    line-height: ${lineHeight.lh32};
    font-weight: 500;
`;

const mobileDisplayXs = css`
    ${mobileDisplay};
    font-size: ${fontSize.fs20};
    line-height: ${lineHeight.lh28};
    font-weight: 500;
`;

const mobileTextLg = css`
    ${mobileText};
    font-size: ${fontSize.fs18};
    line-height: ${lineHeight.lh24};
    letter-spacing: 0.01em;
`;

const mobileTextMd = css`
    ${mobileText};
    font-size: ${fontSize.fs16};
    line-height: ${lineHeight.lh24};
    letter-spacing: 0.02em;
`;
const mobileTextSm = css`
    ${mobileText};
    font-size: ${fontSize.fs14};
    line-height: ${lineHeight.lh18};
    letter-spacing: 0.02em;
`;

const mobileTextXs = css`
    ${mobileText};
    font-size: ${fontSize.fs12};
    line-height: ${lineHeight.lh16};
    letter-spacing: 0.01em;
`;

const caption = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-weight: 500;
    font-size: ${fontSize.fs10};
    line-height: ${lineHeight.lh16};
    letter-spacing: 0.01em;
    text-transform: uppercase;
`;

const mobileLabelLg = css`
    ${mobileLabel};
    font-size: ${fontSize.fs18};
    line-height: ${lineHeight.lh24};
`;
const mobileLabelMd = css`
    ${mobileLabel};
    font-size: ${fontSize.fs16};
    line-height: ${lineHeight.lh24};
`;
const mobileLabelSm = css`
    ${mobileLabel};
    font-size: ${fontSize.fs14};
    line-height: ${lineHeight.lh20};
`;
const mobileLabelXs = css`
    ${mobileLabel};
    font-size: ${fontSize.fs12};
    line-height: ${lineHeight.lh16};
`;

const textXl = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs20};
    line-height: ${lineHeight.lh28};
`;

const textLg = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs18};
    line-height: ${lineHeight.lh24};
`;

const textMd = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs16};
`;

const textSmall = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs14};
`;

const textXs = css`
    font-family: 'NeueHaasDisplay';
    font-style: normal;
    font-size: ${fontSize.fs12};
    line-height: ${lineHeight.lh12};
    letter-spacing: 0.01em;
`;

const labelLg = css`
    font-family: 'SuisseIntlMono';
    font-style: normal;
    font-size: ${fontSize.fs16};
    line-height: ${lineHeight.lh24};
    letter-spacing: -0.02em;
    text-transform: uppercase;
`;

const labelMd = css`
    font-family: 'SuisseIntlMono';
    font-style: normal;
    font-size: ${fontSize.fs14};
    letter-spacing: -0.02em;
    text-transform: uppercase;
`;

const labelS = css`
    font-family: 'SuisseIntlMono';
    font-style: normal;
    font-size: ${fontSize.fs12};
    letter-spacing: -0.02em;
    text-transform: uppercase;
`;

const display2xlRegular = css`
    ${display2xl};
    font-weight: 400;
`;
const display2xlMedium = css`
    ${display2xl};
    font-weight: 500;
`;
const display2xlSemibold = css`
    ${display2xl};
    font-weight: 600;
`;
const display2xlBold = css`
    ${display2xl};
    font-weight: 700;
`;

const displayXlRegular = css`
    ${displayXl};
    font-weight: 400;
`;

const displayXlMedium = css`
    ${displayXl};
    font-weight: 500;
`;

const displayXlSemibold = css`
    ${displayXl};
    font-weight: 600;
`;

const displayXlBold = css`
    ${displayXl};
    font-weight: 700;
`;

const displayLgRegular = css`
    ${displayLg};
    font-weight: 400;
`;

const displayLgMedium = css`
    ${displayLg};
    font-weight: 500;
`;

const displayLgSemibold = css`
    ${displayLg};
    font-weight: 600;
`;

const displayLgBold = css`
    ${displayLg};
    font-weight: 700;
`;

const displayMdRegular = css`
    ${displayMd};
    font-weight: 400;
`;

const displayMdMedium = css`
    ${displayMd};
    font-weight: 500;
`;

const displayMdSemibold = css`
    ${displayMd};
    font-weight: 600;
`;

const displayMdBold = css`
    ${displayMd};
    font-weight: 700;
`;

const displaySmRegular = css`
    ${displaySm};
    font-weight: 400;
`;

const displaySmMedium = css`
    ${displaySm};
    font-weight: 500;
    line-height: ${lineHeight.lh34};
`;

const displaySmSemibold = css`
    ${displaySm};
    font-weight: 600;
`;

const displaySmBold = css`
    ${displaySm};
    font-weight: 700;
`;

const displayXsRegular = css`
    ${displayXs};
    font-weight: 400;
`;

const displayXsMedium = css`
    ${displayXs};
    font-weight: 500;
    line-height: ${lineHeight.lh28};
`;

const displayXsSemibold = css`
    ${displayXs};
    font-weight: 600;
`;

const displayXsBold = css`
    ${displayXs};
    font-weight: 700;
`;

const textXlRegular = css`
    ${textXl};
    font-weight: 400;
    line-height: ${lineHeight.lh20};
`;

const textXlMedium = css`
    ${textXl};
    font-weight: 500;
`;

const textXlSemibold = css`
    ${textXl};
    font-weight: 600;
`;

const textXlBold = css`
    ${textXl};
    font-weight: 700;
`;

const textLgRegular = css`
    ${textLg};
    font-weight: 400;
`;

const textLgMedium = css`
    ${textLg};
    font-weight: 500;
    letter-spacing: 0.025em;
`;

const textLgSemibold = css`
    ${textLg};
    font-weight: 600;
`;

const textLgBold = css`
    ${textLg};
    font-weight: 700;
`;

const textMdRegular = css`
    ${textMd};
    font-weight: 400;
    line-height: ${lineHeight.lh20};
`;

const textMdMedium = css`
    ${textMd};
    font-weight: 500;
    line-height: ${lineHeight.lh20};
    letter-spacing: 0.025em;
`;

const textMdSemibold = css`
    ${textMd};
    font-weight: 600;
    line-height: ${lineHeight.lh24};
`;

const textMdBold = css`
    ${textMd};
    font-weight: 700;
    line-height: ${lineHeight.lh24};
`;

const textSmallRegular = css`
    ${textSmall};
    font-weight: 400;
    line-height: ${lineHeight.lh14};
    letter-spacing: 0.01em;
`;

const textSmallMedium = css`
    ${textSmall};
    font-weight: 500;
    line-height: ${lineHeight.lh18};
    letter-spacing: 0.025em;
`;

const textSmallSemibold = css`
    ${textSmall};
    font-weight: 600;
    line-height: ${lineHeight.lh14};
    letter-spacing: 0.01em;
`;

const textSmallBold = css`
    ${textSmall};
    font-weight: 700;
    line-height: ${lineHeight.lh14};
    letter-spacing: 0.01em;
`;

const textXsRegular = css`
    ${textXs};
    font-weight: 400;
    line-height: ${lineHeight.lh14};
`;

const textXsMedium = css`
    ${textXs};
    font-weight: 500;
    line-height: ${lineHeight.lh12};
`;

const textXsSemibold = css`
    ${textXs};
    font-weight: 600;
`;

const textXsBold = css`
    ${textXs};
    font-weight: 700;
    line-height: ${lineHeight.lh14};
`;

const labelLgRegular = css`
    ${labelLg};
    font-weight: 275;
`;

const labelLgMedium = css`
    ${labelLg};
    font-weight: 400;
`;

const labelLgUnderlined = css`
    ${labelLg};
    font-weight: 400;
    text-decoration: underline;
`;

const labelLgBold = css`
    ${labelLg};
    font-weight: 700;
`;

const labelMdRegular = css`
    ${labelMd};
    font-weight: 275;
    line-height: ${lineHeight.lh14};
`;

const labelMdMedium = css`
    ${labelMd};
    font-weight: 400;
    line-height: ${lineHeight.lh18};
`;

const labelMdUnderlined = css`
    ${labelMd};
    font-weight: 400;
    text-decoration: underline;
    line-height: ${lineHeight.lh18};
`;

const labelMdBold = css`
    ${labelMd};
    font-weight: 700;
    line-height: ${lineHeight.lh16};
`;

const labelSRegular = css`
    ${labelS};
    font-weight: 275;
    line-height: ${lineHeight.lh18};
`;

const labelSMedium = css`
    ${labelS};
    font-weight: 400;
    line-height: ${lineHeight.lh16};
`;

const labelSBold = css`
    ${labelS};
    font-weight: 700;
    line-height: ${lineHeight.lh16};
`;

export const mixinTypography = {
    display: {
        d2xl: {
            display2xlRegular,
            display2xlMedium,
            display2xlSemibold,
            display2xlBold,
        },
        dXl: {
            displayXlRegular,
            displayXlMedium,
            displayXlSemibold,
            displayXlBold,
        },
        dLg: {
            displayLgRegular,
            displayLgMedium,
            displayLgSemibold,
            displayLgBold,
        },
        dMd: {
            displayMdRegular,
            displayMdMedium,
            displayMdSemibold,
            displayMdBold,
        },
        dSm: {
            displaySmRegular,
            displaySmMedium,
            displaySmSemibold,
            displaySmBold,
        },
        dXs: {
            displayXsRegular,
            displayXsMedium,
            displayXsSemibold,
            displayXsBold,
        },
    },
    text: {
        tXl: {
            textXlRegular,
            textXlMedium,
            textXlSemibold,
            textXlBold,
        },
        tLg: {
            textLgRegular,
            textLgMedium,
            textLgSemibold,
            textLgBold,
        },
        tMd: {
            textMdRegular,
            textMdMedium,
            textMdSemibold,
            textMdBold,
        },
        tSmall: {
            textSmallRegular,
            textSmallMedium,
            textSmallSemibold,
            textSmallBold,
        },
        tXs: {
            textXsRegular,
            textXsMedium,
            textXsSemibold,
            textXsBold,
        },
    },
    label: {
        lLg: {
            labelLgRegular,
            labelLgMedium,
            labelLgUnderlined,
            labelLgBold,
        },
        lMd: {
            labelMdRegular,
            labelMdMedium,
            labelMdUnderlined,
            labelMdBold,
        },
        lS: {
            labelSRegular,
            labelSMedium,
            labelSBold,
        },
    },
    mobile: {
        display: {
            mobileDisplayXl,
            mobileDisplayLg,
            mobileDisplayMd,
            mobileDisplaySm,
            mobileDisplayXs,
        },
        text: {
            mobileTextLg,
            mobileTextMd,
            mobileTextSm,
            mobileTextXs,
        },
        caption: caption,
        label: {
            mobileLabelLg,
            mobileLabelMd,
            mobileLabelSm,
            mobileLabelXs,
        },
    },
};
