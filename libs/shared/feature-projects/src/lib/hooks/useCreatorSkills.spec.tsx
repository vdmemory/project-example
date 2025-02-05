import { renderHook } from '@testing-library/react-hooks';
import { otherSkill, useCreatorSkills } from './useCreatorSkills';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { ListIdNameType } from '@breef/shared/types';

jest.mock('@breef/shared/data-access-project-create', () => ({
    useGetCapabilitiesQuery: jest.fn(),
}));

describe('useCreatorSkills', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return mapped skills with display names from dictionary and "Other" skill', () => {
        const skills: ListIdNameType[] = [
            { id: 1, name: 'Organic Social Media' },
            { id: 2, name: 'Digital Marketing' },
            { id: 3, name: 'Content Creation' },
        ];
        (useGetCapabilitiesQuery as jest.Mock).mockReturnValue({
            data: skills,
        });
        const { result } = renderHook(() => useCreatorSkills());
        const expectedSkills = [
            { id: 1, name: 'Social Media' },
            { id: 2, name: 'Digital Marketing' },
            { id: 3, name: 'Content Creation' },
            otherSkill,
        ];
        expect(result.current).toEqual(expectedSkills);
    });

    it('should return only "Other" skill when no data is available', () => {
        (useGetCapabilitiesQuery as jest.Mock).mockReturnValue({ data: null });
        const { result } = renderHook(() => useCreatorSkills());
        expect(result.current).toEqual([otherSkill]);
    });
});
