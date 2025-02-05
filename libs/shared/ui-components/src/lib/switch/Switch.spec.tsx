import { fireEvent, render } from '@testing-library/react';
import Switch from './Switch';

const onChange = jest.fn();
const onMouseDown = jest.fn();
const defaultProps = {
    active: false,
    onChange,
    onMouseDown,
};

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));

describe('Switch', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Switch {...defaultProps} />);
        expect(baseElement).toBeTruthy();
    });
    it('should call onChange and onMouseDown on switch click', () => {
        const { getByTestId } = render(<Switch {...defaultProps} />);
        const switchInput = getByTestId('switch-checkbox');
        fireEvent.click(switchInput);
        fireEvent.mouseDown(switchInput);
        expect(onChange).toBeCalled();
        expect(onMouseDown).toBeCalled();
    });
});
