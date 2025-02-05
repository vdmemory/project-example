import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledScreenWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    flex: 1;

    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 18px;
        height: 200px;
        border-bottom: 1px solid ${colors.black};
        padding: 0 75px;
        color: ${colors.black};

        @media (${mediaScreen.maxMobile}) {
            padding: 25px 16px;
            min-height: 120px;
            height: unset;
        }

        .title {
            font-size: 48px;
            line-height: 48px;
            text-transform: uppercase;

            @media (${mediaScreen.maxMobile}) {
                font-size: 32px;
                line-height: 35px;
                width: 250px;
            }
        }

        .description {
            font-size: 18px;
            line-height: 21px;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-bottom: 68px;

        .group-availability {
            margin-bottom: -1px;
        }

        button.medium {
            margin-bottom: unset;
            border-top: 1px solid ${colors.black};
            position: fixed;
            bottom: 0;
            z-index: 11;
        }
    }

    .timezone-dropdown-wrapper {
        background-color: ${colors.white};
        border-bottom: 1px solid ${colors.black};
        position: relative;
        width: 100%;

        .custom-dropdown {
            .drop-button {
                padding: 15px 75px;
                justify-content: center;
                .drop-value,
                .drop-placeholder {
                    font-size: 18px;
                    line-height: 29px;
                }
            }
            .drop-list {
                border: none;

                .list-item {
                    font-size: 16px;
                    line-height: 120%;
                    min-height: 36px;
                    padding-left: 20px;
                    padding-right: 20px;
                    width: fit-content;
                    min-width: 100%;
                }
            }

            .list-item:first-of-type {
                padding-top: 12px;
            }

            .list-item:last-of-type {
                padding-bottom: 12px;
            }
        }
    }
`;
