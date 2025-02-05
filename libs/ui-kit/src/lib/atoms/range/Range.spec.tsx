import { fireEvent, render, screen } from '@testing-library/react';
import { Range } from './Range.component';

describe('Range Component', () => {
    const listItems = [
        { value: '1', name: 'Option 1' },
        { value: '2', name: 'Option 2' },
    ];

    const handleOnChange = jest.fn();
    const handleChangeComment = jest.fn();

    it('renders correct number of Pill components and handles selection', () => {
        render(
            <Range
                list={listItems}
                value="1"
                onChange={handleOnChange}
                isVisibleComment={false}
            />,
        );
        expect(screen.getAllByText(/Option/)).toHaveLength(2);
        fireEvent.click(screen.getByText('Option 2'));
        expect(handleOnChange).toHaveBeenCalledWith('2');
    });

    it('renders start and end tips if provided', () => {
        render(
            <Range
                list={listItems}
                value="1"
                onChange={handleOnChange}
                startTip="Start tip"
                endTip="End tip"
            />,
        );
        expect(screen.getByText('Start tip')).toBeInTheDocument();
        expect(screen.getByText('End tip')).toBeInTheDocument();
    });

    it('handles custom class names and renders children correctly', () => {
        const className = 'custom-class';
        render(
            <Range
                list={listItems}
                value="1"
                onChange={handleOnChange}
                className={className}
            >
                <div>Children content</div>
            </Range>,
        );
        expect(screen.getByText('Children content')).toBeInTheDocument();
        expect(document.querySelector('.range')).toHaveClass('custom-class');
    });

    it('shows the comment section when isVisibleComment is true', () => {
        render(
            <Range
                list={listItems}
                value="1"
                onChange={handleOnChange}
                isVisibleComment={true}
                isPreOpenComment={false}
            />,
        );
        fireEvent.click(screen.getByText('+ Add Comment'));
        expect(
            screen.queryByPlaceholderText('Enter text here...'),
        ).toBeInTheDocument();
    });

    it('handles comment changes', () => {
        render(
            <Range
                list={listItems}
                value="1"
                onChange={handleOnChange}
                isVisibleComment={true}
                isPreOpenComment={true}
                onChangeComment={handleChangeComment}
            />,
        );
        fireEvent.change(screen.getByPlaceholderText('Enter text here...'), {
            target: { value: 'New comment' },
        });
        expect(handleChangeComment).toHaveBeenCalledWith('New comment');
    });
});
