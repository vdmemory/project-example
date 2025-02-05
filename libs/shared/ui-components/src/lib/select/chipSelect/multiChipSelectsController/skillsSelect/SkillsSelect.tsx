import { StyledSkillsSelect } from './SkillsSelect.styled';
import { useGetServicesAndSkillsQuery } from '@breef/shared/data-access-profile';
import Skills from './skills/Skills';

interface ServicesSelectProps {
    value: { id: number; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
    selectedServices?: { id: number; name: string }[];
}

export const SkillsSelect = ({
    value,
    onChange,
    selectedServices,
}: ServicesSelectProps) => {
    const servicesAndSkillsQuery = useGetServicesAndSkillsQuery();
    const skillsData = servicesAndSkillsQuery.data
        ? servicesAndSkillsQuery.data.map(item => [...item.services]).flat()
        : [];
    const data = selectedServices
        ? skillsData.filter(item =>
              selectedServices.some(
                  selectedService => selectedService.id === item.id,
              ),
          )
        : [...skillsData];

    return (
        <StyledSkillsSelect
            data-testid="skills-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {data.map((service, key) => (
                <Skills
                    key={key}
                    value={value}
                    onChange={onChange}
                    label={service.name}
                    skills={service.skills}
                />
            ))}
        </StyledSkillsSelect>
    );
};

export default SkillsSelect;
