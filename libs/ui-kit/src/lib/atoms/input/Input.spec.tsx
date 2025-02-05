import { fireEvent, render } from '@testing-library/react';
import Input from './Input.component';

const onChange = jest.fn();

const props = {
    value: '',
    onChange,
    placeholder: 'Test Placeholder',
    descriptiveText: 'Test Descriptive Text',
};

describe('Input', () => {
    it('should render successfully', () => {
        const {
            baseElement,
            getByText,
            getByPlaceholderText,
            queryByTestId,
            queryByText,
        } = render(<Input {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
        expect(getByText('Test Descriptive Text')).toBeInTheDocument();
        expect(queryByText('%')).toBe(null);
        expect(queryByText('$')).toBe(null);
        expect(queryByTestId('search-icon')).toBe(null);
        expect(queryByTestId('warning-icon')).toBe(null);
    });
    it('should render successfully with icons', () => {
        const { queryByTestId, queryByText } = render(
            <Input
                {...props}
                isPercentSymbol
                isSearchIcon
                isWarningIcon
                isDollarSymbol
            />,
        );
        expect(queryByText('%')).not.toBe(null);
        expect(queryByText('$')).not.toBe(null);
        expect(queryByTestId('search-icon')).not.toBe(null);
        expect(queryByTestId('warning-icon')).not.toBe(null);
    });
    it('should render successfully with error', () => {
        const { getByText, queryByText } = render(
            <Input {...props} error="Test Error Message" />,
        );
        expect(getByText('Test Error Message')).toBeInTheDocument();
        expect(queryByText('Test Descriptive Text')).toBe(null);
    });
    it('should call onChange successfully', () => {
        const { getByPlaceholderText } = render(<Input {...props} />);
        const input = getByPlaceholderText('Test Placeholder');
        fireEvent.change(input, { target: { value: 'Test Value' } });
        expect(onChange).toBeCalledWith('Test Value');
    });
    it('should render successfully with isVisibleCounter', () => {
        const { getByText } = render(
            <Input {...props} isVisibleCounter maxLength={200} />,
        );
        expect(getByText('0/200')).toBeInTheDocument();
    });
    it('should render successfully with isVisibleCounter show error', () => {
        const { getByText, queryByText } = render(
            <Input
                {...props}
                isVisibleCounter
                error="Test Error Message"
                maxLength={200}
            />,
        );
        expect(queryByText('0/200')).toBe(null);
        expect(getByText('Test Error Message')).toBeInTheDocument();
    });
});
