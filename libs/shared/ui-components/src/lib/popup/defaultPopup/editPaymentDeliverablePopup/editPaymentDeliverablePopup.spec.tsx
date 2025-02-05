import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditPaymentDeliverablePopup from './EditPaymentDeliverablePopup';

// Mock the withPopup HOC to return the component it wraps
jest.mock('../../Popup', () => ({
    withPopup: (Component: React.FC) => Component,
}));

// Mock the PopupField component
jest.mock('../../popupField/PopupField', () =>
    jest.fn(({ onChange, ...props }) => (
        <input {...props} onChange={e => onChange(e)} />
    )),
);

describe('EditPaymentDeliverablePopup', () => {
    const onChangeMock = jest.fn();
    const closeMock = jest.fn();
    const initialValue = 'Initial description';
    const invoiceCode = 'INV123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { baseElement } = render(
            <EditPaymentDeliverablePopup
                onChange={onChangeMock}
                initialValue={initialValue}
                invoiceCode={invoiceCode}
                close={closeMock}
            />,
        );
        expect(screen.getByText(`Edit Payment`)).toBeInTheDocument();
        expect(screen.getByText(`INV123`)).toBeInTheDocument();
        const input = baseElement.querySelector(
            'input[label="Description"]',
        ) as HTMLInputElement;
        expect(input).toHaveValue(initialValue);
        expect(screen.getByText(`Save`)).toBeInTheDocument();
    });

    it('enables save button when value changes', () => {
        const { baseElement } = render(
            <EditPaymentDeliverablePopup
                onChange={onChangeMock}
                initialValue={initialValue}
                invoiceCode={invoiceCode}
                close={closeMock}
            />,
        );
        const input = baseElement.querySelector(
            'input[label="Description"]',
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New description' } });
        expect(screen.getByTestId('custom-button')).toBeEnabled();
    });

    it('calls onChange and close on save button click', () => {
        const { baseElement } = render(
            <EditPaymentDeliverablePopup
                onChange={onChangeMock}
                initialValue={initialValue}
                invoiceCode={invoiceCode}
                close={closeMock}
            />,
        );
        const input = baseElement.querySelector(
            'input[label="Description"]',
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New description' } });
        const saveButton = screen.getByTestId('custom-button');
        fireEvent.click(saveButton);

        expect(onChangeMock).toHaveBeenCalledWith('New description');
        expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('disables save button if value is empty', () => {
        const { baseElement } = render(
            <EditPaymentDeliverablePopup
                onChange={onChangeMock}
                initialValue={initialValue}
                invoiceCode={invoiceCode}
                close={closeMock}
            />,
        );

        const input = baseElement.querySelector(
            'input[label="Description"]',
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: '' } });
        const saveButton = screen.getByTestId('custom-button');
        expect(saveButton).toBeDisabled();
    });
});
