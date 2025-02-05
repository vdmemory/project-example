import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Button } from '@breef/ui-kit';

interface WorkPopupControlProps {
    onSave: () => void;
    isDisabledSave: boolean;
    onCancel: () => void;
}
export const WorkPopupControl: FC<WorkPopupControlProps> = ({
    onSave,
    isDisabledSave,
    onCancel,
}) => {
    return (
        <WorkPopupControlStyled>
            <Button
                label="Cancel"
                onClick={onCancel}
                size="small"
                variant="outlined-black"
            />
            <Button
                label="Save"
                isDisabled={isDisabledSave}
                onClick={onSave}
                size="small"
            />
        </WorkPopupControlStyled>
    );
};

export default WorkPopupControl;

const WorkPopupControlStyled = styled.div`
    display: flex;
    gap: 20px;
    flex: 1;
    justify-content: flex-end;
    padding: 20px;

    @media screen and (max-width: 512px) {
        justify-content: space-between;
    }

    button {
        height: 31px;

        @media screen and (max-width: 512px) {
            height: 62px;
            width: 100%;

            & > span {
                font-size: 16px;
            }
        }
    }
`;
