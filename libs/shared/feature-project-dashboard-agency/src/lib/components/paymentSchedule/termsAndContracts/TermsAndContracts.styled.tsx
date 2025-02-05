import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTermsAndContracts = styled.div`
    display: flex;

    .header {
        &-terms {
            font-family: ${fonts.accent};
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 120%;
            letter-spacing: 0.015em;
            text-transform: uppercase;
            margin-right: 25px;
        }

        &-btn {
            display: flex;
            align-items: center;

            .download-link {
                font-family: ${fonts.accent};
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 130%;
                letter-spacing: 0.015em;
                text-decoration-line: underline;
                color: ${colors.mainOrange};
                text-transform: uppercase;
                display: inline-flex;
                align-items: center;

                &:hover {
                    text-decoration: underline;
                }

                svg {
                    margin-right: 10px;
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        font-size: 10px;
        flex: 1;
        .header {
            &-terms {
                padding-right: 25px;
                margin-right: auto;
                font-size: 10px;
                line-height: 16px;
            }

            &-btn {
                .download-link {
                    font-size: 10px;
                    line-height: 16px;
                    svg {
                        width: 12px;
                        height: auto;
                        margin-bottom: 2px;
                    }
                }
            }
        }
    }
`;
