import { render } from '@testing-library/react';
import BeforeKickoffPopup from './BeforeKickoffPopup';

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

describe('BeforeKickoffPopup', () => {
    it('should render for client role successfully', () => {
        const { baseElement, getByText } = render(
            <BeforeKickoffPopup
                userType="client"
                projectId={1}
                close={jest.fn()}
            />,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText('CONGRATS! LET’S BEGIN PROJECT KICKOFF.'),
        ).toBeInTheDocument();
    });
    it('should render for agency role successfully', () => {
        const { getByText } = render(
            <BeforeKickoffPopup
                userType="agency"
                projectId={1}
                close={jest.fn()}
            />,
        );
        expect(getByText('CONGRATS! LET’S BEGIN KICKOFF.')).toBeInTheDocument();
    });
});
