import { TypeFieldNames } from '@breef/shared/constants';
import { TypeField } from '@breef/shared/types';
import { useState } from 'react';

type UseViewPasswordReturn = {
    toggleTypeInput: () => void;
    typeInput: TypeField;
};

export const useViewPassword = (type: TypeField): UseViewPasswordReturn => {
    const [typeInput, setTypeInput] = useState<TypeField>(type);

    const toggleTypeInput = () => {
        setTypeInput(
            typeInput === TypeFieldNames.PASSWORD
                ? TypeFieldNames.TEXT
                : TypeFieldNames.PASSWORD,
        );
    };

    return { typeInput, toggleTypeInput };
};
