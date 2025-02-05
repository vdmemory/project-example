import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import MultiCardSelectsController, {
    multiCardSelects,
} from './MultiCardSelectsController';
import { Provider } from 'react-redux';

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
    type: multiCardSelects.services,
};
describe('MultiCardSelectsController', () => {
    it('should render successfully with services select', () => {
        const { baseElement, getByTestId } = render(
            <Provider store={mockConfiguredStore}>
                <MultiCardSelectsController {...defaultProps} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('services-select')).toBeInTheDocument();
    });
    it('should render successfully with plug select', () => {
        const { getByTestId } = render(
            <MultiCardSelectsController {...defaultProps} type="" />,
        );
        expect(getByTestId('select-plug')).toBeInTheDocument();
    });
});
