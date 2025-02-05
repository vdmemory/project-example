import { render, fireEvent } from '@testing-library/react';

import { Radio } from './Radio.component';
const onChange = jest.fn();

beforeEach(() => {
    onChange.mockClear();
});

describe('Checkbox', () => {
    it('should render successfully', () => {
        const { getByLabelText, getByText } = render(
            <Radio onChange={onChange} variant="default" label="my radio" />,
        );

        const radio = getByLabelText('my radio');
        expect(radio).toBeInTheDocument();

        const label = getByText('my radio');
        expect(label).toBeInTheDocument();
    });

    it('calls onChange callback when Radio is clicked', () => {
        const { getByLabelText } = render(
            <Radio onChange={onChange} variant="default" label="radio Label" />,
        );

        const radio = getByLabelText('radio Label');
        fireEvent.click(radio);

        expect(onChange).toHaveBeenCalled();
    });

    it('renders Radio state when prop disabled is true', () => {
        const { container } = render(
            <Radio
                onChange={onChange}
                checked={true}
                label="radio"
                variant="default"
                disabled
            />,
        );

        expect(container.querySelector('label[disabled]')).toBeTruthy();
    });

    it('renders Radio state when prop disabled is false', () => {
        const { container } = render(
            <Radio
                onChange={onChange}
                checked={true}
                label="radio"
                variant="default"
                disabled={false}
            />,
        );

        expect(container.querySelector('label[disabled]')).toBeNull();
    });

    it('handles keyboard events correctly', () => {
        const { container } = render(
            <Radio
                onChange={onChange}
                value="value"
                label="radio"
                variant="default"
                disabled={false}
            />,
        );
        const label = container.querySelector(
            'label.radio-label',
        ) as HTMLLabelElement;
        fireEvent.keyDown(label, { key: 'Enter' });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
