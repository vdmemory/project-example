import { fireEvent, render, screen } from '@testing-library/react';
import TextArea from './TextArea';

const onChange = jest.fn();
const onBlur = jest.fn();
const props = {
    label: 'label',
    rows: 10,
    error: '',
    maxLength: 500,
    onChange,
    onBlur,
    value: 'value',
    id: 'textarea-0',
    hideNumberCharacters: false,
    isAutoHeightArea: false,
    autoSize: false,
    isDisabled: false,
    isAutoFocus: false,
    readOnly: false,
};

describe('TextArea', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TextArea {...props} />);
        expect(baseElement).toBeTruthy();
        const textareaElem = screen.getByTestId('textarea');
        expect(textareaElem).toBeTruthy();
        fireEvent.change(textareaElem, { target: { value: 'test value' } });
        expect(onChange).toBeCalled();
        fireEvent.focusIn(textareaElem);
        fireEvent.focusOut(textareaElem);
        expect(onBlur).toBeCalled();
    });
});
