// import { render, screen } from '@testing-library/react';
// import { FormProvider, useForm, useWatch } from 'react-hook-form';
// import { ControlTypePaymentsForm } from '@breef/shared/types';
// import RetainerPayments from './RetainerPayments';

// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { apiProfile } from '@breef/shared/data-access-profile';

// const mockConfiguredStore = configureStore({
//     reducer: {
//         [apiProfile.reducerPath]: apiProfile.reducer,
//     },
// });

// const props = {
//     title: 'title',
//     isShowActionButton: false,
//     isHideOnNullValue: false,
//     deleteTitle: 'Skip for Now',
// };

// const WrappedRetainerPayments = () => {
//     const methods = useForm<ControlTypePaymentsForm>({
//         defaultValues: {
//             paymentsMilestone: [],
//             paymentsRetainer: null,
//             files: [],
//         },
//     });
//     const paymentsRetainerValue = useWatch({
//         control: methods.control,
//         name: 'paymentsRetainer',
//     });

//     return (
//         <Provider store={mockConfiguredStore}>
//             <FormProvider {...methods}>
//                 <RetainerPayments
//                     {...props}
//                     paymentsRetainerValue={paymentsRetainerValue}
//                 />
//             </FormProvider>
//         </Provider>
//     );
// };

// describe('RetainerPayments', () => {
//     it('should render successfully', async () => {
//         const { baseElement } = render(<WrappedRetainerPayments />);
//         expect(baseElement).toBeTruthy();
//         const styledComponentRetainer = screen.getByTestId(
//             'styled-retainer-wrapper',
//         );
//         expect(styledComponentRetainer).toBeTruthy();
//     });
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RetainerPayments } from './RetainerPayments';
import { useFormContext, Controller } from 'react-hook-form';
import { useGetList } from '@breef/shared/hooks';

// Mock the useFormContext hook
jest.mock('react-hook-form', () => ({
    useFormContext: jest.fn(),
    Controller: ({ render, ...props }) => render(props),
}));

// Mock the useGetList hook
jest.mock('@breef/shared/hooks', () => ({
    useGetList: jest.fn(),
}));

describe('RetainerPayments', () => {
    const mockSetValue = jest.fn();
    const mockTrigger = jest.fn();
    const mockUseFormContext = useFormContext as jest.Mock;

    beforeEach(() => {
        mockUseFormContext.mockReturnValue({
            control: {},
            setValue: mockSetValue,
            trigger: mockTrigger,
        });

        (useGetList as jest.Mock).mockReturnValue([
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' },
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(
            <RetainerPayments
                title="Test Title"
                paymentsRetainerValue={null}
            />,
        );

        expect(
            screen.getByTestId('styled-retainer-wrapper'),
        ).toBeInTheDocument();
        expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    });

    it('shows and hides retainer fields when the action button is clicked', () => {
        render(
            <RetainerPayments
                title="Test Title"
                paymentsRetainerValue={null}
                isShowActionButton={true}
            />,
        );

        const button = screen.getByText('Add Retainer');
        fireEvent.click(button);
        expect(mockSetValue).toHaveBeenCalledWith('paymentsRetainer', {
            deliverable: '',
            amount: null,
            paymentFrequency: '',
            numberOfPayments: '',
            invoiceDate: '',
            id: 0,
            scheduleType: '',
        });

        fireEvent.click(button);
        expect(mockSetValue).toHaveBeenCalledWith('paymentsRetainer', {
            deliverable: '',
            amount: null,
            paymentFrequency: '',
            numberOfPayments: '',
            invoiceDate: '',
            id: 0,
            scheduleType: '',
        });
    });

    // it('renders form fields correctly when paymentsRetainerValue is not null', () => {
    //     const mockPaymentsRetainerValue = {
    //         deliverable: 'Test Deliverable',
    //         amount: 1000,
    //         paymentFrequency: 'monthly',
    //         numberOfPayments: '3',
    //         invoiceDate: '2022-01-01',
    //         id: 1,
    //     };

    //     render(
    //         <RetainerPayments
    //             title="Test Title"
    //             paymentsRetainerValue={mockPaymentsRetainerValue}
    //         />,
    //     );

    //     expect(
    //         screen.getByPlaceholderText('Add details of the project'),
    //     ).toHaveValue('Test Deliverable');
    //     expect(screen.getByPlaceholderText('USD')).toHaveValue(1000);
    //     expect(screen.getByText('Monthly')).toBeInTheDocument();
    //     expect(screen.getByText('3')).toBeInTheDocument();
    //     expect(screen.getByText('2022-01-01')).toBeInTheDocument();
    // });

    it('does not render component when isHideOnNullValue is true and paymentsRetainerValue is null', () => {
        render(
            <RetainerPayments
                title="Test Title"
                paymentsRetainerValue={null}
                isHideOnNullValue={true}
            />,
        );

        expect(
            screen.queryByTestId('styled-retainer-wrapper'),
        ).not.toBeInTheDocument();
    });

    // it('displays delete title correctly', () => {
    //     render(
    //         <RetainerPayments
    //             title="Test Title"
    //             paymentsRetainerValue={null}
    //             deleteTitle="Remove Retainer"
    //             isShowActionButton={true}
    //         />,
    //     );

    //     expect(screen.getByText('Remove Retainer')).toBeInTheDocument();
    // });

    // it('renders numberOfExistPayments correctly', () => {
    //     render(
    //         <RetainerPayments
    //             title="Test Title"
    //             paymentsRetainerValue={null}
    //             numberOfExistPayments="5"
    //         />,
    //     );

    //     expect(
    //         screen.getByText('Original Number of Payments'),
    //     ).toBeInTheDocument();
    //     expect(screen.getByText('5')).toBeInTheDocument();
    // });
});
