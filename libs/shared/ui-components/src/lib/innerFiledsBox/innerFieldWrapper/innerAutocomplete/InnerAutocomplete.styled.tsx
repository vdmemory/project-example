import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledInnerAutocomplete = styled.div`
    > * {
        padding: 0 !important;
    }
    input {
        padding: 0 !important;
        height: auto !important;
        font-size: 24px !important;
        border-bottom: none !important;
        text-transform: none !important;
        ::placeholder {
            font-size: 15px;
        }

        @media (${mediaScreen.tablet}) {
            font-size: 22px !important;
            ::placeholder {
                font-size: 22px;
            }
        }
    }
`;
