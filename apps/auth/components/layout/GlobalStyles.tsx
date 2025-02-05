import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from '@breef/ui-kit';

export default function GlobalStyles() {
    return (
        <>
            <Global
                styles={css`
                    ${emotionNormalize}
                    * {
                        box-sizing: border-box;
                        ::-webkit-scrollbar-track {
                            -webkit-box-shadow: inset 0 0 4px transparent;
                            border-radius: 10px;
                            background-color: transparent;
                        }

                        ::-webkit-scrollbar {
                            width: 4px;
                            height: 4px;
                            background-color: transparent;
                        }

                        ::-webkit-scrollbar-thumb {
                            border-radius: 10px;
                            -webkit-box-shadow: inset 0 0 4px transparent;
                            background-color: ${colors.grey.grey300};
                        }
                    }
                `}
            />
            <Global
                styles={css`
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
                `}
            />
            <Global
                styles={css`
                    html {
                        scroll-behavior: smooth;
                    }
                    html,
                    body {
                        color: ${colors.grey.grey900};
                        font-family: 'NeueHaasDisplay', sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        button,
                        a {
                            outline: none;
                        }
                        &.open-modal {
                            overflow: hidden !important;
                        }

                        -webkit-overflow-scrolling: touch !important;
                    }
                `}
            />
        </>
    );
}
