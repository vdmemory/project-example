import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';
import { fonts } from '@breef/shared/assets';

export const StyledHeaderInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    position: sticky;
    top: 0;
    height: 60px;
    background-color: ${colors.white};
    border-top: 1px solid ${colors.black};
    border-bottom: 1px solid ${colors.black};
    width: 100%;
    z-index: 9;

    h2 {
        font-weight: normal;
        margin: 0;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button.link {
        display: flex;
        gap: 6px;
        border: none;
        background-color: transparent;
        align-items: flex-end;
        outline: none;
        cursor: pointer;

        .label {
            font-size: 12px;
            font-family: ${fonts.accent};
            min-width: auto;
            text-decoration: underline;
            -webkit-text-stroke-width: 0.2px;
            -webkit-text-stroke-color: ${colors.primary.primary500};
            color: ${colors.primary.primary500};
            text-transform: uppercase;
            padding-bottom: 3px;
            letter-spacing: 0.18px;
        }

        svg {
            margin-left: -3px;
        }

        :hover {
            svg path {
                stroke: ${colors.primary.primary300};
            }
            .label {
                -webkit-text-stroke-color: ${colors.primary.primary300};
                color: ${colors.primary.primary300};
            }
        }
    }
`;
