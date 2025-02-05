import { getProjectTitleUsingSkills } from './getProjectTitle';

describe('getProjectTitleUsingSkills', () => {
    it('returns "Draft Project" when skills array is empty', () => {
        const skills: { name: string }[] = [];
        const result = getProjectTitleUsingSkills(skills);

        expect(result).toBe('Draft Project');
    });

    it('returns the skill name followed by "Project" when there is only one skill', () => {
        const skills = [{ name: 'Web Development' }];
        const result = getProjectTitleUsingSkills(skills);

        expect(result).toBe('Web Development Project');
    });

    it('joins two skill names with " & " and adds "Project"', () => {
        const skills = [{ name: 'Web Development' }, { name: 'UI/UX Design' }];
        const result = getProjectTitleUsingSkills(skills);

        expect(result).toBe('Web Development & UI/UX Design Project');
    });

    it('joins multiple skill names with commas and adds " & " before the last skill name and "Project"', () => {
        const skills = [
            { name: 'Web Development' },
            { name: 'UI/UX Design' },
            { name: 'Backend Development' },
        ];
        const result = getProjectTitleUsingSkills(skills);

        expect(result).toBe(
            'Web Development, UI/UX Design & Backend Development Project',
        );
    });
});
