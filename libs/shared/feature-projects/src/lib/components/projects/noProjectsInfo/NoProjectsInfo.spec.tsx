import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';
import { NoProjectsInfo } from './NoProjectsInfo';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
            isReady: true,
        };
    },
}));

const defaultProps = {
    config: [
        {
            label: 'Test Label',
            note: 'Test Note',
        },
    ],
    role: 'client' as 'client' | 'agency',
};
describe('NoProjectsInfo', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <Provider store={mockConfiguredStore}>
                <NoProjectsInfo {...defaultProps} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('wrapper-info-boxes').childElementCount).toEqual(1);
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('Test Note')).toBeInTheDocument();
    });
    it('should render successfully create project button for client user type', () => {
        const { getByText } = render(
            <Provider store={mockConfiguredStore}>
                <NoProjectsInfo {...defaultProps} role="client" />
            </Provider>,
        );
        expect(getByText('START PROJECT')).toBeInTheDocument();
    });
});
