import { render } from '@testing-library/react';
import TabsNavigation from './TabsNavigation';

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

const defaultProps = {
    config: [
        {
            title: 'tab 1',
            tab: 'tab-1',
            disabled: false,
        },
        {
            title: 'tab 2',
            tab: 'tab-2',
            disabled: false,
        },
    ],
};
describe('TabsNavigation', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <TabsNavigation {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('tab 1')).toBeInTheDocument();
        expect(getByText('tab 2')).toBeInTheDocument();
    });
});
