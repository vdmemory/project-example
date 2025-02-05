import { render } from '@testing-library/react';
import { BookACallPopup } from './BookACallPopup';
import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from '@breef/shared/data-access-auth';
import { Provider } from 'react-redux';

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiAuth.reducerPath]: apiAuth.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiAuth.middleware),
});
describe('BookACallPopup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <BookACallPopup close={jest.fn()} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
