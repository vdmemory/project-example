import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTooltip = styled.div`
    .Tooltip {
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 450;
        font-size: 14px;
        line-height: 140%;
        letter-spacing: 0.01em;
        color: #000000;
        max-width: 650px;
        white-space: pre-wrap;
        display: flex;
    }
    #arrow {
        position: absolute;
        background: inherit;
        width: 14px;
        height: 14px;
        border: 1px solid transparent;
    }
    .link-button {
        margin-left: 20px;
        font-family: ${fonts.default};
        font-style: normal;
        font-weight: 450;
        font-size: 14px;
        line-height: 140%;
        letter-spacing: 0.01em;
    }

    @media screen and (${mediaScreen.tablet}) {
        .Tooltip {
            > span {
                max-width: 200px;
                word-break: break-word;
            }
        }
    }
`;
