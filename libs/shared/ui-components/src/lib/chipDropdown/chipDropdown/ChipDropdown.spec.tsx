import { render, fireEvent, screen } from '@testing-library/react';
import ChipDropdown, { ValueSelect } from './ChipDropdown';

describe('ChipDropdown', () => {
    const mockListDropdown: ValueSelect[] = [
        { name: 'Option 1', id: 1 },
        { name: 'Option 2', id: 2 },
        { name: 'Option 3', id: 3 },
    ];

    const mockListValues: ValueSelect[] = [
        { name: 'Selected 1', id: 101 },
        { name: 'Selected 2', id: 102 },
    ];

    it('renders ChipDropdown component', () => {
        const onClickMock = jest.fn();
        const onSelectMock = jest.fn();
        const { getByText } = render(
            <ChipDropdown
                initialListDropdown={mockListDropdown}
                initialListValues={mockListValues}
                onClick={onClickMock}
                onSelect={onSelectMock}
                placeholder="Select an option"
            />,
        );
        mockListValues.forEach(({ name }) => {
            expect(getByText(name)).toBeInTheDocument();
        });
        mockListDropdown.forEach(({ name }) => {
            expect(getByText(name)).toBeInTheDocument();
        });
    });

    it('handles click event to add and remove chips', () => {
        const onClickMock = jest.fn();
        const onSelectMock = jest.fn();
        render(
            <ChipDropdown
                initialListDropdown={mockListDropdown}
                initialListValues={mockListValues}
                onClick={onClickMock}
                onSelect={onSelectMock}
                placeholder="Select an option"
            />,
        );

        const actionAttr = screen.getByText('Option 1').getAttribute('action');
        actionAttr && expect(actionAttr).toBe('add');
        fireEvent.click(screen.getByText('Option 1'));

        const actionAttrFirstUpdate = screen
            .getByText('Option 1')
            .getAttribute('action');
        actionAttrFirstUpdate && expect(actionAttrFirstUpdate).toBe('remove');

        fireEvent.click(screen.getByText('Option 1'));

        const actionAttrNextUpdate = screen
            .getByText('Option 1')
            .getAttribute('action');
        actionAttrNextUpdate && expect(actionAttrNextUpdate).toBe('add');
    });
});
