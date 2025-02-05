import { useEffect, useState } from 'react';
import { StyledChipAutocomplete } from './ChipAutocomplete.styled';
import { ChangeHandler } from 'react-hook-form';
import ChipButton from '../button/chipButton/ChipButton';
import LinkButton from '../button/linkButton/LinkButton';
import { usePopup } from '../popup/usePopup';
import SearchLocationPopup from '../popup/searchLocationPopup/SearchLocationPopup';

type ValuesSearch = {
    name: string;
    id: number;
}[];

interface ChipAutocompleteProps {
    initialListValues: ValuesSearch;
    initialListPopular?: ValuesSearch;
    onClick: ChangeHandler;
}

export const ChipAutocomplete = ({
    initialListValues,
    initialListPopular,
    onClick,
}: ChipAutocompleteProps) => {
    const searchLocationPopupControl = usePopup();
    const [listValues, setListValues] =
        useState<ValuesSearch>(initialListValues);
    const [listPopular, setListPopular] = useState<ValuesSearch>(
        initialListPopular || [],
    );
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (listValues.length === 0 && initialListValues) {
            setListValues(initialListValues);
        }
    }, [initialListValues, listValues.length]);
    useEffect(() => {
        if (listPopular.length === 0 && initialListPopular) {
            setListPopular(initialListPopular);
        }
    }, [initialListPopular, listPopular.length]);

    const handleClick = (
        action: 'remove' | 'add',
        id: number,
        name: string,
    ) => {
        if (action === 'add') {
            const isDuplicate =
                listValues.some(s => s.id === id) ||
                listValues.some(s => s.name === name);
            if (!isDuplicate) {
                const newValues = [
                    ...listValues,
                    {
                        name,
                        id,
                    },
                ];
                if (errorMessage) setErrorMessage('');
                setListValues(newValues);
                if (onClick) onClick({ target: { value: newValues } });
            }
            searchLocationPopupControl.close();
        }

        if (action === 'remove') {
            const newValues = listValues.filter(f => f.id !== id);
            if (onClick) onClick({ target: { value: newValues } });
            return setListValues(newValues);
        }
    };

    return (
        <StyledChipAutocomplete>
            {searchLocationPopupControl.isOpen && (
                <SearchLocationPopup
                    error={errorMessage}
                    listPopular={listPopular}
                    onClick={handleClick}
                    close={searchLocationPopupControl.close}
                />
            )}
            {listValues.map(({ name, id }, i) => (
                <ChipButton
                    key={i}
                    id={id}
                    name={name}
                    action="remove"
                    onClick={(e, action, id) => handleClick(action, id, name)}
                />
            ))}
            <div className="wrap-link-button">
                <LinkButton
                    line={false}
                    icon="plus"
                    name="Add office"
                    onClick={searchLocationPopupControl.open}
                />
            </div>
        </StyledChipAutocomplete>
    );
};

export default ChipAutocomplete;
