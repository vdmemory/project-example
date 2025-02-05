import { fireEvent, render, screen } from '@testing-library/react';
import { DropDown } from './DropDown.component';

const groupOptions = [{ value: '1', label: 'Option 1', group: 'Group 1' }];

const onSelect = jest.fn();
const props = {
    scrollId: 'test id',
    option: {
        value: '1',
        label: 'Option 1',
    },
    onSelect,
    options: [
        {
            value: '1',
            label: 'Option 1',
        },
        {
            value: '2',
            label: 'Option 2',
        },
    ],
    errorOutside: '',
    isSearchable: false,
    isGrouped: false,
    placeholder: 'Test place',
};

describe('DropDown', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DropDown {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
    });
    it('should call onSelect on item click successfully', () => {
        render(<DropDown {...props} />);
        const dropdown = screen.getByTestId('dropdown');
        fireEvent.click(dropdown);
        const anotherItem = screen.getByText('Option 2');
        expect(anotherItem).toBeInTheDocument();
        fireEvent.click(anotherItem);
        expect(onSelect).toBeCalled();
    });

    it('renders correctly with isGrouped option', () => {
        render(<DropDown {...props} isGrouped options={groupOptions} />);
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.getByText('Group 1')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Option 1'));
        expect(onSelect).toHaveBeenCalledWith(groupOptions[0]);
    });

    it('renders correctly with default options', () => {
        render(<DropDown {...props} />);
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('filters options based on search input if isSearchable is true', () => {
        render(<DropDown {...props} isSearchable={true} />);
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'option 2' },
        });
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeVisible();
    });

    it('invokes onSelect when an option is clicked', () => {
        render(<DropDown {...props} isSearchable={true} />);
        fireEvent.click(screen.getByTestId('dropdown'));
        fireEvent.click(screen.getByText('Option 1'));
        expect(onSelect).toHaveBeenCalledWith(props.options[0]);
    });

    it('renders "No options found" if filter results are empty', () => {
        render(<DropDown {...props} isSearchable={true} />);
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'random text' },
        });
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('does not toggle dropdown if isSearchable and isShow', () => {
        render(<DropDown {...props} isSearchable={true} />);
        fireEvent.click(screen.getByTestId('dropdown'));
        fireEvent.click(screen.getByTestId('dropdown'));

        expect(screen.getByText('Option 1')).toBeVisible();
    });

    it('renders error message', () => {
        render(<DropDown {...props} errorOutside="This is error" />);
        expect(screen.getByText(/This is error/)).toBeInTheDocument();
    });

    it('renders correctly with placeholder option', () => {
        render(<DropDown {...props} placeholder="i am placeholder" />);
        expect(
            screen.getByPlaceholderText('i am placeholder'),
        ).toBeInTheDocument();
    });

    it('renders correctly with isSearchable option', () => {
        render(<DropDown {...props} isSearchable placeholder="" />);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders correctly with default placeholder', () => {
        render(<DropDown {...props} isSearchable={false} placeholder="" />);
        expect(screen.getByPlaceholderText('Select...')).toBeInTheDocument();
    });
});
