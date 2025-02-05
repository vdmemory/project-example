import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledLinkField = styled.div`
    width: 100%;
    outline: none;
    border: none;
    font-size: 24px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    letter-spacing: auto;

    @media (${mediaScreen.tablet}) {
        font-size: 22px;
        line-height: 26.4px;
    }

    .link-delete {
        opacity: 0;
        transition: opacity 0.3s;
        position: absolute;
        right: 10px;
        bottom: 6px;

        > svg {
            height: 38px;
            width: 40px;

            > line {
                stroke: ${colors.mainOrange};
            }
        }

        &-active {
            opacity: 1;
            transition: opacity 0.3s;
        }
    }
`;
