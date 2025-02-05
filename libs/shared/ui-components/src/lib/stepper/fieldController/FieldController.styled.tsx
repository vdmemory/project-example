import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledFieldController = styled.section`
    > label {
        font-size: 18px;
        margin-bottom: 2px;
        .step-info {
            color: ${colors.mainOrange};
            margin-right: 5px;
        }
    }
    .content-inner .google-identity .sso-button-content {
        margin-right: 30px;
    }
    .under-field {
        display: flex;
        align-items: center;
        & > div {
            margin: 0;
            @media screen and (max-width: 1024px) {
                width: 100%;
            }
        }
        p {
            margin: 15px 12px;
            font-size: 18px;
        }
        @media screen and (max-width: 1024px) {
            flex-direction: column;
        }
    }
`;
