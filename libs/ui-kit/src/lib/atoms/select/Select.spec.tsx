import { fireEvent, render } from '@testing-library/react';
import Select from './Select.component';

const onChange = jest.fn();

const props = {
    id: 'test-select-1',
    label: 'Test Label',
    value: '',
    onChange,
    placeholder: 'Test Placeholder',
    list: [
        { value: '1', label: 'item 1' },
        { value: '2', label: 'item 2' },
    ],
    isOptional: true,
    disabled: false,
    isSearchable: false,
};

describe('Select', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <Select {...props} />,
        );
        expect(baseElement).toBeTruthy();
        const inputWrapper = getByTestId('input-wrapper');
        expect(inputWrapper).toBeInTheDocument();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('(optional)')).toBeInTheDocument();
        expect(getByTestId('drop-arrow')).toBeInTheDocument();
        fireEvent.click(inputWrapper);
        expect(getByText('item 1')).toBeInTheDocument();
        expect(getByText('item 2')).toBeInTheDocument();
    });
    it('should render with error successfully', () => {
        const { getByText } = render(
            <Select {...props} error="Error Message." />,
        );
        expect(getByText('Error Message.')).toBeInTheDocument();
    });
    it('should search item correct', () => {
        const { getByText, getByPlaceholderText, queryByText } = render(
            <Select {...props} isSearchable />,
        );
        const input = getByPlaceholderText('Test Placeholder');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'em 2' } });
        expect(getByText('item 2')).toBeInTheDocument();
        expect(queryByText('item 1')).toBe(null);
    });
    it('should select item successfully', () => {
        const { getByText, getByDisplayValue, getByTestId } = render(
            <Select {...props} />,
        );
        const inputWrapper = getByTestId('input-wrapper');
        fireEvent.click(inputWrapper);
        const item = getByText('item 2');
        fireEvent.click(item);
        expect(getByDisplayValue('item 2')).toBeInTheDocument();
    });
});
