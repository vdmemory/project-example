import { ChevronSmallIcon } from '@breef/shared/assets';
import {
    LegacyRef,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { StyledChipDropdown } from './ChipDropdown.styled';
import { ChangeHandler } from 'react-hook-form';
import ChipButton from '../../button/chipButton/ChipButton';

export type ValueSelect = {
    name: string;
    id: number;
};

interface ChipDropdownProps {
    initialListDropdown?: ValueSelect[];
    initialListValues?: ValueSelect[];
    onClick?: ChangeHandler;
    onSelect?: (value: ValueSelect[]) => void;
    parentRef?: RefObject<HTMLElement>;
    placeholder?: string;
    idxLayer?: number;
    disabled?: boolean;
}

export const ChipDropdown = ({
    initialListDropdown,
    initialListValues,
    onClick,
    onSelect,
    parentRef,
    placeholder = 'Select from the list',
    idxLayer = 1,
    disabled,
}: ChipDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const filterListDropdown = useCallback(
        (list: ValueSelect[]) =>
            list?.filter(f => {
                // eslint-disable-next-line array-callback-return
                if (initialListValues?.some(s => s.id === f.id)) return;
                return f;
            }),
        [initialListValues],
    );

    const [listValues, setListValues] = useState(initialListValues || []);
    const [listDropdown, setListDropdown] = useState(
        initialListDropdown ? filterListDropdown(initialListDropdown) : [],
    );
    const dropListRef = useRef(null) as RefObject<HTMLElement>;

    useEffect(() => {
        if (initialListValues) setListValues(initialListValues);
    }, [initialListValues]);
    useEffect(() => {
        if (initialListDropdown)
            setListDropdown(filterListDropdown(initialListDropdown));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialListDropdown]);

    const handleClick = (
        action: 'remove' | 'add',
        id: number,
        name: string,
    ) => {
        if (action === 'add') {
            if (
                listValues.some(s => s.id === id) ||
                listValues.some(s => s.name === name)
            )
                return;

            const newListValues = [
                ...listValues,
                {
                    name,
                    id,
                },
            ];

            setListValues(newListValues);
            if (onClick) onClick({ target: { value: newListValues } });
            if (onSelect) onSelect(newListValues);
            const newListDropdown = listDropdown.filter(f => f.id !== id);
            if (newListDropdown.length === 0) setIsOpen(false);
            return setListDropdown(newListDropdown);
        }
        if (action === 'remove') {
            setListDropdown([
                ...listDropdown,
                {
                    name,
                    id,
                },
            ]);

            const newListValues = listValues.filter(f => f.id !== id);
            if (onClick) onClick({ target: { value: newListValues } });
            if (onSelect) onSelect(newListValues);
            return setListValues(newListValues);
        }
    };

    const isListDropdownEmpty = listDropdown.length === 0;

    return (
        <StyledChipDropdown
            className="chip-dropdown"
            isOpen={isOpen}
            idxLayer={idxLayer}
        >
            <div className="drop-button">
                <div className="group-button">
                    {listValues.length ? (
                        listValues.map(({ name, id }) => (
                            <ChipButton
                                key={id}
                                id={id}
                                name={name}
                                action="remove"
                                onClick={(e, action, id) =>
                                    handleClick(action, id, name)
                                }
                            />
                        ))
                    ) : (
                        <span className="drop-placeholder">{placeholder}</span>
                    )}
                </div>
                {!isListDropdownEmpty ? (
                    <div className="wrap-icon" onClick={toggleDropdown}>
                        <ChevronSmallIcon className="dropdown-icon" />
                    </div>
                ) : (
                    <div className="wrap-icon"></div>
                )}
            </div>

            <div
                className="drop-list"
                ref={dropListRef as LegacyRef<HTMLDivElement>}
            >
                {listDropdown.length
                    ? listDropdown.map(({ name, id }) => (
                          <ChipButton
                              key={id}
                              id={id}
                              name={name}
                              action="add"
                              icon={true}
                              onClick={(e, action, id) =>
                                  handleClick(action, id, name)
                              }
                              disabled={disabled}
                          />
                      ))
                    : 'There are no more items to choose from.'}
            </div>
        </StyledChipDropdown>
    );
};

export default ChipDropdown;
