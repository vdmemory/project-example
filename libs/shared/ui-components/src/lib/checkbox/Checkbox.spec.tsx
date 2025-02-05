import Checkbox from './Checkbox';
import { fireEvent, render } from '@testing-library/react';

const onChange = jest.fn();
describe('Checkbox', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <Checkbox checked={false} onChange={onChange} />,
        );
        expect(baseElement).toBeTruthy();
        const input = document.querySelector('input[checked]');
        expect(input).toBe(null);
    });
    it('should render with checked state successfully', () => {
        render(<Checkbox checked={true} onChange={onChange} />);
        const input = document.querySelector('input[checked]');
        expect(input).toBeInTheDocument();
    });
    it('should onChange on click successfully', () => {
        render(<Checkbox checked={true} onChange={onChange} />);
        const input = document.querySelector('input[checked]');
        expect(input).not.toBe(null);
        if (input) {
            fireEvent.click(input);
        }
        expect(onChange).toBeCalled();
    });
});
