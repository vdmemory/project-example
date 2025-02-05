import { fireEvent, render } from '@testing-library/react';
import { Toast } from './Toast.component';
import { WarningIcon } from '../../icons/';
import '@testing-library/jest-dom';

const closeToast = jest.fn();
const props = {
    title: 'Test Title',
    content: 'Test text',
    closeToast,
    icon: <WarningIcon data-testid="test-icon" />,
    linkUrl: 'test-url.com',
    linkText: 'Test Link',
};

describe('Toast', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <Toast {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test text')).toBeInTheDocument();
        expect(getByTestId('test-icon')).toBeInTheDocument();
        expect(getByText('Test Link')).toBeInTheDocument();
    });
    it('should call close function on close icon click', () => {
        const { getByTestId } = render(<Toast {...props} />);
        const buttonClose = getByTestId('button-close');
        expect(buttonClose).toBeInTheDocument();
        fireEvent.click(buttonClose);
        expect(closeToast).toBeCalled();
    });
});
