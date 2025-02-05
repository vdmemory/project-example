import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Search } from './Search.component';
import userEvent from '@testing-library/user-event';

describe('Search Component Tests', () => {
    const mockSelectHandler = jest.fn();
    const mockAddItem = jest.fn();
    const mockCustomHandleSearch = jest.fn();

    beforeEach(() => {
        mockSelectHandler.mockClear();
        mockAddItem.mockClear();
        mockCustomHandleSearch.mockClear();
    });

    const listItems = [
        { id: 1, name: 'First Item' },
        { id: 2, name: 'Second Item' },
    ];

    it('should render successfully', () => {
        const { baseElement } = render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
            />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('renders correctly with initial setup', () => {
        render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
            />,
        );
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('should show list items on focus successfully', () => {
        render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
            />,
        );
        const input = screen.getByPlaceholderText('Search...');
        fireEvent.focus(input);
        expect(screen.getByText('First Item')).toBeInTheDocument();
        expect(screen.getByText('Second Item')).toBeInTheDocument();
    });

    it('handles input change and debounces calls for search results', async () => {
        render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
                isDisplayListOnSearch={true}
            />,
        );

        const input = screen.getByPlaceholderText('Search...');
        userEvent.type(input, 'First');
        await waitFor(() => expect(mockSelectHandler).toHaveBeenCalledTimes(0));
        jest.runAllTimers();
        expect(mockSelectHandler).toHaveBeenCalledTimes(0);
    });

    it('displays search results and allows selection', async () => {
        render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
                isDisplayListOnSearch={true}
            />,
        );

        const input = screen.getByPlaceholderText('Search...');
        userEvent.type(input, 'First');
        fireEvent.blur(input);
        jest.runAllTimers();
        await waitFor(() => {
            const item = screen.getByText('First Item');
            expect(item).toBeInTheDocument();
            fireEvent.click(item);
        });
        expect(mockSelectHandler).toHaveBeenCalledWith(listItems[0]);
    });

    it('should change search value on change successfully', () => {
        render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
            />,
        );
        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'item 2' } });
        expect(screen.getByDisplayValue('item 2')).toBeInTheDocument();
    });
    it('should render with error successfully', () => {
        render(
            <Search
                select={null}
                list={listItems}
                onSelect={mockSelectHandler}
                isDisplayListOnSearch={true}
                error="test error message"
            />,
        );
        expect(screen.getByText('test error message')).toBeInTheDocument();
    });
});
