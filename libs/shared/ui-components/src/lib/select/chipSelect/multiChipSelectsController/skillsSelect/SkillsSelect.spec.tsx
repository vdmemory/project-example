import { render } from '@testing-library/react';
import SkillsSelect from './SkillsSelect';
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
};
describe('SkillsSelect', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <SkillsSelect {...defaultProps} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
