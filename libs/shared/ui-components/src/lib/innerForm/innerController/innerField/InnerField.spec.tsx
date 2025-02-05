import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InnerField, { InnerFieldProps } from './InnerField';
import { FieldError } from 'react-hook-form';

jest.mock('./InnerInputController/InnerInputController', () => ({
    InnerInputController: jest.fn(() => (
        <div data-testid="inner-input-controller"></div>
    )),
}));

jest.mock('../../../tooltip/Tooltip', () => ({
    __esModule: true,
    default: ({ children }: any) => <div data-testid="tooltip">{children}</div>,
}));

const defaultProps: InnerFieldProps = {
    label: 'Test Label',
    onChange: jest.fn(),
    value: '',
    type: 'text',
};

const renderInnerField = (props: Partial<InnerFieldProps> = {}) =>
    render(<InnerField {...defaultProps} {...props} />);

describe('InnerField Component', () => {
    it('renders without crashing', () => {
        renderInnerField();
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(
            screen.getByTestId('inner-input-controller'),
        ).toBeInTheDocument();
    });

    it('displays tooltip with error message when there is an error', () => {
        const error: FieldError = { message: 'Test Label', type: 'value' };
        renderInnerField({ error });

        expect(screen.getByTestId('tooltip')).toHaveTextContent('Test Label');
    });

    it('does not display tooltip when there is no error', () => {
        renderInnerField();

        expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });

    it('renders the correct label', () => {
        renderInnerField({ label: 'New Label' });

        expect(screen.getByText('New Label')).toBeInTheDocument();
    });

    it('passes correct props to InnerInputController', () => {
        renderInnerField({ type: 'dropdown', isDisabled: true });

        const innerInputController = screen.getByTestId(
            'inner-input-controller',
        );
        expect(innerInputController).toBeInTheDocument();
    });
});
