import SkillsSelect from './skillsSelect/SkillsSelect';

interface MultiCardSelectsControllerProps {
    value: { id: number; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
    dependencyField?: { id: number; name: string }[];
    type: string;
}

export const MultiChipSelectsController = (
    props: MultiCardSelectsControllerProps,
) => {
    switch (props.type) {
        case multiCardSelects.skills:
            return (
                <SkillsSelect
                    {...props}
                    selectedServices={props.dependencyField}
                />
            );
        default:
            return <div data-testid="plug-select" />;
    }
};

export default MultiChipSelectsController;

export const multiCardSelects = {
    skills: 'skills',
};
