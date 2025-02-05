import { fireEvent, render } from '@testing-library/react';
import { AnswerItem } from './AnswerItem';

window.scrollTo = jest.fn();

const props = {
    title: 'Test title',
    description: 'Test description',
};
describe('AnswerItem', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<AnswerItem {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test title')).toBeInTheDocument();
    });
    it('should expand and display description on click on self', () => {
        const { getByTestId, getByText } = render(<AnswerItem {...props} />);
        const answerItem = getByTestId('answer-item');
        fireEvent.click(answerItem);
        expect(getByText('Test description')).toBeInTheDocument();
    });
});
