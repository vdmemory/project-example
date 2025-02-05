import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from './Switch.component';

const onToggle = jest.fn();
const props = {
    label: 'test label',
    isOn: false,
    onToggle,
};
describe('Switch', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Switch {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test label')).toBeInTheDocument();
    });
    it('should call onToggle on click successfully', () => {
        render(<Switch {...props} />);
        const input = document.getElementsByTagName('input')[0];
        fireEvent.click(input);
        expect(onToggle).toBeCalled();
    });
    it('should be checked if isOn prop is true successfully', () => {
        render(<Switch {...props} isOn />);
        expect(document.querySelector('input[checked]')).toBeInTheDocument();
    });
});
