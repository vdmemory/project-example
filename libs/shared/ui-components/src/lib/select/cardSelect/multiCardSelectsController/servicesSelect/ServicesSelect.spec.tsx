import { render } from '@testing-library/react';
import ServicesSelect from './ServicesSelect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';

const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiProfile.middleware),
});
const onChange = jest.fn();
const defaultProps = {
    value: [
        {
            id: 1,
            name: 'Test Name',
        },
    ],
    onChange,
};
describe('ServicesSelect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <ServicesSelect {...defaultProps} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
