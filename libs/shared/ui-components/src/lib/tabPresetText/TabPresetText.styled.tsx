import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledMain = styled.div`
    display: flex;
    font-size: 32px;
    flex: 1;
    user-select: none;
    padding: 30px;
    font-size: 32px;

    .inner-main {
        width: 100%;
        display: flex;
    }

    @media (${mediaScreen.tablet}) {
        [class*='step-post'] {
            max-width: 100%;
            width: 100% !important;
            flex: 1;
            border-left: none !important;
            border-top: 1px solid ${colors.mainBlack};
            padding: 30px 15px 10px;

            .description {
                max-width: 90%;
            }

            .avtor-wrapper {
                margin-top: 30px;
            }
        }
    }
`;
