import { render, screen } from '@testing-library/react';
import { SentimentType } from '@breef/shared/types';
import { Notification } from './Notification.component';

const props = {
    text: 'test text',
    sentiment: 'primary' as SentimentType,
};
describe('Search', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Notification {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test text')).toBeInTheDocument();
    });
});
