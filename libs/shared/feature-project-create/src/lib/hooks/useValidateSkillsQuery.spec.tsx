import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { ProjectScopeFormType } from '../types/projectCreateTypes';
import { useValidateSkillsQuery } from './useValidateSkillsQuery';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { ProjectStep } from '@breef/shared/constants';
import { ListIdNameType } from '@breef/shared/types';

jest.mock('@breef/shared/data-access-project-create', () => ({
    useGetCapabilitiesQuery: jest.fn(),
}));
const skills: ListIdNameType[] = [
    { id: 1, name: 'Organic Social Media' },
    { id: 2, name: 'Digital Marketing' },
    { id: 3, name: 'Content Creation' },
];
(useGetCapabilitiesQuery as jest.Mock).mockReturnValue({
    data: skills,
});

const setup = () => {
    const {
        result: { current: projectScope },
    } = renderHook(() =>
        useForm<ProjectScopeFormType>({
            defaultValues: {
                agencySkills: [{ id: 1, name: 'Organic Social Media' }],
            },
        }),
    );

    return renderHook(() =>
        useValidateSkillsQuery(projectScope, ProjectStep.PROJECT_SCOPE),
    );
};

describe('useValidateSkillsQuery', () => {
    it('should call validation successfully', () => {
        const {
            result: {
                current: { handleValidateSkillQuery, isErrorsSkills },
            },
        } = setup();
        handleValidateSkillQuery('Organic Social Media', 0);
        expect(isErrorsSkills).toBe(false);
    });
    it('should call validation with empty data and returning isError false successfully', () => {
        const {
            result: {
                current: { handleValidateSkillQuery, isErrorsSkills },
            },
        } = setup();
        handleValidateSkillQuery('', 5);
        expect(isErrorsSkills).toBe(false);
    });
    it('should get error skill', () => {
        const {
            result: {
                current: { getErrorSkill },
            },
        } = setup();
        const result = getErrorSkill(0);
        expect(result).toBe(undefined);
    });
    it('should clear error skill', () => {
        const {
            result: {
                current: { handleClearSkillError, isErrorsSkills },
            },
        } = setup();
        handleClearSkillError(0);
        expect(isErrorsSkills).toBe(false);
    });
});
