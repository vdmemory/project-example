import React from 'react';
import FieldSelect from '../FieldSelect';
import { useGetList } from '@breef/shared/hooks';

export interface FieldSelectDefinesListProps {
    value?: string;
    onClick: (key: string, data: React.SyntheticEvent) => void;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onMouseEnter?: (e: React.SyntheticEvent, id: number) => void;
    onMouseLeave?: (id?: number) => void;
    typeButton?: 'submit' | 'button';
    disabled?: boolean;
    error?: string;
    listType: string;
}

export const FieldSelectDefinesList = (props: FieldSelectDefinesListProps) => (
    <FieldSelect
        {...props}
        list={useGetList(props.listType) as { value: string; label: string }[]}
    />
);

export default FieldSelectDefinesList;
