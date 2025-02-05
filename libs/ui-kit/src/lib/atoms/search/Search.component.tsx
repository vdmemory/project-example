import _ from 'lodash';
import { useEffect, useMemo, useRef, useState, Fragment } from 'react';
import Input from '../input/Input.component';
import List from '../list/List.component';
import ListItem from '../listItem/ListItem.component';
import { StyledSearch } from './Search.styled';
import useOnclickOutside from 'react-cool-onclickoutside';
import { checkIsElemOverflowsOnElement } from '@breef/shared/utils';

type ItemListType = {
    id: number;
    name: string;
};

interface SearchProps {
    select: ItemListType[] | null;
    onSelect: (selectedItem: ItemListType) => void;
    list: ItemListType[];
    customHandleSearch?: (value: string) => void;
    showTags?: boolean;
    disabled?: boolean;
    isRemovable?: boolean;
    isSearchIcon?: boolean;
    isMultiselect?: boolean;
    error?: string;
    onBlur?: () => void;
    maxResults?: number;
    placeholder?: string;
    isDisplayListOnSearch?: boolean;
    searchDebounce?: number;
    onAddItem?: (value: string) => void;
    isSearching?: boolean;
}

const Search = ({
    list,
    onSelect,
    select,
    showTags,
    disabled,
    customHandleSearch,
    isRemovable = true,
    isSearchIcon = true,
    isMultiselect = false,
    error,
    onBlur,
    maxResults,
    placeholder = 'Search...',
    isDisplayListOnSearch = false,
    searchDebounce = 100,
    onAddItem,
    isSearching,
}: SearchProps) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [isOverflowsPage, setIsOverflowsPage] = useState(false);
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<ItemListType[]>([]);
    const [isInFocus, setIsInFocus] = useState(false);
    const [isDebouncing, setIsDebouncing] = useState(false);

    const refSearch = useOnclickOutside(() => {
        if (isInFocus) {
            onBlur?.();
            setIsInFocus(false);
        }
    });
    const refSearchWrapper = useRef<HTMLDivElement>(null);

    const handleSearch = (query: string) => {
        const filterResults = list.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()),
        );
        const result = filterResults.length
            ? filterResults
            : [
                  {
                      id: -1,
                      name: 'No results found',
                  },
              ];
        const sortedResult = sortResults(result);
        const limitedResult = maxResults
            ? sortedResult.slice(0, maxResults)
            : sortedResult;
        setSearchResults(limitedResult);
    };
    const resetState = () => {
        setQuery('');
        handleSearch('');
        setIsInFocus(false);
    };
    const handleSelect = (item: ItemListType) => {
        if (item.id === -1) return;
        if (!isMultiselect) {
            resetState();
        }
        onSelect(item);
        onBlur?.();
    };

    const handleInputChangeDebounced = useMemo(
        () =>
            _.debounce((value: string) => {
                if (customHandleSearch) {
                    customHandleSearch(value);
                } else {
                    handleSearch(value);
                }
                setIsDebouncing(false);
            }, searchDebounce),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    useEffect(() => {
        setIsDebouncing(true);
        handleInputChangeDebounced(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const renderItem = (item: ItemListType) => {
        const { id, name } = item;
        const isSelected = select?.map(item => item.id).includes(id);
        return (
            <ListItem
                key={id}
                onClick={() => handleSelect(item)}
                isSelected={isSelected}
            >
                {name}
            </ListItem>
        );
    };

    useEffect(() => {
        if (listRef.current && !isOverflowsPage) {
            setIsOverflowsPage(checkIsElemOverflowsOnElement(listRef));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults.length, isInFocus]);

    const sortResults = (results: ItemListType[]) => {
        return results.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    };

    const handleAddItem = (name: string) => {
        onAddItem?.(name);
        resetState();
    };

    const searchResultsList = customHandleSearch ? list : searchResults;
    const isHideList =
        (isSearching || isDebouncing) && searchResultsList.length === 0;
    const isDisplayList =
        ((isDisplayListOnSearch && !!query && isInFocus) ||
            (!isDisplayListOnSearch && isInFocus)) &&
        !isHideList;

    const renderAddItem = () => (
        <button
            className="add-item-button"
            onClick={() => handleAddItem(query.trim())}
        >
            Add "{query.trim()}"?
        </button>
    );

    const renderListItems = () => {
        if (searchResultsList.length > 0) {
            return (
                <Fragment>
                    {searchResultsList.map(renderItem)}
                    {onAddItem &&
                        !searchResultsList.some(
                            item =>
                                item.name.toLowerCase().trim() ===
                                query.toLowerCase().trim(),
                        ) &&
                        renderAddItem()}
                </Fragment>
            );
        }
        if (onAddItem) {
            return renderAddItem();
        }
        return renderItem({ id: -1, name: 'No results found' });
    };

    return (
        <StyledSearch ref={refSearch} isOverflowsPage={isOverflowsPage}>
            <div ref={refSearchWrapper}>
                <Input
                    disabled={disabled}
                    className="search"
                    placeholder={placeholder}
                    value={query}
                    onChange={setQuery}
                    isSearchIcon={isSearchIcon}
                    isRemovable={searchResults.length > 0 && isRemovable}
                    selectedList={showTags && select ? select : []}
                    onChangeSelect={
                        showTags && select ? handleSelect : undefined
                    }
                    error={error}
                    isScrollIntoViewOnFocus={false}
                    onFocus={() => {
                        handleSearch(query);
                        setIsInFocus(true);
                    }}
                />
                <div className="dropdown-list-wrapper" ref={listRef}>
                    {isDisplayList && (
                        <List className="search-list">{renderListItems()}</List>
                    )}
                </div>
            </div>
        </StyledSearch>
    );
};

export { Search, type ItemListType };
