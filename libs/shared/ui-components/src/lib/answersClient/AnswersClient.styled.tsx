import styled from '@emotion/styled';
import { mediaScreen, fonts } from '@breef/shared/assets/variables';
import { colors as colorsUiKit, mixinTypography } from '@breef/ui-kit';

export const StyledAnswersClientWrapper = styled.div`
    padding-right: 0 !important;
    padding-left: 54px;

    outline: 1px solid ${colorsUiKit.grey.grey900};
    overflow: hidden;
    @media (${mediaScreen.tablet}) {
        padding-left: 0;
        @media (pointer: coarse) {
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .answers-block {
            flex-direction: column;
            padding-left: 0;

            .answers-list-wrapper {
                min-width: fit-content;
                width: 100%;
                flex: 1;
            }
        }
    }
`;

export const StyledAnswers = styled.div`
    display: flex;
    min-height: 360px;
    flex: 1;

    .answers {
        &-sidebar {
            display: flex;
            flex-direction: column;
            padding: 40px;
            position: relative;
            min-width: 350px;
            max-width: 422px;
            width: 100%;
            border-right: 1px solid ${colorsUiKit.grey.grey900};

            @media (${mediaScreen.tablet}) {
                border-right: none;
                border-bottom: 1px solid ${colorsUiKit.grey.grey900};
                min-width: 100%;
                max-width: 100%;
                flex-direction: row;
                justify-content: space-between;
                padding: 30px 15px;
            }

            &-title {
                max-width: 274px;
                font-weight: 400;
                font-size: 48px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                color: ${colorsUiKit.grey.grey900};
                margin: 0 0 12px;

                @media (${mediaScreen.tablet}) {
                    font-size: 32px;
                    max-width: 100%;
                    margin: 0;
                }
            }
            > .answers-sidebar-label {
                text-transform: uppercase;
                color: ${colorsUiKit.grey.grey700};
                font-family: ${fonts.accent};
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                letter-spacing: 0.05em;
                margin-bottom: 12px;

                @media (${mediaScreen.tablet}) {
                    display: none;
                }
            }
            > .answers-sidebar-note {
                ${mixinTypography.text.tLg.textLgMedium};
                color: ${colorsUiKit.grey.grey700};
                margin-bottom: 32px;

                @media (${mediaScreen.tablet}) {
                    display: none;
                }
            }
        }

        &-list-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1;

            > div + div {
                border-top: 1px solid ${colorsUiKit.grey.grey900};
            }
        }
    }
`;
