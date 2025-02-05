import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledFormPricing = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(100vh - 80px);

    @media screen and (${mediaScreen.tablet}) {
        max-height: calc(100vh - 50px);
    }

    .padding-right {
        padding-right: 44px;
    }

    .radio-cards-wrapper {
        display: flex;
        gap: 42px;
        flex: 1;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 20px;

            label {
                max-width: 650px;
                padding: 20px;
            }
        }
    }

    .textarea-wrapper {
        max-width: 650px;
    }
`;
