import { TypeFieldNames } from '@breef/shared/constants';
import { TypeField } from '@breef/shared/types';

export const controlInputField = (type: TypeField, value: string): string => {
    switch (type) {
        case TypeFieldNames.TEXT:
            return value.trimStart().replace(/\s\s+/g, ' ');

        case TypeFieldNames.PASSWORD:
        case TypeFieldNames.EMAIL:
            return value.replace(/\s/g, '');

        default:
            return value;
    }
};
