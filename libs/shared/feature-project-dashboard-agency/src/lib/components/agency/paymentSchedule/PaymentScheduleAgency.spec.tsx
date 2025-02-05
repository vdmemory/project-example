import { render } from '@testing-library/react';
import PaymentScheduleAgency from './PaymentScheduleAgency';
import { KickoffRequestType } from '@breef/shared/types';
import { MockProjectDashboardProvider } from '../../../store/mockStore';

class ResizeObserverMock {
    observe() {
        return;
    }
    unobserve() {
        return;
    }
    disconnect() {
        return;
    }
}
beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock;
});
afterEach(() => {
    jest.restoreAllMocks();
});
const props = {
    projectId: 1,
    kickoffStatus: 'approved_by_client' as KickoffRequestType['status'],
};
describe('PaymentScheduleAgency', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <MockProjectDashboardProvider>
                <PaymentScheduleAgency {...props} />
            </MockProjectDashboardProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('page-loader')).toBeInTheDocument();
    });
});
