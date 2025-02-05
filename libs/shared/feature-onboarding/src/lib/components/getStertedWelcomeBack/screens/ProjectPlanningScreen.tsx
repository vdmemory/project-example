import { mediaScreen } from '@breef/shared/assets/variables';
import { useGetList } from '@breef/shared/hooks';
import { ChipSelect } from '@breef/shared/ui-components';
import styled from '@emotion/styled';
import { useState } from 'react';

export const StyledProjectPlanningScreen = styled.div`
    padding: 60px 60px 50px;

    .chips-wrapper {
        justify-content: center;
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 30px 0 0;

        section {
            display: flex;
            justify-content: center;

            .chips-wrapper {
                min-width: 100%;

                label {
                    padding: 5px 12px;
                }
            }
        }
    }
`;

interface ProjectPlanningScreenProps {
    onSelect?: (value: { id: number | string; name: string }[]) => void;
    select?: { id: number | string; name: string }[];
}

export const ProjectPlanningScreen = ({
    onSelect,
    select,
}: ProjectPlanningScreenProps) => {
    const [selected, setSelected] = useState<
        { id: number | string; name: string }[]
    >(select || []);

    // TODO: projectPlanning key typing in useGetList hook (enum)
    const planningList = useGetList('projectPlanning') as {
        id: string;
        name: string;
    }[];

    const handleSelect = (value: { id: number | string; name: string }[]) => {
        setSelected(value);
        onSelect && onSelect(value);
    };

    return (
        <StyledProjectPlanningScreen>
            <ChipSelect
                multiple
                handleSelect={handleSelect}
                initialSelected={selected}
                initialOptions={planningList}
            />
        </StyledProjectPlanningScreen>
    );
};

export default ProjectPlanningScreen;
