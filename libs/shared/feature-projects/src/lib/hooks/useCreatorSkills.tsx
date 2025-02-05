import { ListIdNameType } from '@breef/shared/types';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';

export const useCreatorSkills = () => {
    const creatorSkills: ListIdNameType[] = [];
    const { data: skills } = useGetCapabilitiesQuery({});

    (skills ?? []).map(skill => {
        const dictSkill = creatorSkillsDict.find(
            dictSkill => dictSkill.name === skill.name,
        );
        if (dictSkill) {
            creatorSkills.push({
                ...skill,
                name: dictSkill.displayName,
            });
        }
    });

    return [...creatorSkills, otherSkill];
};

export const otherSkill = { id: 0, name: 'Other' };
export const creatorSkillsDict = [
    {
        name: 'Organic Social Media',
        displayName: 'Social Media',
    },
    {
        name: 'Digital Marketing',
        displayName: 'Digital Marketing',
    },
    {
        name: 'Content Creation',
        displayName: 'Content Creation',
    },
    {
        name: 'Brand Strategy + Identity',
        displayName: 'Brand Identity',
    },
    {
        name: 'Web Design + Development',
        displayName: 'Website Design',
    },
];
