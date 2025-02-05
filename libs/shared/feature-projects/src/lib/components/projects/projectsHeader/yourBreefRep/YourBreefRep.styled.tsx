import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';

export const StyledYourBreefRep = styled(motion.div)`
    border: 1px solid ${colors.mainBlack};
    display: flex;
    flex-direction: column;
    flex: 0.245;
    background-color: ${colors.mainPurple};
    @media (max-width: 1280px) {
        flex: 1;
        min-height: 300px;
    }
    @media (${mediaScreen.tablet}) {
        min-height: 300px;
        height: 300px;
        flex: 0.245;
    }

    .content-your-rep-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex: 1;
        padding: 28px 80px 28px 30px;
        position: relative;
        min-width: 300px;

        @media (${mediaScreen.tablet}) {
            min-height: 240px;
            height: 240px;
        }

        .rep-label {
            font-family: ${fonts.accent};
            text-transform: uppercase;
            opacity: 0.4;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
        }

        .breef-info {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            .image-breef-wrapper {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: ${colors.mainWhite};
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                position: relative;
                margin-right: 15px;

                > img {
                    position: absolute;
                    width: inherit;
                    height: inherit;
                    object-fit: cover;
                }
            }
            &-lead {
                font-family: ${fonts.biroScriptPlus};
                font-size: 22px;
                font-weight: 400;
                line-height: 28.6px;
            }
        }

        .rep-note {
            font-size: 18px;
            line-height: 29px;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .rep-image {
            position: absolute;
            bottom: 0;
            right: -20px;
            @media (${mediaScreen.tablet}) {
                right: -8px;
                width: 85px;
            }
        }
    }

    .footer-your-rep-wrapper {
        height: 80px;
        display: flex;
        border-top: 1px solid ${colors.mainBlack};
        @media (${mediaScreen.tablet}) {
            min-height: 58px;
            height: 58px;
        }
        .button-icon {
            border: none;
            background-color: transparent;
            outline: none;
            flex: 1;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .icon-with-notify {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            :hover {
                background-color: ${colors.darkPurple};
            }
        }
        .button-icon + .button-icon {
            border-left: 1px solid ${colors.mainBlack};
        }
    }
`;
