import { render } from '@testing-library/react';
import PaymentsSection from './PaymentsSection';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../../store/mockStore';

describe('PaymentsSection', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <PaymentsSection userType="agency" />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
