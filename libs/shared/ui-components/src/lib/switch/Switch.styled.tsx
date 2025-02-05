import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets/variables';

export const SwitchStyled = styled.div`
    .switch {
        width: 4.375rem;
        height: 2.625rem;
        border-radius: 20px;
        background: ${colors.strokeGray};
        display: flex;
        align-items: center;
        position: relative;
        transition: background 0.325s;
        margin: 0;

        span {
            width: calc(2rem);
            height: calc(2rem);
            border-radius: 50%;
            background: ${colors.mainWhite};
            display: block;
            margin-left: 4px;
            pointer-events: none;
            transition: margin 0.125s ease, transform 0.125s ease;
        }

        input {
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: pointer;

            &:checked {
                + span {
                    margin-left: calc(100% - 2rem - 4px);
                }
            }

            &:hover {
                + span {
                    transform: scale(1.1);
                }
            }

            &:active {
                + span {
                    transform: scale(1);
                }
            }
        }

        &--active {
            background-color: #cebf34;
        }

        &--disabled {
            pointer-events: none;
            opacity: 0.875;
        }
    }
`;
