import { TypeField } from '@breef/shared/types';
import { TypeFieldNames } from '@breef/shared/constants';
import { EyePassBolderIcon } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { colors } from '../../../styles/colors';

export function EyeButton({
    onClick,
    typeField,
}: {
    onClick: () => void;
    typeField: TypeField;
}) {
    return (
        <StyledEyeButton className="password-icon" onClick={onClick}>
            {typeField === TypeFieldNames.PASSWORD && <span className="line" />}
            <EyePassBolderIcon />
        </StyledEyeButton>
    );
}

const StyledEyeButton = styled.span`
    position: absolute;
    right: 12px;
    top: 16px;
    cursor: pointer;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;

    .line {
        position: absolute;
        width: 20px;
        height: 1px;
        background-color: #68737d;
        border-radius: 1px;
        transform: rotate(45deg);
    }

    svg {
        width: 16px;
        height: 16px;
        g {
            opacity: 1;
        }
        path,
        circle {
            color: ${colors.grey.grey900};
            stroke-width: 1px;
        }
    }
`;
