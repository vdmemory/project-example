import styled from '@emotion/styled';
import { fonts, mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';
import { colors } from '@breef/ui-kit';

export const StyledYourBreefRep = styled(motion.div)`
    border: 1px solid ${colors.grey.grey900};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    flex: 0.745;
    background-color: ${colors.white};
    max-width: 401px;
    min-width: 401px;
    min-height: 258px;

    @media (${mediaScreen.laptop}) {
        min-width: auto;
        max-width: 100%;
        min-height: auto;
    }

    .breef-info {
        display: flex;
        flex: 1;
        align-items: flex-start;
        gap: 40px;
        padding-top: 24px;
        @media (${mediaScreen.laptop}) {
            justify-content: space-around;
            gap: 20px;
            align-items: center;
        }
        @media (${mediaScreen.tablet}) {
            justify-content: normal;
            gap: 40px;
            align-items: flex-start;
        }

        @media (${mediaScreen.laptop}) {
            padding-top: 13px;
            flex: unset;
        }

        .lead {
            display: flex;
            align-items: center;
            flex-direction: column;
            min-width: 90px;
            gap: 8px;

            @media (${mediaScreen.tablet}) {
                min-width: 80px;
            }

            .avatar {
                width: 78px;
                height: 78px;
                border-radius: 50%;
                background-color: ${colors.white};
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                position: relative;
                box-shadow: 0px 0px 0px 2px ${colors.beige};

                > .image {
                    position: absolute;
                    width: inherit;
                    height: inherit;
                }
            }

            .name {
                font-family: ${fonts.biroScriptPlus};
                font-size: 22px;
                font-weight: 400;
                line-height: 28.6px;
                width: max-content;
            }
        }
        .description {
            font-size: 20px;
            line-height: 40px;
            white-space: pre-wrap;
            word-break: break-word;

            @media (${mediaScreen.laptop}) {
                margin-bottom: 20px;
            }

            @media (${mediaScreen.tablet}) {
                font-size: 18px;
                line-height: 32px;
                margin-bottom: 0;
            }
        }
    }

    @media (${mediaScreen.tablet}) {
        margin-top: 16px;
    }
`;
