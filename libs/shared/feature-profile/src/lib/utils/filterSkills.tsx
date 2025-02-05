import { ValueSelectType } from '../types/profileFormTypes';

export const filterSkills = (
    list: ValueSelectType[],
    selected: ValueSelectType[],
) => {
    const filteredList = list.filter(item => {
        return selected.some(selectedItem => selectedItem.id === item.id);
    });
    return filteredList;
};

type ListType = {
    id: number;
    name: string;
    skills: {
        id: number;
        name: string;
    }[];
}[];

type SelectedType = {
    id: number;
    name: string;
}[];

export const splitSkills = (list: ListType, selected: SelectedType) => {
    const newSelected: { [x: string]: SelectedType } = {};
    list.forEach(service => {
        service.skills.forEach(skill => {
            if (selected.some(item => item.id === skill.id)) {
                newSelected[service.id] = newSelected[service.id]
                    ? [
                          ...newSelected[service.id],
                          ...selected.filter(f => f.id === skill.id),
                      ]
                    : selected.filter(f => f.id === skill.id);
            }
        });
    });
    return newSelected;
};
