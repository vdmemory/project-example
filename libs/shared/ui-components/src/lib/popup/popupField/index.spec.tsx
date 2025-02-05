import { act, fireEvent, render, screen } from '@testing-library/react';

import PopupField from './PopupField';

const onChange = jest.fn();

const props = {
    label: 'label field',
    value: '',
    onChange,
    type: 'text',
    placeholder: 'empty value',
    disabled: false,
    minLength: 100,
    maxLength: 200,
};

describe('PopupField', () => {
    it('should render PopupField successfully ', async () => {
        const { baseElement } = render(<PopupField {...props} />);

        expect(baseElement).toBeTruthy();
        expect(
            baseElement.getElementsByClassName('label-name')[0].textContent,
        ).toEqual(props.label);
        const input = screen.getByLabelText('label field');
        expect(input.getAttribute('placeholder')).toEqual(props.placeholder);

        await act(async () => {
            fireEvent.change(screen.getByLabelText('label field'), {
                target: { value: 'new value' },
            });
        });

        expect(props.onChange).toBeCalled();
    });
});
