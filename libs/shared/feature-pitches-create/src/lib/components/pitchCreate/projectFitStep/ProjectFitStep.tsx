import { StyledProjectFitStep } from './ProjectFitStep.styled';
import { Label, Range, Textarea } from '@breef/ui-kit';
import { useGetProjectFitFields } from './useGetProjectFitFields';
import { listExperience } from '@breef/shared/constants';

export const ProjectFitStep = () => {
    const {
        fieldProjectScopeValue,
        fieldExperienceValue,
        fieldClientFitValue,
        noteToBreef,
    } = useGetProjectFitFields();

    return (
        <StyledProjectFitStep>
            <Label
                text="Agency Fit"
                subtext="Rate yourself. How good a fit is your agency for this project?"
                forId="client-fit"
                id="client-fit-label"
            >
                <div className="client-fit-wrapper">
                    <Range
                        label="Project Scope"
                        value={fieldProjectScopeValue.value}
                        onChange={fieldProjectScopeValue.onChange}
                        list={listExperience}
                        startTip="Not a Fit"
                        endTip="Great Fit"
                    />
                    <Range
                        label="Client Fit"
                        value={fieldClientFitValue.value}
                        onChange={fieldClientFitValue.onChange}
                        list={listExperience}
                        startTip="Not a Fit"
                        endTip="Great Fit"
                    />
                    <Range
                        label="Industry Experience"
                        value={fieldExperienceValue.value}
                        onChange={fieldExperienceValue.onChange}
                        list={listExperience}
                        startTip="Not a Fit"
                        endTip="Great Fit"
                    />
                </div>
            </Label>
            <Label
                text="Note to breef"
                subtext="Anything else to share? Tell us here. We won’t share your note with the client."
                forId="note-to-breef"
                id="note-to-breef-label"
            >
                <Textarea
                    {...noteToBreef.field}
                    error={noteToBreef.fieldState.error?.message}
                    maxLength={1000}
                    isErrorRightPlacement
                    placeholder="Thank you for sharing this opportunity with our team!"
                />
            </Label>
        </StyledProjectFitStep>
    );
};

export default ProjectFitStep;
