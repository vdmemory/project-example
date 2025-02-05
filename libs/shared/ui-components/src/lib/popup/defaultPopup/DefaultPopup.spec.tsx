import { fireEvent, render } from '@testing-library/react';
import { DefaultPopup } from './DefaultPopup';

const onSubmit = jest.fn();
const onClick = jest.fn();

const defaultProps = {
    onSubmit,
    label: 'test label',
    isDisabledBtn: false,
    typeButton: 'submit' as 'submit' | 'button',
    onClick,
    buttonTitle: 'Add Button',
};

describe('DefaultPopup', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <DefaultPopup {...defaultProps}>
                <div>test children</div>
            </DefaultPopup>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test label')).toBeInTheDocument();
        expect(getByText('Add Button')).toBeInTheDocument();
        expect(getByText('test children')).toBeInTheDocument();
    });
    it('should call onClick on button click successfully', () => {
        onSubmit.mockImplementation(event => {
            event.preventDefault();
        });
        const { getByText } = render(
            <DefaultPopup {...defaultProps}>
                <div>test children</div>
            </DefaultPopup>,
        );
        const button = getByText('Add Button');
        fireEvent.click(button);
        expect(onClick).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
});
