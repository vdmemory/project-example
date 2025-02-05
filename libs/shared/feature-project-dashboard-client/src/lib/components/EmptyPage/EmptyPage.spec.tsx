import { render } from '@testing-library/react';
import EmptyPage from './EmptyPage';

const props = {
    title: 'Test Title',
    text: 'Test Text',
    image: 'hourglass' as 'hourglass' | '',
};
describe('EmptyPage', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<EmptyPage {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test Text')).toBeInTheDocument();
    });
});
