import { render } from '@testing-library/react';
import { MockProfileProvider } from '../../utils/mockData.ts/mockProfileProvider';
import Payments from './Payments';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));
describe('Payments', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <MockProfileProvider>
                <Payments />
            </MockProfileProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('preloader')).toBeInTheDocument();
    });
});
