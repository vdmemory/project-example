import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledChipAutocomplete = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 12px;

    .wrap-link-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 133px;

        > div {
            font-size: 14px;
            margin: 0;
        }
    }

    #modal-full-component > div:nth-of-type(1) {
        position: fixed;
        height: 100vh;
        width: 100vw;
        background-color: ${colors.bgModal};
        top: 0;
        left: 0;
        z-index: 1;
    }

    .modal {
        font-size: 18px;
        position: fixed;
        max-height: 100vh;
        max-width: 100vw;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        color: inherit;
        width: 48rem;
        padding: 50px 60px 60px;
        border: 1px solid black;

        > div:nth-of-type(1) {
            button {
                border: none;
                background: none;
                position: absolute;
                right: 17px;
                top: 17px;
                cursor: pointer;
            }
        }
    }
`;
