import { colors, mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;

    .title {
        font-weight: 450;
        font-size: 3rem;
        line-height: 110%;
        letter-spacing: 0.002em;
        text-transform: uppercase;
        margin: 0;
    }

    .header {
        &-edit {
            display: flex;
            align-items: center;
            justify-content: start;

            > span {
                font-weight: 450;
                font-size: 1.5rem;
                line-height: 120%;
                letter-spacing: 0.015em;
                color: ${colors.mainOrange};
                border-bottom: 1px solid ${colors.mainOrange};
                margin-left: 10px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    & + .header-review {
        padding-top: 0;
    }

    @media (${mediaScreen.tablet}) {
        padding: 24px 0;
        .title {
            font-size: 32px;
            line-height: 110%;
            max-width: 80%;
            word-break: break-word;
        }
    }
`;
