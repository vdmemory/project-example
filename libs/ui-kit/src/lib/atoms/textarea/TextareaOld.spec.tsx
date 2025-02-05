import { render, screen, fireEvent } from '@testing-library/react';
import { TextareaOld } from './TextareaOld.component';

describe('Textarea', () => {
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with minimal props', () => {
        render(<TextareaOld onChange={mockOnChange} />);
        expect(
            screen.getByPlaceholderText('Enter text here...'),
        ).toBeInTheDocument();
    });

    it('should call onChange on text input successfully', () => {
        render(<TextareaOld onChange={mockOnChange} />);
        const textarea = document.getElementsByTagName('textarea')[0];
        fireEvent.change(textarea, { target: { value: 'test text' } });
        expect(mockOnChange).toBeCalled();
    });

    it('calls onBlur when the textarea is blurred', () => {
        render(
            <TextareaOld
                value="test"
                onChange={mockOnChange}
                onBlur={mockOnBlur}
            />,
        );
        const textarea = screen.getByDisplayValue('test');
        fireEvent.blur(textarea);
        expect(mockOnBlur).toHaveBeenCalledWith('test');
    });

    it('displays error message', () => {
        const errorMessage = 'Error occurred';
        render(<TextareaOld onChange={mockOnChange} error={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('displays character count when maxLength is specified', () => {
        render(
            <TextareaOld
                value="test"
                onChange={mockOnChange}
                maxLength={100}
            />,
        );
        expect(screen.getByText('4/100')).toBeInTheDocument();
    });

    it('correctly toggles autosize functionality', () => {
        const { rerender } = render(
            <TextareaOld
                value="test"
                onChange={mockOnChange}
                autoSize={false}
            />,
        );
        expect(screen.getByTestId('textarea')).not.toBeNull();

        rerender(
            <TextareaOld
                value="test"
                onChange={mockOnChange}
                autoSize={true}
            />,
        );
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('shows error message', () => {
        render(
            <TextareaOld
                onChange={mockOnChange}
                isErrorRightPlacement
                error="this is error message"
            />,
        );
        const errorMessage = screen.getByText('this is error message', {
            selector: '.error-message',
        });
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows Counter With Error', () => {
        const { baseElement } = render(
            <TextareaOld
                onChange={mockOnChange}
                isErrorRightPlacement
                hideNumberCharacters={false}
                maxLength={100}
                error="this is error message"
            />,
        );
        const counter = baseElement.querySelector('.count');
        const errorMessage = screen.getByText('this is error message', {
            selector: '.error-message-right',
        });
        expect(counter).toBeNull();
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows Counter With Warning', () => {
        const { baseElement } = render(
            <TextareaOld
                onChange={mockOnChange}
                isErrorRightPlacement
                hideNumberCharacters={false}
                maxLength={100}
                warning="this is error message"
            />,
        );
        const counter = baseElement.querySelector('.count');
        const errorMessage = screen.getByText('this is error message', {
            selector: '.warning-message-right',
        });
        expect(counter).toBeNull();
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows Counter With Warning', () => {
        const { baseElement } = render(
            <TextareaOld
                onChange={mockOnChange}
                hideNumberCharacters={false}
                maxLength={100}
                isErrorRightPlacement
            />,
        );
        const counter = baseElement.querySelector('.count');
        expect(counter).toBeInTheDocument();
    });
});
