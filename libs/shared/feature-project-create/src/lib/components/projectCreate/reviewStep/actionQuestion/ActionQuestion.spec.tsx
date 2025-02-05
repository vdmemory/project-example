import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActionQuestion } from './ActionQuestion';

const onClick = jest.fn();
const props = {
    question: 'test question',
    linkTitle: 'test title',
    onClick,
};

describe('ActionQuestion', () => {
    it('should render successfully', () => {
        render(<ActionQuestion {...props} />);
        expect(screen.getByText('test question')).toBeInTheDocument();
        expect(screen.getByText('test title')).toBeInTheDocument();
    });
    it('should call onClick on link click successfully', () => {
        render(<ActionQuestion {...props} />);
        const link = screen.getByText('test title');
        expect(link).toBeInTheDocument();
        fireEvent.click(link);
        expect(onClick).toBeCalled();
    });
});
