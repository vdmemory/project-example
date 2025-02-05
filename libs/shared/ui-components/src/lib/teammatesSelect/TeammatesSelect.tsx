import { StyledTeammatesSelect } from './TeammatesSelect.styled';
import { FC } from 'react';
import LinkButton from '../button/linkButton/LinkButton';
import { Teammate } from './teammate/Teammate';
import { AddInvitePopup, usePopup } from '../../index';
import { TeammateType } from '@breef/shared/types';

interface TeammatesSelectProps {
    teammatesList: TeammateType[];
    selectedTeammates: TeammateType[];
    onChange: (value: TeammateType) => void;
    onAdd: (value: TeammateType) => void;
}
export const TeammatesSelect: FC<TeammatesSelectProps> = ({
    teammatesList,
    onChange,
    selectedTeammates,
    onAdd,
}) => {
    const addTeammatePopup = usePopup();

    return (
        <StyledTeammatesSelect>
            {addTeammatePopup.isOpen && (
                <AddInvitePopup
                    placeholder="NAME@COMPANY.COM"
                    titlePopup="ADD A TEAM MEMBER"
                    buttonTitle="Add"
                    invitations={teammatesList}
                    addInvite={onAdd}
                    close={addTeammatePopup.close}
                    isCheckEmailExist={false}
                    defaultErrorMessage="Teammate with this email is already added."
                />
            )}
            {teammatesList.map(teammate => (
                <Teammate
                    key={teammate.email}
                    teammate={teammate}
                    onChange={onChange}
                    isSelected={selectedTeammates.some(
                        item => item.email === teammate.email,
                    )}
                />
            ))}
            <div className="row-item">
                <LinkButton
                    onClick={addTeammatePopup.open}
                    name="Add Team Member"
                    className="add-teammate-btn"
                    icon="plus"
                    size="big"
                />
            </div>
        </StyledTeammatesSelect>
    );
};
