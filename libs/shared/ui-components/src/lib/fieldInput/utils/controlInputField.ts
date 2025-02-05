import { TypeFieldNames } from '@breef/shared/constants';
import { TypeField } from '@breef/shared/types';

export const controlInputField = (type: TypeField, value: string) => {
    switch (type) {
        case TypeFieldNames.TEXT:
            value = value.charAt(0) === ' ' ? value.slice(1) : value;
            return value.replace(/\s\s+/g, ' ');

        case TypeFieldNames.PASSWORD:
            return value.replace(/\s/g, '');

        case TypeFieldNames.EMAIL:
            return value.replace(/\s/g, '');

        default:
            return value;
    }
};
