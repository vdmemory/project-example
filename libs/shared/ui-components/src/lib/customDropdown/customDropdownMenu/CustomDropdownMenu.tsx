import {
    ChangeEvent,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { StyledCustomDropdown } from './CustomDropdownMenu.styled';
import { CloseIcon } from '@breef/shared/assets';
import { useMediaContext, useWindowSize } from '@breef/shared/hooks';
import { ChangeHandler } from 'react-hook-form';
import { checkIsElemOverflowsOnElement } from '@breef/shared/utils';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { HamburgerIcon } from '@breef/ui-kit';

export interface CustomDropdownProps {
    onChange?: ChangeHandler;
    dropdownList: { value: string; label: string; component?: ReactNode }[];
    parentRef?: RefObject<HTMLElement>;
    customChange?: (value: string) => void;
    isAction?: boolean;
    itemsListViewType?: 'small';
    dropdownButtonView?: 'dots';
    isDownList?: boolean;
}

export default function CustomDropdownMenu({
    onChange,
    dropdownList,
    parentRef,
    customChange,
    isAction = true,
    itemsListViewType,
    isDownList,
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropListRef = useRef<HTMLUListElement>(null);

    const windowWidth = useWindowSize();
    const { isMobile } = useMediaContext();

    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (IS_CLIENT_PLATFORM && isOpen && isMobile) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.removeProperty('overflow-y');
        }
    }, [isOpen, isMobile]);

    useEffect(() => {
        if (parentRef?.current && customChange && !isAction) {
            parentRef.current.onclick = () => customChange('');
        } else if (parentRef?.current && !isAction) {
            parentRef.current.onclick = () => undefined;
        } else if (parentRef?.current && isAction) {
            parentRef.current.onclick = () => toggleDropdown();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentRef, toggleDropdown]);

    const selectItem = (e: unknown) => {
        const typedEvent = e as ChangeEvent<HTMLElement>;
        onChange?.({
            target: { value: typedEvent.target.getAttribute('value') },
        });

        if (!parentRef) {
            toggleDropdown();
        }
    };

    const handleChange = (e: unknown, value?: string) => {
        if (customChange && value && isAction) {
            customChange(value);
            setIsOpen(false);
        } else {
            selectItem(e);
        }
    };

    useEffect(() => {
        if (dropListRef.current) {
            if (
                checkIsElemOverflowsOnElement(dropListRef, 'footer') &&
                !isDownList
            ) {
                dropListRef.current.style.bottom = '100%';
                dropListRef.current.style.top = 'auto';
                dropListRef.current.style.borderTop = '1px solid black';
            } else {
                dropListRef.current.style.bottom = 'auto';
                dropListRef.current.style.top = '100%';
                dropListRef.current.style.borderTop = 'none';
            }
        }
    });

    const getClassNamesDropDown = () => {
        let classNames = 'custom-dropdown';
        if (isMobile) classNames += ' menu';
        if (isOpen) classNames += ' open';

        return classNames;
    };

    const renderDropDownButton = () => {
        if (isOpen)
            return (
                <CloseIcon
                    className="button-close"
                    data-testid={'button-close'}
                />
            );
        return (
            <HamburgerIcon
                className="button-hamburger"
                data-testid={'button-hamburger'}
            />
        );
    };

    return (
        <StyledCustomDropdown
            ref={dropdownRef}
            isOpen={isOpen}
            isParentRef={!!parentRef}
            className={getClassNamesDropDown()}
            isAction={isAction}
            width={windowWidth.width}
            itemsListViewType={itemsListViewType}
            data-testid={'dropdown-wrapper'}
        >
            <div
                className="drop-button"
                data-testid={'drop-button'}
                onClick={!parentRef && isAction ? toggleDropdown : () => null}
            >
                {renderDropDownButton()}
            </div>

            <div className={'drop-list-wrapper'}>
                <ul className={'drop-list'} ref={dropListRef}>
                    {dropdownList.map((item, key) => (
                        <li
                            onClick={e => handleChange(e, item.value || '')}
                            className={'list-item'}
                            key={key}
                            value={item.value}
                        >
                            {item.component || item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </StyledCustomDropdown>
    );
}
