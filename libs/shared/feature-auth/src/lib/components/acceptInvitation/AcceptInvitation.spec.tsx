import AcceptInvitation, { AcceptInvitationProps } from './AcceptInvitation';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../store/mockStore';

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
    token: 'token',
};

const WrapperAcceptInvitation = (props: AcceptInvitationProps) => {
    return (
        <Provider store={mockConfiguredStore}>
            <AcceptInvitation {...props} />
        </Provider>
    );
};
describe('AcceptInvitation', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <WrapperAcceptInvitation {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
    });
});
