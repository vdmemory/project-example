import { render } from '@testing-library/react';
import { MockDashboardProvider } from '../../../store/mockStore';
import { PaymentsClient } from './PaymentsClient';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));

jest.mock('../../../store/hooks', () => ({
    useDashboardSelector() {
        return {
            isDisabledPayments: false,
        };
    },
}));

describe('PaymentScheduleClient', () => {
    it('should render successfully', () => {
        const { baseElement, queryByTestId } = render(
            <MockDashboardProvider>
                <PaymentsClient projectId="1" />
            </MockDashboardProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(queryByTestId('page-loader')).toBeInTheDocument();
    });
});
