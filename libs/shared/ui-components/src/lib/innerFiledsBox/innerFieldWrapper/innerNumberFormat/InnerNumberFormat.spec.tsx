import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InnerNumberFormat from './InnerNumberFormat';
import { ChangeHandler } from 'react-hook-form';

describe('InnerNumberFormat', () => {
    const mockOnChange: ChangeHandler = jest.fn();

    const defaultProps = {
        value: null,
        onChange: mockOnChange,
        placeholder: 'Enter amount',
        maxLength: 16,
        isReadOnly: false,
    };

    it('should render correctly with default props', () => {
        render(<InnerNumberFormat {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter amount');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('maxlength', '16');
    });

    it('should format the value correctly', () => {
        render(<InnerNumberFormat {...defaultProps} value={12345.67} />);
        const input = screen.getByPlaceholderText('Enter amount');
        expect(input).toHaveValue('$12,345.67');
    });

    it('should call onChange with correct value', () => {
        render(<InnerNumberFormat {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter amount');
        fireEvent.change(input, { target: { value: '1234.56' } });
        expect(mockOnChange).toHaveBeenCalledWith({
            target: { value: 1234.56 },
        });
    });

    it('should be read-only if isReadOnly is true', () => {
        render(<InnerNumberFormat {...defaultProps} isReadOnly />);
        const input = screen.getByPlaceholderText('Enter amount');
        expect(input).toHaveAttribute('readonly');
    });

    it('should handle negative values correctly', () => {
        render(<InnerNumberFormat {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter amount');
        fireEvent.change(input, { target: { value: '-1234.56' } });
        expect(mockOnChange).toHaveBeenCalledWith({
            target: { value: 1234.56 },
        });
    });
});
