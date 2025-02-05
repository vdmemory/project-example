import { CardSelect } from '../CardSelect';
import React, { ReactNode } from 'react';
import { useGetList } from '@breef/shared/hooks';

export interface CardSelectDefinesListProps {
    value: { id: number | string; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
    listType: string;
    cardType?: string;
    isMultiple?: boolean;
    children?: ReactNode;
    isNotSelection?: boolean;
    requestId?: number;
    roleProject?: 'clients' | 'agencies';
}

export const CardSelectDefinesList = ({
    value,
    onChange,
    listType,
    cardType,
    isMultiple = false,
    children,
    isNotSelection = false,
    requestId = 0,
    roleProject = 'clients',
}: CardSelectDefinesListProps) => {
    const list = useGetList(listType, requestId, roleProject) as {
        id: number | string;
        name: string;
        description?: string;
        isTagged?: boolean;
        image?: string;
    }[];

    const isLoading = !list || (list && list.length === 0);

    return (
        <CardSelect
            isLoading={isLoading}
            multiple={isMultiple}
            initialOptions={list}
            initialSelected={value}
            handleSelect={onChange}
            cardType={cardType}
            isNotSelection={isNotSelection}
        >
            {children}
        </CardSelect>
    );
};

export default CardSelectDefinesList;
