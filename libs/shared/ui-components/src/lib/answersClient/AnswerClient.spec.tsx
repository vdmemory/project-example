import { fireEvent, render, screen } from '@testing-library/react';
import { AnswersClient } from './AnswersClient';

window.scrollTo = jest.fn();

const props = {
    title: 'Title',
    answersData: [
        {
            title: 'Answer title',
            description: 'Answer description',
        },
    ],
};

describe('AnswersClient', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AnswersClient {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully text', () => {
        render(<AnswersClient {...props} />);
        expect(screen.getByText('Support:')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(
            screen.getByText('Learn more about the Breef Process'),
        ).toBeInTheDocument();
        expect(screen.getByText('MORE FAQs')).toBeInTheDocument();
        expect(screen.getByText('Answer title')).toBeInTheDocument();
    });
});
