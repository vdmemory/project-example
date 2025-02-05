import React, { RefObject } from 'react';
import { StyledInnerAutocomplete } from './InnerAutocomplete.styled';
import PlacesAutocomplete from '../../../autocomplete/Autocomplete';
import { TransformAddressType } from '@breef/shared/utils';

interface AutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    parentRef: RefObject<HTMLElement>;
    placeholder?: string;
}

export const InnerAutocomplete = ({
    value,
    onChange,
    parentRef,
    placeholder,
}: AutocompleteProps) => {
    const handleSelectPlace = (
        id: number,
        name: string,
        address?: TransformAddressType,
    ) => {
        onChange(address?.formattedAddress || '');
    };

    return (
        <StyledInnerAutocomplete>
            <PlacesAutocomplete
                value={value}
                onClick={handleSelectPlace}
                placeholder={placeholder}
                parentInnerFieldRef={parentRef}
                isFormattedAddress
            />
        </StyledInnerAutocomplete>
    );
};

export default InnerAutocomplete;
