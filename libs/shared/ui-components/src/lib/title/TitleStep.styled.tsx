import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets/variables';

export const StyledTitleStep = styled.div`
    color: black;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    background: ${colors.mainPurple};

    .step-number,
    .step-title {
        text-transform: uppercase;
        font-size: 72px;
        line-height: 72px;
    }

    .step-number {
        //width: 16.66%;
        width: 240px;
        border-right: 1px solid ${colors.mainBlack};
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .step-title {
        font-weight: 400;
        padding-left: 55px;
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;

        .note-icon > * {
            margin-bottom: 2px;
        }
    }

    .step-subtitle {
        font-weight: 450;
        font-size: 1.5rem;
        line-height: 120%;
        letter-spacing: 0.015em;
        color: ${colors.mainBlack};
        padding-left: 55px;
        margin: 19px 0 0;
        white-space: pre-wrap;
    }
`;
