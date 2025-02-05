import { render } from '@testing-library/react';
import AgencySelectionPopup from './AgencySelectionPopup';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { tab: '', projectId: 123 },
            asPath: '/asPath',
        };
    },
}));
describe('AgencySelectionPopup', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <AgencySelectionPopup projectId={1} close={jest.fn()} />,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText('The best part... pick your dream team!'),
        ).toBeInTheDocument();
    });
});
