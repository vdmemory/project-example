import { fireEvent, render, screen } from '@testing-library/react';
import FieldSelect from './FieldSelect';

const onClick = jest.fn();
const onChange = jest.fn();

const props = {
    onClick,
    onChange,
    list: [
        {
            value: '',
            label: '',
        },
        {
            value: '',
            label: '',
        },
        {
            value: '',
            label: '',
        },
    ],
};

describe('FieldSelectDefinesList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FieldSelect {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should select successfully', () => {
        render(<FieldSelect {...props} />);
        const firstOption = screen.getByTestId('select-test-0');
        expect(firstOption).toBeTruthy();
        fireEvent.click(firstOption);
        expect(onChange).toBeCalled();
        expect(onClick).toBeCalled();
    });
});
