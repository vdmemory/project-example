import { colors, mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledListDocuments = styled(motion.div)`
    display: -webkit-box;
    display: flex;
    flex-direction: column;
    margin: 0 -48px 0 -75px;
    overflow-y: auto;
    border-top: 1px solid #000000;

    @media screen and (${mediaScreen.tablet}) {
        margin: 0 -15px;
    }
`;

export const StyledItemList = styled(motion.span)`
    border-bottom: 1px solid ${colors.mainBlack};
    max-height: 100px;
    min-height: 70px;
    display: flex;
    padding-left: 75px;
    padding-right: 48px;
    align-items: center;
    font-size: 18px;
    letter-spacing: 0.015em;
    line-height: 29px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    position: relative;

    a {
        color: ${colors.mainOrange};
        text-decoration: underline;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: all 0.2s ease-in-out;
        line-height: initial;
        margin-left: 0;
    }

    :hover {
        background-color: ${colors.lightGrey};

        button.close-button {
            opacity: 1;
            visibility: visible;
        }
        svg.pdf-icon,
        svg.doc-icon {
            opacity: 1;
            visibility: visible;
            width: 38px;
            min-width: 38px;
        }
        a {
            color: ${colors.mainBlack};
            text-decoration: none;
            margin-left: 10px;
        }
    }

    button.close-button {
        display: flex;
        border: none;
        background: none;
        position: absolute;
        cursor: pointer;
        z-index: 1;
        top: 0;
        right: 0;
        padding: 0;
        height: 100%;
        align-items: center;
        transition: all 0.3s ease;

        svg.close-icon {
            margin-top: -2px;
            margin-left: 0;
            line {
                stroke: ${colors.mainOrange};
            }
        }
    }

    svg.pdf-icon,
    svg.doc-icon {
        margin-top: -2px;
        width: 0;
        min-width: 0;
    }

    svg.pdf-icon,
    svg.doc-icon,
    button.close-button {
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
    }

    .list-spinner {
        position: absolute;
        left: 12px;
        top: 54%;
        div {
            width: 30px;
            height: 30px;
            border-width: 2px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 0 15px;

        :hover {
            background-color: initial;
        }

        .list-spinner {
            position: static;
            margin-right: 10px;
            transform: none;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        button.close-button {
            opacity: 1;
            visibility: visible;
        }
        svg.pdf-icon,
        svg.doc-icon {
            opacity: 1;
            visibility: visible;
            width: 38px;
            min-width: 38px;
        }
        a {
            color: ${colors.mainBlack};
            text-decoration: none;
            margin-left: 10px;
        }
    }
`;
