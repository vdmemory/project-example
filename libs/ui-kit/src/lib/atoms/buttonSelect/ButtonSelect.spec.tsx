import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonSelect } from './ButtonSelect.component';

const onChange = jest.fn();
const props = {
    label: 'test label',
    name: 'button-select',
    isUppercase: true,
    type: 'checkbox' as const as 'checkbox',
    onChange,
};

describe('ButtonSelect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ButtonSelect {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test label')).toBeInTheDocument();
    });
    it('should render successfully', () => {
        render(<ButtonSelect {...props} />);
        const element = screen.getByText('test label');
        fireEvent.click(element);
        expect(onChange).toBeCalled();
    });
});
