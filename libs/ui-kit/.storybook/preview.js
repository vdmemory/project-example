const { css, Global } = require('@emotion/react');
const { withThemeFromJSXProvider } = require('@storybook/addon-styling');
const { colors } = require('../src/lib/styles');

const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                color: ${colors.grey.grey900};
                font-family: 'NeueHaasDisplay', sans-serif;

                @font-face {
                    font-family: 'SuisseIntlMono';
                    src: url('/fonts/suisse-int-mono/SuisseIntlMono-Regular.ttf');
                    font-display: swap;
                }
                @font-face {
                    font-family: 'MonoBold';
                    src: url('/fonts/suisse-int-mono/SuisseIntlMono-Bold.ttf');
                    font-display: swap;
                }
                @font-face {
                    font-family: 'MonoThin';
                    src: url('/fonts/suisse-int-mono/SuisseIntlMono-Thin.ttf');
                    font-display: swap;
                }
                @font-face {
                    font-family: 'NeueHaasDisplay';
                    src: url('/fonts/neue-haas-grotesk/NeueHaasGroteskDisplayProRoman.ttf');
                    font-display: swap;
                }
                @font-face {
                    font-family: 'NeueHaasText';
                    src: url('/fonts/neue-haas-grotesk/NeueHaasGroteskTextProRoman.ttf');
                    font-display: swap;
                }
                @font-face {
                    font-family: 'BiroScriptPlusRegular';
                    src: url('/fonts/biro-script-plus/BiroScriptPlus-Regular.ttf');
                    font-display: swap;
                }
                @font-face {
                    font-family: 'BiroScriptPlusBold';
                    src: url('/fonts/biro-script-plus/BiroScriptPlus-Bold.ttf');
                    font-display: swap;
                }

                #root {
                    width: 650px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            `}
        />
    );
};

export const parameters = {
    // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
    actions: { argTypesRegex: '^on.*' },
    layout: 'centered',
};

export const decorators = [
    withThemeFromJSXProvider({
        GlobalStyles,
    }),
];
