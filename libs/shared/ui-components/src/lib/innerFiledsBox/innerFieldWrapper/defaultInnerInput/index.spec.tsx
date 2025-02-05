import { fireEvent, render, screen } from '@testing-library/react';
import DefaultInnerInput from './DefaultInnerInput';

const onChange = jest.fn();
const props = {
    value: '',
    onChange,
    placeholder: '',
};

describe('DefaultInnerInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DefaultInnerInput {...props} />);
        expect(baseElement).toBeTruthy();
        const inputElem = screen.getByTestId('input');
        fireEvent.change(inputElem, { target: { value: 'test' } });
        expect(onChange).toBeCalled();
    });
});
