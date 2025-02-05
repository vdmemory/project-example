import { fireEvent, render } from '@testing-library/react';
import { InputFieldPreview } from './InputFieldPreview';

const onClick = jest.fn();
const props = {
    value: 'Test Value',
    onClick,
};

describe('InputFieldPreview', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <InputFieldPreview {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Value')).toBeInTheDocument();
        expect(getByTestId('edit-icon')).toBeInTheDocument();
    });
    it('should call onCLick successfully', () => {
        const { getByTestId } = render(<InputFieldPreview {...props} />);
        const editIcon = getByTestId('edit-icon');
        fireEvent.click(editIcon);
        expect(onClick).toBeCalled();
    });
});
