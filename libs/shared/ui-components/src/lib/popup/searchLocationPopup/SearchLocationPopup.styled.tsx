import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

export const globalCssPopUp = css`
    .modal-pop {
        overflow: unset !important;

        @media (${mediaScreen.tablet}) {
            .by-google-wrapper {
                top: 72px;
            }
        }
    }
`;

export const StyledSearchLocationPopup = styled.div`
    display: flex;
    flex-direction: column;
    padding: 55px 60px;
    @media (${mediaScreen.tablet}) {
        padding: 30px 20px;
    }
    .popular {
        label {
            display: flex;
            text-transform: uppercase;
            margin-bottom: 10px;
            font-family: 'SuisseIntlMono', serif;
            font-size: 12px;
            color: black;
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
    }
    .error-location {
        margin-top: -20px;
        margin-bottom: 10px;
        position: relative;
    }
`;
