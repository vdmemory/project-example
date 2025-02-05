import { render, screen } from '@testing-library/react';
import ReviewStep from './ReviewStep';
import { mockConfiguredStore } from '../../../store/mockStore';
import { Provider } from 'react-redux';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import * as nextRouter from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

const legalNameAgencyText = 'legal name agency';
const props = {
    agencyKickoffBillingData: {
        legalName: legalNameAgencyText,
        teamMembers: [
            {
                id: 0,
                email: 'email@gmail.com',
                phoneNumber: '01234567',
                firstName: 'firstName',
                lastName: 'lastName',
            },
        ],
    },
};
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { tab: '', projectId: 123 },
            asPath: '',
        };
    },
}));

const useRouter = jest.spyOn(nextRouter, 'useRouter');
const router = useRouter.getMockImplementation()?.() as NextRouter;

describe('ReviewStep', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore}>
                    <ReviewStep {...props} userType="client" />,
                </Provider>
                ,
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
        const getHelpHereElem = screen.getByText(/Get help here/gi);
        expect(getHelpHereElem).toBeTruthy();
        const agencyInfoLegalNameElem = screen.getByText(legalNameAgencyText);
        expect(agencyInfoLegalNameElem).toBeTruthy();
    });
});
