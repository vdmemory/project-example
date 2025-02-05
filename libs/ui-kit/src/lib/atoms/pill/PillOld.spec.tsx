import { render, fireEvent } from '@testing-library/react';
import PillOld, { type InputType } from './PillOld.component';

const onChange = jest.fn();
const onClick = jest.fn();
const props = {
    onChange,
    onClick,
    label: 'Test Label',
    type: 'checkbox' as InputType,
};

describe('PillOld', () => {
    it('should render successfully', () => {
        const { queryByTestId, getByText, baseElement } = render(
            <PillOld {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(queryByTestId('left-icon')).toBe(null);
        expect(queryByTestId('right-icon')).toBe(null);
    });
    it('should render with left icon successfully', () => {
        const { queryByTestId } = render(
            <PillOld {...props} iconSide="left" />,
        );
        expect(queryByTestId('left-icon')).not.toBe(null);
        expect(queryByTestId('right-icon')).toBe(null);
    });
    it('should render with right icon successfully', () => {
        const { queryByTestId } = render(
            <PillOld {...props} iconSide="right" />,
        );
        expect(queryByTestId('left-icon')).toBe(null);
        expect(queryByTestId('right-icon')).not.toBe(null);
    });
    it('should render with both icons successfully', () => {
        const { queryByTestId } = render(
            <PillOld {...props} iconSide="both" />,
        );
        expect(queryByTestId('left-icon')).not.toBe(null);
        expect(queryByTestId('right-icon')).not.toBe(null);
    });
    it('should call onClick successfully', () => {
        const { getByText } = render(<PillOld {...props} />);
        const label = getByText('Test Label');
        fireEvent.click(label);
        expect(onChange).toBeCalled();
        expect(onClick).toBeCalled();
    });
    it('should render with iconType == add', () => {
        const { getByTestId } = render(
            <PillOld {...props} iconSide="right" iconType="add" />,
        );
        const plusIconClass = getByTestId('right-icon').className;
        expect(plusIconClass).toContain('plus-icon');
    });
});
