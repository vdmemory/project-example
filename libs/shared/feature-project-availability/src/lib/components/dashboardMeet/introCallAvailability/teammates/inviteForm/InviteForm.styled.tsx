import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledInviteForm = styled.form`
    display: flex;
    gap: 20px;

    .form-input {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
        font-size: 16px;
        line-height: 20px;
        color: ${colors.grey.grey900};
        height: 41px;
        min-width: 184px;
        width: 184px;
        padding-left: 14px;
        padding-right: 14px;

        @media (max-width: 768px) {
            height: 40px;
        }
    }

    .input-wrapper + span {
        padding-top: 7px;
    }

    & button {
        border-radius: 4px;
        height: 42px;
        min-width: 126px;
        font-size: 16px;
        line-height: 20px;

        @media (max-width: 768px) {
            width: 100%;
            min-width: 100px;
            height: 40px;
        }
    }
`;
