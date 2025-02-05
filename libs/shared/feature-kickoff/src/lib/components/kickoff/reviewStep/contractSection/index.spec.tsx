import { render } from '@testing-library/react';
import ContractSection from './ContractSection';
import { mockConfiguredStore } from '../../../../store/mockStore';
import { Provider } from 'react-redux';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import * as nextRouter from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

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
describe('PaymentsSection', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore}>
                    <ContractSection />
                </Provider>
                ,
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
