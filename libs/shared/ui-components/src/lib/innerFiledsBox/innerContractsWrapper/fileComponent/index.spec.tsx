import FileComponent from './FileComponent';
import { fireEvent, render, screen } from '@testing-library/react';

const onRemove = jest.fn();
const props = {
    isLoading: false,
    name: 'name',
    link: 'link',
    onRemove,
};

describe('FileComponent', () => {
    it('should render and remove called successfully', () => {
        const { baseElement } = render(<FileComponent {...props} />);
        expect(baseElement).toBeTruthy();
        const removeButtonElement = screen.getByTestId('remove-button');
        expect(removeButtonElement).toBeTruthy();
        fireEvent.click(removeButtonElement);
        expect(onRemove).toBeCalled();
    });
    it('should view loading spinner successfully', () => {
        const { baseElement } = render(<FileComponent {...props} isLoading />);
        expect(baseElement).toBeTruthy();
        const spinnerElement = screen.findByTestId('loading-spinner');
        expect(spinnerElement).toBeTruthy();
    });
});
