import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea.component';

describe('Textarea', () => {
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with minimal props', () => {
        render(<Textarea onChange={mockOnChange} />);
        expect(
            screen.getByPlaceholderText('Enter text here...'),
        ).toBeInTheDocument();
    });

    it('should call onChange on text input successfully', () => {
        render(<Textarea onChange={mockOnChange} />);
        const textarea = document.getElementsByTagName('textarea')[0];
        fireEvent.change(textarea, { target: { value: 'test text' } });
        expect(mockOnChange).toBeCalled();
    });

    it('calls onBlur when the textarea is blurred', () => {
        render(
            <Textarea
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
        render(<Textarea onChange={mockOnChange} error={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('displays character count when maxLength is specified', () => {
        render(
            <Textarea value="test" onChange={mockOnChange} maxLength={100} />,
        );
        expect(screen.getByText('4/100')).toBeInTheDocument();
    });

    it('correctly toggles autosize functionality', () => {
        const { rerender } = render(
            <Textarea value="test" onChange={mockOnChange} autoSize={false} />,
        );
        expect(screen.getByTestId('textarea')).not.toBeNull();
        rerender(
            <Textarea value="test" onChange={mockOnChange} autoSize={true} />,
        );
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('shows upload button when onChangeAttachment is provided', () => {
        const mockOnChangeAttachment = jest.fn();
        render(
            <Textarea
                onChange={mockOnChange}
                onChangeAttachment={mockOnChangeAttachment}
            />,
        );
        const uploadButton = screen.getByTestId('upload-button');
        expect(uploadButton).toBeInTheDocument();
    });

    it('shows error message', () => {
        render(
            <Textarea
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
            <Textarea
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
            <Textarea
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
            <Textarea
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
