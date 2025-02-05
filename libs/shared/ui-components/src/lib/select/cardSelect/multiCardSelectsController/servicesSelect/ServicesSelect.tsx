import { StyledServicesSelect } from './ServicesSelect.styled';
import { useGetServicesAndSkillsQuery } from '@breef/shared/data-access-profile';
import Services from './services/Services';

interface ServicesSelectProps {
    value: { id: number; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
}

export const ServicesSelect = ({ value, onChange }: ServicesSelectProps) => {
    const servicesAndSkillsQuery = useGetServicesAndSkillsQuery();

    return (
        <StyledServicesSelect
            data-testid="services-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {servicesAndSkillsQuery.data?.map((servicesData, key) => (
                <Services
                    key={key}
                    value={value}
                    onChange={onChange}
                    label={servicesData.name}
                    services={servicesData.services}
                />
            ))}
        </StyledServicesSelect>
    );
};

export default ServicesSelect;
