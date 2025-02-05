import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';

export const StyledTipCard = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 25%;
    padding: 45px 38px;
    background: ${colors.mainPurple};
    justify-content: space-between;

    .text-group {
        display: flex;
        flex-direction: column;

        & .title-card {
            font-size: 12px;
            opacity: 0.4;
            font-family: 'SuisseIntlMono', serif;
            text-transform: uppercase;
            margin-bottom: 25px;
        }

        .description {
            font-size: 18px;
            line-height: 29px;
            white-space: pre-wrap;
            letter-spacing: 0.002em;
            margin-bottom: 45px;

            a {
                color: ${colors.mainOrange};
                text-decoration: none;
            }
        }
    }
    .author-wrapper {
        display: flex;
        flex: 1;
        align-items: flex-end;
        margin-top: 15px;
    }
    .author {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-direction: column;
        &.fixed {
            position: -webkit-sticky;
            position: sticky;
            top: auto !important;
            bottom: 100px !important;
            height: fit-content;
        }

        .lead-name {
            font-family: BiroScriptPlusRegular;
            font-size: 22px;
            font-weight: 400;
            line-height: 28.6px;
            display: flex;
            align-items: center;
            width: 100%;
            img {
                height: 70px;
                border-radius: 50%;
                margin-right: 20px;
            }
        }

        .download {
            position: relative;
            display: flex;
            font-size: 18px;
            line-height: 1;
            align-items: center;
            white-space: pre-wrap;
            letter-spacing: 0.002em;
            margin: 0;
            width: 100%;
            &-icon {
                max-width: 30px;
                max-height: 30px;
                min-width: 30px;
                min-height: 30px;
                margin-right: 15px;
                &:hover {
                    cursor: pointer;
                }
            }

            .spinner {
                display: block;
                position: relative;
                width: 30px;
                height: 30px;
                right: 0;
                top: 0;
                margin-right: 15px;
                transform: translate(0, 0);

                > div {
                    width: 25px;
                    height: 25px;
                    border-width: 2px;
                    margin: 0;
                }
            }
        }
    }
`;
