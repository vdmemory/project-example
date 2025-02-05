import type { Meta } from '@storybook/react';
import Autocomplete, { AutocompleteProps } from './Autocomplete.component';
import { useState } from 'react';
import { TransformAddressType } from '@breef/shared/utils';

const StoryAutocomplete = (props: AutocompleteProps) => {
    const [value, setValue] = useState('');
    const onClick = (
        id: number,
        name: string,
        address?: TransformAddressType,
    ) => {
        setValue(name);
    };
    return <Autocomplete {...props} value={value} onClick={onClick} />;
};

const Story: Meta<typeof Autocomplete> = {
    component: StoryAutocomplete,
    title: 'Autocomplete',
};
export default Story;

export const Primary = {
    args: {
        placeholder: 'Placeholder',
    },
};
