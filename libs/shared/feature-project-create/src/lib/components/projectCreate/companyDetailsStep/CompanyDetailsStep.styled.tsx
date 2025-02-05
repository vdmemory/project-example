import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledCompanyDetailsStep = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 40px;

    .switch .wrapper .toggle,
    .switch .wrapper .toggle:before {
        border: none;
    }

    .switch .wrapper .toggle {
        width: 40px;
        height: 20px;

        background-color: #bdbdc1;
    }

    .switch .wrapper .toggle:before {
        width: 12px;
        height: 12px;

        background-color: #fff;
        left: 4px;

        :hover {
            transform: scale(1.1);
        }
    }

    .switch .wrapper .input:checked + .toggle:before {
        left: 23px;
        background: ${colors.white};
    }

    .switch .label {
        white-space: pre-wrap;
        font-size: 14px;
        line-height: 16px;
    }
`;
