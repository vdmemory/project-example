import { TransformAddressType } from '@breef/shared/utils';
import PlacesAutocomplete from '../Autocomplete';
import LinkButton from '../../button/linkButton/LinkButton';
import { AuthGoogleType } from '@breef/shared/types';
import { StyledMultipleAutocomplete } from './MultipleAutocomplete.styled';
import { toast } from 'react-toastify';

interface MultipleAutocompleteProps {
    places: { location: string }[];
    onChange: (places: unknown) => void;
    onClick: (
        key: string,
        data: AuthGoogleType | React.SyntheticEvent | { query: string },
    ) => void;
    error?: string;
    isDisableNextBtn?: boolean;
}

export const MultiplePlacesAutocomplete = ({
    places,
    onChange,
    onClick,
    error,
    isDisableNextBtn,
}: MultipleAutocompleteProps) => {
    const addNew = () => {
        onChange([...places, { location: '' }]);
    };

    const showError = (error: string) => {
        toast.error(error);
    };

    const onSelectPlace = (
        indexOfField: number,
        data: { id: number; name: string; address?: TransformAddressType },
    ) => {
        const newPlaces = [...places];
        newPlaces[indexOfField].location = data.name;
        onChange(newPlaces);
    };

    const onDeleteLocation = (key: number) => {
        const newPlaces = [...places];
        newPlaces.splice(key, 1);
        onChange(newPlaces);
    };

    return (
        <StyledMultipleAutocomplete
            data-testid="multiple-places-autocomplete"
            className="multiple-autocomplete"
        >
            {places.map((item, key) => (
                <PlacesAutocomplete
                    values={places}
                    data-testid={`places-autocomplete-${key}`}
                    key={key}
                    value={item.location}
                    onClick={(id, name, address, error) =>
                        error
                            ? showError(error)
                            : onSelectPlace(key, { id, name, address })
                    }
                    isArrowNext={!key}
                    isDisableNext={isDisableNextBtn}
                    onNextButton={e => onClick('nav-event', e)}
                    onDeleteSelf={key ? () => onDeleteLocation(key) : undefined}
                />
            ))}
            {places.length < 3 && (
                <LinkButton
                    data-testid="add-office-btn"
                    name="Office"
                    icon="plus"
                    onClick={addNew}
                    size="big"
                    className="link-button"
                />
            )}
        </StyledMultipleAutocomplete>
    );
};

export default MultiplePlacesAutocomplete;
