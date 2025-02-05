import { render } from '@testing-library/react';
import AddPaymentsPopup from './AddPaymentsPopup';
import { MockProjectDashboardProvider } from '../../../../store/mockStore';
import moment from 'moment';

const retainerPayment = {
    deliverable: 'Test Deliverable',
    amount: 1000,
    paymentFrequency: 'monthly',
    numberOfPayments: '3',
    id: 1,
    invoiceDate: moment().format(),
    scheduleType: 'ongoing' as 'ongoing' | 'retainer',
};
const props = {
    projectId: 1,
    existRetainerPayment: null,
    isOngoingRetainerExist: false,
    isDefaultOpenOngoingBlock: false,
    close: jest.fn(),
};

describe('AddPaymentsPopup', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <MockProjectDashboardProvider>
                <AddPaymentsPopup {...props} />
            </MockProjectDashboardProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Update retainer scope')).toBeInTheDocument();
    });
    //TODO: interpolation.toString is not a function
    // TypeError: interpolation.toString is not a function
    // This problem caused by using react-datepicker

    // it('should render with default opened retainer block successfully', () => {
    //     const {queryByText, getByDisplayValue} = render(
    //         <MockProjectDashboardProvider>
    //             <AddPaymentsPopup {...props} existRetainerPayment={retainerPayment} isDefaultOpenOngoingBlock={true}/>
    //         </MockProjectDashboardProvider>
    //     );
    //     expect(queryByText('Update retainer scope')).toBe(null);
    //     expect(getByDisplayValue('Test Deliverable')).toBeInTheDocument();
    // });
});
