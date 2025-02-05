import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledAdditionalLink = styled.div`
    display: flex;

    .additional-link-fields-wrapper {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-right: 12px;
        > *:first-of-type {
            max-width: 170px;
        }
        > *:last-of-type {
            max-width: 220px;
        }
    }

    .input-link-name {
        min-width: auto;
        max-width: 170px;
    }
    .input-link {
        min-width: auto;
        max-width: 220px;
    }

    .remove-button {
        margin-top: 11px;
    }

    @media screen and (${mediaScreen.tablet}) {
        input {
            width: 130px !important;
        }
    }
`;
