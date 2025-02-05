import { fireEvent, render, screen } from '@testing-library/react';
import FieldCheckBox from './FieldCheckBox';

const onChange = jest.fn();

const props = {
    value: false,
    onChange,
    label: 'checkbox label',
};

describe('FieldCheckBox', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FieldCheckBox {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should be checked successfully', () => {
        render(<FieldCheckBox {...props} />);
        const inputCheckBox = screen.getByTestId('checkbox-input');
        expect(inputCheckBox).toBeTruthy();
        fireEvent.click(inputCheckBox);
        expect(onChange).toHaveBeenCalled();
    });
});
