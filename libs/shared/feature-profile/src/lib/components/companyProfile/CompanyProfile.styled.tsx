import { simpleAnimation } from '@breef/shared/assets';
import styled from '@emotion/styled';

export const StyledCompanyProfile = styled.section`
    ${simpleAnimation}

    .container {
        padding: 30px 60px;

        .row {
            width: 100%;
            height: 18px;
            background-color: #999;
            border-radius: 10px;
            margin-top: 10px;
        }
    }

    .layout {
        display: flex;
        flex-direction: column;
    }
`;
