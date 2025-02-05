import { FC, useEffect, useRef, useState } from 'react';
import { StyledAutocomplete } from './Autocomplete.styled';
import { getGeocode } from 'use-places-autocomplete';

import useOnclickOutside from 'react-cool-onclickoutside';
import {
    checkIsElemOverflowsOnElement,
    FilteredAddress,
    filteredAddress,
    getCountryLongName,
    getFormatValue,
    ReturnFormatType,
    transformAddress,
    TransformAddressType,
} from '@breef/shared/utils';

import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Input from '../input/Input.component';
import List from '../list/List.component';
import ListItem from '../listItem/ListItem.component';
import { PoweredByGoogleImage } from '../../images';
import { GOOGLE_API_KEY } from '@breef/shared/constants';

export interface AutocompleteProps {
    placeholder?: string;
    value?: string;
    onClick: (
        id: number,
        name: string,
        address?: TransformAddressType,
        error?: string,
    ) => void;
    onBlur?: () => void;
    returnedFormat?: ReturnFormatType;
    error?: string;
    maxLength?: number;
    className?: string;
    name?: string;
    id?: string;
    onChangeQueryOutside?: (query: string) => void;
}

export const Autocomplete: FC<AutocompleteProps> = ({
    value: preValue,
    onClick,
    returnedFormat = 'city-country',
    onBlur,
    className,
    onChangeQueryOutside,
    error,
    ...rest
}) => {
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        useGoogle({
            apiKey: GOOGLE_API_KEY,
            options: {
                types: ['(cities)'],
            },
        });

    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [isInFocus, setIsInFocus] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isOverflowsPage, setIsOverflowsPage] = useState(false);

    const listRef = useRef<HTMLDivElement>(null);

    const refAutocomplete = useOnclickOutside(() => {
        if (isInFocus) {
            onBlur?.();
        }
        setData([]);
    });

    useEffect(() => {
        if (preValue) setQuery(preValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preValue]);

    useEffect(() => {
        if (placePredictions.length !== 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setData(placePredictions as any);
        }
    }, [placePredictions]);

    useEffect(() => {
        if (listRef.current && !isOverflowsPage) {
            setIsOverflowsPage(checkIsElemOverflowsOnElement(listRef));
        }
    }, [isOverflowsPage, placePredictions.length]);

    const handleChange = (value: string) => {
        getPlacePredictions({ input: value });
        setQuery(value);
        onChangeQueryOutside?.(value);
    };

    const handleSelect = (place: string) => {
        getGeocode({ address: place }).then(results => {
            const id = Date.now();
            const responseAddress = results[0].address_components;
            const countryLongName = getCountryLongName(responseAddress);
            const formattedAddress = results[0].formatted_address;

            const address: TransformAddressType = responseAddress
                .map(filteredAddress)
                .filter((f: FilteredAddress) => f)
                .reduce<TransformAddressType>(transformAddress, {});

            const formatValue = getFormatValue(
                {
                    ...address,
                    ...{ countryLongName },
                },
                returnedFormat,
            );

            setQuery(formatValue);
            onChangeQueryOutside?.(formatValue);
            setData([]);

            onClick(id, formatValue, {
                ...address,
                ...{ countryLongName },
                formattedAddress,
            });
            onBlur?.();
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderDataSource = (item: any) => {
        const {
            place_id: placeId,
            structured_formatting: {
                main_text: mainText,
                secondary_text: secondaryText,
            },
        } = item;

        return (
            <ListItem
                key={placeId}
                onClick={() => handleSelect(item.description)}
            >
                <strong>{mainText}</strong>
                <small>{secondaryText}</small>
            </ListItem>
        );
    };

    // TODO: hide error when input is focused or data is loading or data is not empty
    // const isHideError = isInFocus || isPlacePredictionsLoading || data.length !== 0;

    return (
        <StyledAutocomplete
            ref={refAutocomplete}
            className={className}
            isOverflowsPage={isOverflowsPage}
        >
            <div ref={wrapperRef}>
                <Input
                    {...rest}
                    error={error}
                    // error={isHideError ? '' : error}
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsInFocus(true)}
                    onBlur={() => setIsInFocus(false)}
                    isLoading={isPlacePredictionsLoading}
                />
                <div ref={listRef} className="autocomplete-list-wrapper">
                    {!isPlacePredictionsLoading && data.length !== 0 && (
                        <List className="autocomplete-items-list">
                            {data.map(renderDataSource)}
                            <div className="by-google">
                                <img
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    src={PoweredByGoogleImage.src}
                                    alt="Powered By Google"
                                />
                            </div>
                        </List>
                    )}
                </div>
            </div>
        </StyledAutocomplete>
    );
};

export default Autocomplete;
