import { StyledAutocomplete } from './Autocomplete.styled';
import { getGeocode } from 'use-places-autocomplete';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import useOnclickOutside from 'react-cool-onclickoutside';
import { EditIcon, PoweredByGoogle } from '@breef/shared/assets';
import Spinner from '../spinner/Spinner';
import {
    FilteredAddress,
    filteredAddress,
    TransformAddressType,
    transformAddress,
    getFormatValue,
    ReturnFormatType,
    getCountryLongName,
    ERROR_MESSAGE_DUPLICATE,
} from '@breef/shared/utils';
import { RefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Button } from '../button/Button';
import FieldButton from '../fieldInput/fieldButton/FieldButton';
import { GOOGLE_API_KEY } from '@breef/shared/constants';
import { checkIsElemOverflowsOnElement } from '@breef/shared/utils';
import { uniqueId } from 'lodash';

interface AutocompleteProps {
    label?: string;
    onClick: (
        id: number,
        name: string,
        address?: TransformAddressType,
        error?: string,
    ) => void;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    edit?: boolean;
    returnedFormat?: ReturnFormatType;
    isArrowNext?: boolean;
    onNextButton?: (e: SyntheticEvent) => void;
    isDisableNext?: boolean;
    parentInnerFieldRef?: RefObject<HTMLElement>;
    isFormattedAddress?: boolean;
    onDeleteSelf?: () => void;
    values?: { location: string }[];
}

export const PlacesAutocomplete = ({
    label,
    onClick,
    value: preValue,
    disabled = false,
    placeholder = 'City, country',
    edit = false,
    returnedFormat = 'city-country',
    isArrowNext = false,
    onNextButton = () => null,
    isDisableNext = false,
    parentInnerFieldRef,
    isFormattedAddress = false,
    onDeleteSelf,
    values,
}: AutocompleteProps) => {
    const searchTypes = isFormattedAddress ? 'address' : '(cities)';
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        useGoogle({
            apiKey: GOOGLE_API_KEY,
            options: {
                types: [searchTypes],
            },
        });

    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const refInput = useRef<HTMLInputElement | null>(null);
    const refDropList = useRef<HTMLUListElement>(null);

    const refAutocomplete = useOnclickOutside(() => {
        setData([]);
        setIsEdit(false);
    });

    useEffect(() => {
        if (preValue) setValue(preValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preValue]);

    useEffect(() => {
        if (placePredictions.length !== 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setData(placePredictions as any);
        }
    }, [placePredictions]);

    const handleInput = (e: { target: { value: string } }) => {
        const value = e.target.value;
        getPlacePredictions({ input: value });
        setValue(value);
    };

    const handleEditField = () => {
        const inputEl = refInput.current;
        if (!isEdit) {
            setIsEdit(true);
            setValue(value);
            inputEl?.focus();
        }
        if (isEdit) {
            setIsEdit(false);
            setData([]);
        }
    };

    const handleSelect = (place: string) => () => {
        getGeocode({ address: place }).then(results => {
            const id = Number(uniqueId());
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

            const isExistDuplicate =
                values && values.some(s => s.location === formatValue);

            if (isExistDuplicate) {
                onClick(0, '', undefined, ERROR_MESSAGE_DUPLICATE);
                setTimeout(() => {
                    setIsEdit(true);
                    setValue('');
                    setData([]);
                }, 300);

                return;
            }

            setValue(isFormattedAddress ? formattedAddress : formatValue);

            setTimeout(() => {
                onClick(id, formatValue, {
                    ...address,
                    ...{ countryLongName },
                    formattedAddress,
                });
                setIsEdit(false);
                setData([]);
            }, 300);
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
            <li key={placeId} onClick={handleSelect(item.description)}>
                <strong>{mainText}</strong> <small>{secondaryText}</small>
            </li>
        );
    };

    const checkOverflow = () => {
        if (refDropList.current) {
            if (checkIsElemOverflowsOnElement(refDropList)) {
                refDropList.current.style.bottom = `calc(100% - 17px)`;
                refDropList.current.style.top = 'auto';
                refDropList.current.style.borderTop = '1px solid';
            } else {
                refDropList.current.style.bottom = 'auto';
                refDropList.current.style.top = `calc(100% - 17px)`;
            }
        }
    };

    useEffect(() => {
        checkOverflow();
    }, [data.length]);

    return (
        <StyledAutocomplete
            ref={refAutocomplete}
            parentInnerFieldRef={parentInnerFieldRef}
            isShowList={!isPlacePredictionsLoading && data.length !== 0}
        >
            {label && <label>{label}</label>}
            <div className="wrap-input">
                <input
                    data-testid="autocomplete-input"
                    ref={refInput}
                    style={!isEdit ? { cursor: 'auto' } : {}}
                    value={value}
                    onChange={handleInput}
                    disabled={disabled}
                    placeholder={placeholder}
                    readOnly={!isEdit && edit}
                />
                {isPlacePredictionsLoading && <Spinner />}
                {edit && !isPlacePredictionsLoading && (
                    <Button
                        disabled={disabled}
                        className="only-icon"
                        type="button"
                        onClick={handleEditField}
                    >
                        <EditIcon />
                    </Button>
                )}
                {onDeleteSelf && !isPlacePredictionsLoading && (
                    <FieldButton
                        view="close"
                        type="button"
                        onClick={onDeleteSelf}
                        wrapperClassName="button-close"
                    />
                )}
                {isArrowNext && !isPlacePredictionsLoading && (
                    <FieldButton
                        view="arrow"
                        type="button"
                        onClick={onNextButton}
                        isDisabled={isDisableNext}
                    />
                )}
            </div>

            <ul ref={refDropList} className="by-google-wrapper">
                {data.map(renderDataSource)}
                <div className="by-google">
                    <img src={PoweredByGoogle.src} alt="close Icon" />
                </div>
            </ul>
        </StyledAutocomplete>
    );
};

export default PlacesAutocomplete;
