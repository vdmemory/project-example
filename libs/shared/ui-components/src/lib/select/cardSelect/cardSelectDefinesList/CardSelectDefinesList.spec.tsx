import { render } from '@testing-library/react';
import CardSelectDefinesList, {
    CardSelectDefinesListProps,
} from './CardSelectDefinesList';
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
    value: [],
    onChange,
    listType: 'companySize',
    cardType: undefined,
};
const CardSelectDefinesListWrapper = (props: CardSelectDefinesListProps) => (
    <Provider store={mockConfiguredStore}>
        <CardSelectDefinesList {...props}>
            <div>test children</div>
        </CardSelectDefinesList>
    </Provider>
);
describe('CardSelectDefinesList', () => {
    it('should render static list successfully', () => {
        const { baseElement, getByText } = render(
            <CardSelectDefinesListWrapper {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test children')).toBeInTheDocument();
    });
    it('should display loading server list', () => {
        const { getByTestId, queryByText } = render(
            <CardSelectDefinesListWrapper
                {...defaultProps}
                listType="industries"
            />,
        );
        expect(getByTestId('preloader-wrapper')).toBeInTheDocument();
        expect(queryByText('test children')).toBe(null);
    });
});
