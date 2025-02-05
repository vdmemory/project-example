import { fireEvent, render, screen } from '@testing-library/react';
import Chip from './Chip';

const onClick = jest.fn();
const nameTextValue = 'name';
const props = {
    name: nameTextValue,
    onClick,
    isChecked: false,
};

describe('Chip', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Chip {...props} />);
        expect(baseElement).toBeTruthy();
        const inputCheckboxElem = screen.getByTestId('input-checkbox');
        expect(inputCheckboxElem).toBeTruthy();
        fireEvent.click(inputCheckboxElem);
        expect(onClick).toBeCalled();
        const nameTextValueNode = screen.getByText(nameTextValue);
        expect(nameTextValueNode).toBeTruthy();
    });
});
