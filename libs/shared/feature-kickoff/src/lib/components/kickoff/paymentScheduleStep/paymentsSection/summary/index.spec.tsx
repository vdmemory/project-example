import { render } from '@testing-library/react';
import Summary from './Summary';
import { FormProvider, useController, useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';
import { useFormPaymentSchedule } from '../../useFormPaymentSchedule';
import { mockConfiguredStore } from '../../../../../store/mockStore';
import { Provider } from 'react-redux';
import { ControlTypePaymentsForm } from '@breef/shared/types';

const props = {
    total: 0,
    teamTake: 0,
};

const Wrapper = (props: { children: ReactNode }) => {
    const { methodsFormPaymentSchedule } = useFormPaymentSchedule();
    return (
        <FormProvider {...methodsFormPaymentSchedule}>
            {props.children}
        </FormProvider>
    );
};

const SummaryComponent = () => {
    const methods = useFormContext<ControlTypePaymentsForm>();
    const field = useController({
        name: 'paymentTerms',
        control: methods.control,
        defaultValue: '',
    });

    return <Summary {...props} fieldPaymentTerms={field} />;
};

describe('Summary', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <Wrapper>
                    <SummaryComponent />
                </Wrapper>
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
