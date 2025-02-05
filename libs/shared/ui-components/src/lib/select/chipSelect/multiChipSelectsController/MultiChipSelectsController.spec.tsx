import { render } from '@testing-library/react';
import MultiChipSelectsController, {
    multiCardSelects,
} from './MultiChipSelectsController';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import { Provider } from 'react-redux';

const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiProfile.middleware),
});
const defaultProps = {
    value: [
        {
            id: 1,
            name: 'skill 1',
        },
        {
            id: 2,
            name: 'skill 2',
        },
    ],
    onChange: jest.fn(),
    type: '',
};
describe('SkillsSelect', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <Provider store={mockConfiguredStore}>
                <MultiChipSelectsController {...defaultProps} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('plug-select')).toBeInTheDocument();
    });
    it('should render with skills select successfully', () => {
        const { getByTestId } = render(
            <Provider store={mockConfiguredStore}>
                <MultiChipSelectsController
                    {...defaultProps}
                    type={multiCardSelects.skills}
                />
            </Provider>,
        );
        expect(getByTestId('skills-select')).toBeInTheDocument();
    });
});
