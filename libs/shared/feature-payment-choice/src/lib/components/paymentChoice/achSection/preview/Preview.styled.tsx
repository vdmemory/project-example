import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { colors, mixinTypography } from '@breef/ui-kit';

import styled from '@emotion/styled';

export const StyledPreview = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    button {
        @media (${mediaScreen.tablet}) {
            text-transform: capitalize;
            font-size: 24px;
        }
    }
    ${simpleAnimation}

    .stub-preview {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 18px;
        white-space: pre-wrap;
        text-align: center;

        .group {
            display: flex;
            margin-bottom: 24px;

            .line {
                height: 1px;
                width: 38px;
                margin: 19.5px 0;
                background-color: ${colors.grey.grey900};
                position: relative;
                z-index: 1;

                :after {
                    content: '';
                    display: block;
                    width: 5px;
                    height: 5px;
                    background-color: ${colors.grey.grey900};
                    border-top-left-radius: 50%;
                    border-bottom-left-radius: 50%;
                    top: -2px;
                    right: -2.5px;
                    position: absolute;
                }
            }

            .logo {
            }

            .logos {
                display: flex;
                border: 1px solid ${colors.grey.grey900};
                height: 40px;
                z-index: 2;
                background-color: ${colors.white};

                .border {
                    border-right: 1px solid ${colors.grey.grey900};
                    width: 40px;
                    height: 38px;
                    padding: 5px;

                    img,
                    svg {
                        width: 100%;
                        height: 100%;
                    }

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }

        .text {
            color: ${colors.grey.grey700};
            ${mixinTypography.text.tSmall.textSmallRegular}
        }

        padding: 40px 0;
        width: 100%;

        @media (${mediaScreen.tablet}) {
            padding: 0 15px;
            text-align: center;
        }

        @media (${mediaScreen.maxMobile}) {
            padding: 40px 53px;
        }
    }
`;
