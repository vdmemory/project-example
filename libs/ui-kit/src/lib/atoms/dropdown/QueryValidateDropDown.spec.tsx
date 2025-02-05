import { render, fireEvent, screen } from '@testing-library/react';
import { QueryValidateDropDown } from './QueryValidateDropDown.component';

describe('QueryValidateDropDown Component Tests', () => {
    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    const onSelectMock = jest.fn();

    it('should render successfully', () => {
        const { baseElement } = render(
            <QueryValidateDropDown options={options} onSelect={onSelectMock} />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('renders correctly with default options', () => {
        render(
            <QueryValidateDropDown options={options} onSelect={onSelectMock} />,
        );
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('filters options based on search input if isSearchable is true', () => {
        render(
            <QueryValidateDropDown
                options={options}
                onSelect={onSelectMock}
                isSearchable={true}
            />,
        );
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'option 2' },
        });
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeVisible();
    });

    it('invokes onSelect when an option is clicked', () => {
        render(
            <QueryValidateDropDown options={options} onSelect={onSelectMock} />,
        );
        fireEvent.click(screen.getByTestId('dropdown'));
        fireEvent.click(screen.getByText('Option 1'));
        expect(onSelectMock).toHaveBeenCalledWith(options[0]);
    });

    it('does not toggle dropdown if disabled', () => {
        render(
            <QueryValidateDropDown
                options={options}
                onSelect={onSelectMock}
                disabled={true}
            />,
        );
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    it('renders "No options found" if filter results are empty', () => {
        render(
            <QueryValidateDropDown
                options={options}
                onSelect={onSelectMock}
                isSearchable={true}
            />,
        );
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'random text' },
        });
        fireEvent.click(screen.getByTestId('dropdown'));
        expect(screen.getByText('No options found')).toBeInTheDocument();
    });

    it('does not toggle dropdown if isSearchable and isShow', () => {
        render(
            <QueryValidateDropDown
                options={options}
                onSelect={onSelectMock}
                isSearchable
            />,
        );
        fireEvent.click(screen.getByTestId('dropdown'));
        fireEvent.click(screen.getByTestId('dropdown'));

        expect(screen.getByText('Option 1')).toBeVisible();
    });
});
