import { StyledTeammates } from './Teammates.styled';
import { InviteForm } from './inviteForm/InviteForm';
import {
    useProjectAvailabilityActions,
    useProjectAvailabilitySelector,
} from '../../../../store/hooks';
import { TeammatesList } from './teammatesList/TeammatesList';

export const Teammates = () => {
    const { addedTeammates, suggestedTeammates } =
        useProjectAvailabilitySelector(state => state).projectAvailability
            .dashboard;

    const { addExternalTeam, addExistingTeam, removeTeam } =
        useProjectAvailabilityActions();

    const handleAddTeammate = (email: string) => {
        addExternalTeam({ email });
    };

    const handleAddExistingTeammate = (emailExisting: string) => {
        const teammate = suggestedTeammates.find(
            teammate => teammate.email === emailExisting,
        )!;
        addExistingTeam(teammate);
    };

    const handleRemoveTeammate = (emailExisting: string) => {
        const teammate = addedTeammates.find(
            teammate => teammate.email === emailExisting,
        )!;
        removeTeam(teammate);
    };

    return (
        <StyledTeammates>
            <InviteForm
                list={[...addedTeammates, ...suggestedTeammates]}
                onClick={handleAddTeammate}
            />
            {addedTeammates.length ? (
                <TeammatesList
                    label="Added"
                    list={addedTeammates}
                    onClick={handleRemoveTeammate}
                    variant="secondary"
                />
            ) : null}
            {suggestedTeammates.length ? (
                <TeammatesList
                    label="Suggested"
                    list={suggestedTeammates}
                    onClick={handleAddExistingTeammate}
                    isSuggestions
                />
            ) : null}
        </StyledTeammates>
    );
};
