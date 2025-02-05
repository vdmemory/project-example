import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';

import ConfirmEmail from './ConfirmEmail';

describe('ConfirmEmail', () => {
    it('should render successfully error message', () => {
        const { getByText, baseElement, getByTestId } = render(
            <Provider store={mockConfiguredStore}>
                <ConfirmEmail token="token" />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('page-loader')).toBeInTheDocument();
        expect(getByText(/Error:/gi)).toBeInTheDocument();
    });
});
