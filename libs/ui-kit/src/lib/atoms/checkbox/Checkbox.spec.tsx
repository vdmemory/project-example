import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox.component';

describe('Checkbox Component', () => {
    const onChangeMock = jest.fn();

    beforeEach(() => {
        onChangeMock.mockClear();
    });

    it('renders correctly', () => {
        render(<Checkbox label="Test Checkbox" onChange={onChangeMock} />);
        expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
    });

    it('triggers onChange when clicked', () => {
        render(<Checkbox onChange={onChangeMock} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events correctly', () => {
        render(<Checkbox onChange={onChangeMock} />);
        const label = screen.getByRole('checkbox');
        fireEvent.keyDown(label, { key: 'Enter' });
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    it('renders the indeterminate state correctly', () => {
        const { baseElement } = render(
            <Checkbox indeterminate={true} onChange={onChangeMock} />,
        );
        const indeterminate = baseElement.querySelector('.indeterminate');
        expect(indeterminate).toBeInTheDocument();
    });

    it('should render successfully', () => {
        const { getByLabelText, getByText } = render(
            <Checkbox
                onChange={onChangeMock}
                variant="default"
                label="my checkbox"
            />,
        );

        const checkbox = getByLabelText('my checkbox');
        expect(checkbox).toBeInTheDocument();

        const label = getByText('my checkbox');
        expect(label).toBeInTheDocument();
    });

    it('calls onChange callback when checkbox is clicked', () => {
        const { getByLabelText } = render(
            <Checkbox
                onChange={onChangeMock}
                variant="default"
                label="Checkbox Label"
            />,
        );

        const checkbox = getByLabelText('Checkbox Label');
        fireEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalled();
    });
    it('renders indeterminate state when indeterminate prop is true', () => {
        const { container } = render(
            <Checkbox
                onChange={onChangeMock}
                indeterminate={true}
                label="indeterminate"
            />,
        );

        const indeterminateIcon = container.querySelector(
            '.checkbox-indeterminate',
        );
        expect(indeterminateIcon).toBeInTheDocument();
    });
    it('renders indeterminate state when indeterminate prop is true', () => {
        const { container } = render(
            <Checkbox
                onChange={onChangeMock}
                checked={true}
                label="indeterminate"
                variant="default"
            />,
        );

        const selected = container.querySelector('.checkbox-selected');
        expect(selected).toBeInTheDocument();
    });

    it('renders Checkbox state when prop disabled is true', () => {
        const { container } = render(
            <Checkbox
                onChange={onChangeMock}
                checked={true}
                label="indeterminate"
                variant="default"
                disabled
            />,
        );

        expect(container.querySelector('label[disabled]')).toBeTruthy();
    });

    it('renders Checkbox state when prop disabled is false', () => {
        const { container } = render(
            <Checkbox
                onChange={onChangeMock}
                checked={true}
                label="indeterminate"
                variant="default"
                disabled={false}
            />,
        );

        expect(container.querySelector('label[disabled]')).toBeNull();
    });
});
