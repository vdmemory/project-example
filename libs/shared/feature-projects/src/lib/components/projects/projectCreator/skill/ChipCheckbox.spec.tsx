import { fireEvent, render, screen } from '@testing-library/react';
import ChipCheckbox from './ChipCheckbox';

const onChange = jest.fn();
const props = {
    name: 'Test Name',
    checked: false,
    onChange,
    disabled: false,
};

describe('ChipCheckbox', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ChipCheckbox {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Test Name')).toBeInTheDocument();
        expect(screen.queryByTestId('check-icon')).toBe(null);
    });
    it('should call on change on click successfully', () => {
        render(<ChipCheckbox {...props} />);
        const input = document.getElementsByTagName('input')[0];
        expect(input).toBeInTheDocument();
        fireEvent.click(input);
        expect(onChange).toBeCalled();
    });
    it('should render with check mark successfully', () => {
        const { baseElement } = render(<ChipCheckbox {...props} checked />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
});
