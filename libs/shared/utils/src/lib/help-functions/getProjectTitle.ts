export const getProjectTitleUsingSkills = (skills: { name: string }[]) => {
    const skillNames = skills.map(skill => skill.name);
    let result = '';

    if (!skillNames.length) {
        result = 'Draft';
    } else if (skillNames.length === 1) {
        result = skillNames[0];
    } else if (skillNames.length === 2) {
        result = skillNames.join(' & ');
    } else {
        const lastSkill = skillNames.pop();
        result = `${skillNames.join(', ')} & ${lastSkill}`;
    }
    return `${result} Project`;
};
