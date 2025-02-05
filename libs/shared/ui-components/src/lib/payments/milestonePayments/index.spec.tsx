import { render, screen } from '@testing-library/react';
import MilestonePayments from './MilestonePayments';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { ControlTypePaymentsForm } from '@breef/shared/types';

const props = {
    title: 'title',
    isCheckConfirmToDelete: true,
    isAbilityToDeleteLastOne: false,
};

const WrappedMilestonePayments = () => {
    const methods = useForm<ControlTypePaymentsForm>({
        defaultValues: {
            paymentsMilestone: [],
            paymentsRetainer: null,
            files: [],
        },
    });
    const milestonePaymentsField = useFieldArray({
        control: methods.control,
        name: 'paymentsMilestone',
    });

    return (
        <FormProvider {...methods}>
            <MilestonePayments
                {...props}
                fieldMethods={milestonePaymentsField}
            />
        </FormProvider>
    );
};

describe('MilestonePayments', () => {
    it('should render successfully', async () => {
        const { baseElement } = render(<WrappedMilestonePayments />);
        expect(baseElement).toBeTruthy();
        const buttonAddMilestone = screen.getByText('Milestone');
        expect(buttonAddMilestone).toBeTruthy();
    });
});

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { useForm, FormProvider } from 'react-hook-form';
// import MilestonePayments from './MilestonePayments';

// describe('MilestonePayments component', () => {
//     it('renders milestone payments with specified title', () => {
//         render(
//             <FormProvider {...useForm()}>
//                 <MilestonePayments title="Test Milestones" fieldMethods={[]} />
//             </FormProvider>,
//         );
//         const titleElement = screen.getByText('Test Milestones/\\one time');
//         expect(titleElement).toBeInTheDocument();
//     });

//     it('renders add milestone button', () => {
//         const fieldMethodsMock = {
//             fields: [],
//             move: jest.fn(),
//             append: jest.fn(),
//             remove: jest.fn(),
//         };
//         render(
//             <FormProvider {...useForm()}>
//                 <MilestonePayments fieldMethods={fieldMethodsMock} />
//             </FormProvider>,
//         );
//         const addMilestoneButton = screen.getByText('Milestone');
//         expect(addMilestoneButton).toBeInTheDocument();
//         fireEvent.click(addMilestoneButton);
//         expect(fieldMethodsMock.append).toHaveBeenCalledTimes(1);
//     });

//     it('allows moving milestone payments', () => {
//         const fieldMethodsMock = {
//             fields: [{ id: 1 }, { id: 2 }],
//             move: jest.fn(),
//             append: jest.fn(),
//             remove: jest.fn(),
//         };
//         render(
//             <FormProvider {...useForm()}>
//                 <MilestonePayments fieldMethods={fieldMethodsMock} />
//             </FormProvider>,
//         );
//         const moveUpButton = screen.getAllByRole('button', {
//             name: /moveUp/i,
//         })[0];
//         const moveDownButton = screen.getAllByRole('button', {
//             name: /moveDown/i,
//         })[0];
//         fireEvent.click(moveUpButton);
//         expect(fieldMethodsMock.move).toHaveBeenCalledWith(0, 1);
//         fireEvent.click(moveDownButton);
//         expect(fieldMethodsMock.move).toHaveBeenCalledWith(1, 0);
//     });

//     it('allows removing milestone payments with confirmation', () => {
//         const fieldMethodsMock = {
//             fields: [{ id: 1 }],
//             move: jest.fn(),
//             append: jest.fn(),
//             remove: jest.fn(),
//         };
//         render(
//             <FormProvider {...useForm()}>
//                 <MilestonePayments fieldMethods={fieldMethodsMock} />
//             </FormProvider>,
//         );
//         const deleteButton = screen.getByText('Delete');
//         fireEvent.click(deleteButton);
//         const confirmButton = screen.getByText('Confirm');
//         fireEvent.click(confirmButton);
//         expect(fieldMethodsMock.remove).toHaveBeenCalledTimes(1);
//     });

//     it('disables delete button if there is only one milestone and abilityToDeleteLastOne is false', () => {
//         const fieldMethodsMock = {
//             fields: [{ id: 1 }],
//             move: jest.fn(),
//             append: jest.fn(),
//             remove: jest.fn(),
//         };
//         render(
//             <FormProvider {...useForm()}>
//                 <MilestonePayments
//                     fieldMethods={fieldMethodsMock}
//                     isAbilityToDeleteLastOne={false}
//                 />
//             </FormProvider>,
//         );
//         const deleteButton = screen.getByText('Delete');
//         expect(deleteButton).toBeDisabled();
//     });
// });
